+++
title = "Digital signatures in Java: the hard way vs. the Bruce way"
date = 2026-03-25T10:00:00Z
description = "A before-and-after comparison showing how Bruce turns 20+ lines of JCA boilerplate into clean, readable code for digital signatures in Java."
[taxonomies]
categories = ['Software']
tags = ['java', 'cryptography', 'software development', 'bruce']
[extra]
toc = true
+++

If you've ever implemented digital signatures in Java using the raw JCA
(Java Cryptography Architecture), you know the feeling: what should be a
straightforward operation turns into a ceremony of factory methods,
exception handling, and arcane incantations. Let me show you what I mean.

## The JCA way

Here's a complete sign-and-verify round trip using nothing but the
standard library:

```java
import java.security.*;

public class JcaSignatureExample {

    public static void main(String[] args) throws Exception {
        // Generate a key pair
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();

        byte[] message = "Transfer $500 to Alice".getBytes("UTF-8");

        // Sign
        Signature signer = Signature.getInstance("SHA256withRSA");
        signer.initSign(keyPair.getPrivate());
        signer.update(message);
        byte[] signatureBytes = signer.sign();

        // Verify
        Signature verifier = Signature.getInstance("SHA256withRSA");
        verifier.initVerify(keyPair.getPublic());
        verifier.update(message);
        boolean isValid = verifier.verify(signatureBytes);

        System.out.println("Valid: " + isValid);
    }
}
```

That's 16 lines of logic (not counting imports and class boilerplate) just
to sign a message and check the signature. And this is the *happy path* —
no keystore loading, no encoding, no error handling. Every call can throw a
checked exception. The algorithm string is duplicated. The `Signature`
object is mutable and stateful: you `init` it, then `update` it, then call
`sign` or `verify`. Miss a step and you get a cryptic
`SignatureException`.

Now imagine loading keys from a PKCS#12 keystore. Here's what that looks
like:

```java
import java.io.*;
import java.security.*;
import java.security.cert.CertificateException;
import java.util.Base64;

public class JcaKeystoreSignature {

    public static void main(String[] args)
            throws KeyStoreException, IOException, CertificateException,
                   NoSuchAlgorithmException, UnrecoverableKeyException,
                   InvalidKeyException, SignatureException {

        // Load the keystore
        KeyStore keystore = KeyStore.getInstance("PKCS12");
        try (InputStream is = new FileInputStream("keystore.p12")) {
            keystore.load(is, "changeit".toCharArray());
        }

        // Extract keys
        PrivateKey privateKey = (PrivateKey)
            keystore.getKey("alice", "changeit".toCharArray());
        PublicKey publicKey =
            keystore.getCertificate("alice").getPublicKey();

        byte[] message = "Transfer $500 to Alice".getBytes("UTF-8");

        // Sign
        Signature signer = Signature.getInstance("SHA256withRSA");
        signer.initSign(privateKey);
        signer.update(message);
        byte[] signatureBytes = signer.sign();

        // Encode for transport
        String encoded = Base64.getEncoder().encodeToString(signatureBytes);

        // Decode and verify
        byte[] decoded = Base64.getDecoder().decode(encoded);
        Signature verifier = Signature.getInstance("SHA256withRSA");
        verifier.initVerify(publicKey);
        verifier.update(message);
        boolean isValid = verifier.verify(decoded);

        System.out.println("Valid: " + isValid);
    }
}
```

Thirty lines of logic. Seven checked exceptions in the `throws` clause. A
cast to `PrivateKey`. Manual Base64 encoding. And yet all we're doing is:
load keys, sign a message, verify the signature.

## The Bruce way

Here's the same operation with [Bruce](https://github.com/mcaserta/bruce):

```java
import static com.mirkocaserta.bruce.Bruce.*;
import static com.mirkocaserta.bruce.Keystores.*;

var keys = keyPair("RSA", 2048);

var signer = signerBuilder()
        .key(keys.getPrivate())
        .algorithm("SHA256withRSA")
        .build();

var verifier = verifierBuilder()
        .key(keys.getPublic())
        .algorithm("SHA256withRSA")
        .build();

var message   = Bytes.from("Transfer $500 to Alice");
var signature = signer.sign(message);
var isValid   = verifier.verify(message, signature);
```

That's it. No checked exceptions leaking through your API. No mutable
state to manage. No manual `init`/`update`/`sign` dance. The `Signer` and
`Verifier` are functional interfaces — immutable, thread-safe, and
composable.

And with a keystore:

```java
var keystore   = keystore("classpath:keystore.p12", "changeit".toCharArray(), "PKCS12");
var privateKey = privateKey(keystore, "alice", "changeit".toCharArray());
var publicKey  = publicKey(keystore, "alice");

var signer = signerBuilder()
        .key(privateKey)
        .algorithm("SHA256withRSA")
        .build();

var verifier = verifierBuilder()
        .key(publicKey)
        .algorithm("SHA256withRSA")
        .build();

var message   = Bytes.from("Transfer $500 to Alice");
var signature = signer.sign(message);
var encoded   = signature.encode(BASE64);      // ready for transport
var isValid   = verifier.verify(message, Bytes.from(encoded, BASE64));
```

Loading keys, signing, encoding to Base64, decoding, and verifying — in
readable, linear code.

## What Bruce is doing under the hood

Bruce isn't replacing JCA. It's a thin, pure-Java wrapper around it. No
external crypto dependencies, no native code — just the JVM's own
cryptographic engine with a humane API on top. Here's what you get:

- **`Signer` and `Verifier`** are `@FunctionalInterface`s. They do one
  thing and they're immutable. You can pass them around, store them in
  fields, use them in lambdas.
- **`Bytes`** is Bruce's universal I/O type. It wraps `byte[]` with
  convenient factory methods (`Bytes.from(String)`, `Bytes.from(Path)`,
  `Bytes.from(InputStream)`) and encoding support (`encode(BASE64)`,
  `encode(HEX)`). No more manual charset or Base64 juggling.
- **Builders** handle the `getInstance`/`init` ceremony once at
  construction time. After that, signing and verifying are one-liner calls.
- **Checked exceptions** are caught and wrapped into unchecked
  `BruceException`s, so they don't pollute your method signatures.

## Multiple keys? No problem

If you manage signatures for multiple parties, Bruce has a `SignerByKey`
and `VerifierByKey` variant:

```java
var signerByKey = signerBuilder()
        .keys(Map.of("alice", alicePrivateKey, "bob", bobPrivateKey))
        .algorithm("SHA256withRSA")
        .buildByKey();

var verifierByKey = verifierBuilder()
        .keys(Map.of("alice", alicePublicKey, "bob", bobPublicKey))
        .algorithm("SHA256withRSA")
        .buildByKey();

var signature = signerByKey.sign("alice", message);
var isValid   = verifierByKey.verify("alice", message, signature);
```

Try doing that cleanly with raw JCA. I'll wait.

## Getting started

Add Bruce to your project:

```xml
<dependency>
    <groupId>com.mirkocaserta.bruce</groupId>
    <artifactId>bruce</artifactId>
    <version>2.0.0</version>
</dependency>
```

Or with Gradle:

```kotlin
implementation("com.mirkocaserta.bruce:bruce:2.0.0")
```

Bruce requires Java 21+ and has zero external dependencies.

- [GitHub](https://github.com/mcaserta/bruce)
- [Documentation](https://bruce.mirkocaserta.com)
- [Maven Central](https://central.sonatype.com/artifact/com.mirkocaserta.bruce/bruce)

Life's too short for `KeyPairGenerator.getInstance()`.
