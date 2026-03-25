+++
title = "Firmas digitales en Java: el camino difícil vs. el camino Bruce"
date = 2026-03-25T10:00:00Z
description = "Una comparación antes-y-después que muestra cómo Bruce convierte 20+ líneas de boilerplate JCA en código limpio y legible para firmas digitales en Java."
[taxonomies]
categories = ['Software']
tags = ['java', 'criptografía', 'desarrollo de software', 'bruce']
[extra]
toc = true
+++

Si alguna vez has implementado firmas digitales en Java usando directamente
la JCA (Java Cryptography Architecture), conoces la sensación: lo que
debería ser una operación sencilla se convierte en una ceremonia de factory
methods, manejo de excepciones y encantamientos arcanos. Déjame mostrarte
a qué me refiero.

## El camino JCA

Aquí tienes un ciclo completo de firma y verificación usando solo la
biblioteca estándar:

```java
import java.security.*;

public class JcaSignatureExample {

    public static void main(String[] args) throws Exception {
        // Generar un par de claves
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();

        byte[] message = "Transferir 500€ a Alice".getBytes("UTF-8");

        // Firmar
        Signature signer = Signature.getInstance("SHA256withRSA");
        signer.initSign(keyPair.getPrivate());
        signer.update(message);
        byte[] signatureBytes = signer.sign();

        // Verificar
        Signature verifier = Signature.getInstance("SHA256withRSA");
        verifier.initVerify(keyPair.getPublic());
        verifier.update(message);
        boolean isValid = verifier.verify(signatureBytes);

        System.out.println("Válida: " + isValid);
    }
}
```

Son 16 líneas de lógica (sin contar imports y boilerplate de la clase)
solo para firmar un mensaje y verificar la firma. Y este es el *camino
feliz* — sin carga de keystore, sin codificación, sin manejo de errores.
Cada llamada puede lanzar una excepción checked. La cadena del algoritmo
está duplicada. El objeto `Signature` es mutable y con estado: haces
`init`, luego `update`, luego llamas a `sign` o `verify`. Sáltate un paso
y obtienes una críptica `SignatureException`.

Ahora imagina cargar claves desde un keystore PKCS#12. Así es como se ve:

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

        // Cargar el keystore
        KeyStore keystore = KeyStore.getInstance("PKCS12");
        try (InputStream is = new FileInputStream("keystore.p12")) {
            keystore.load(is, "changeit".toCharArray());
        }

        // Extraer claves
        PrivateKey privateKey = (PrivateKey)
            keystore.getKey("alice", "changeit".toCharArray());
        PublicKey publicKey =
            keystore.getCertificate("alice").getPublicKey();

        byte[] message = "Transferir 500€ a Alice".getBytes("UTF-8");

        // Firmar
        Signature signer = Signature.getInstance("SHA256withRSA");
        signer.initSign(privateKey);
        signer.update(message);
        byte[] signatureBytes = signer.sign();

        // Codificar para transporte
        String encoded = Base64.getEncoder().encodeToString(signatureBytes);

        // Decodificar y verificar
        byte[] decoded = Base64.getDecoder().decode(encoded);
        Signature verifier = Signature.getInstance("SHA256withRSA");
        verifier.initVerify(publicKey);
        verifier.update(message);
        boolean isValid = verifier.verify(decoded);

        System.out.println("Válida: " + isValid);
    }
}
```

Treinta líneas de lógica. Siete excepciones checked en la cláusula
`throws`. Un cast a `PrivateKey`. Codificación Base64 manual. Y sin
embargo, todo lo que estamos haciendo es: cargar claves, firmar un mensaje,
verificar la firma.

## El camino Bruce

Aquí está la misma operación con
[Bruce](https://github.com/mcaserta/bruce):

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

var message   = Bytes.from("Transferir 500€ a Alice");
var signature = signer.sign(message);
var isValid   = verifier.verify(message, signature);
```

Eso es todo. Sin excepciones checked contaminando tu API. Sin estado
mutable que gestionar. Sin la danza manual de `init`/`update`/`sign`.
`Signer` y `Verifier` son interfaces funcionales — inmutables, thread-safe
y componibles.

Y con un keystore:

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

var message   = Bytes.from("Transferir 500€ a Alice");
var signature = signer.sign(message);
var encoded   = signature.encode(BASE64);      // listo para transporte
var isValid   = verifier.verify(message, Bytes.from(encoded, BASE64));
```

Cargar claves, firmar, codificar en Base64, decodificar y verificar — en
código legible y lineal.

## Qué hace Bruce bajo el capó

Bruce no reemplaza la JCA. Es un wrapper delgado en puro Java alrededor de
ella. Sin dependencias criptográficas externas, sin código nativo — solo el
motor criptográfico de la JVM con una API humana encima. Esto es lo que
obtienes:

- **`Signer` y `Verifier`** son `@FunctionalInterface`. Hacen una sola
  cosa y son inmutables. Puedes pasarlos, almacenarlos en campos, usarlos
  en lambdas.
- **`Bytes`** es el tipo universal de I/O de Bruce. Envuelve `byte[]` con
  factory methods convenientes (`Bytes.from(String)`, `Bytes.from(Path)`,
  `Bytes.from(InputStream)`) y soporte de codificación (`encode(BASE64)`,
  `encode(HEX)`). No más gestión manual de charset o Base64.
- Los **builders** manejan la ceremonia de `getInstance`/`init` una vez en
  el momento de la construcción. Después, firmar y verificar son llamadas
  de una línea.
- Las **excepciones checked** se capturan y se envuelven en
  `BruceException` unchecked, para que no contaminen las firmas de tus
  métodos.

## ¿Múltiples claves? Sin problema

Si gestionas firmas para múltiples partes, Bruce tiene las variantes
`SignerByKey` y `VerifierByKey`:

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

Intenta hacer eso limpiamente con la JCA pura. Te espero.

## Para empezar

Añade Bruce a tu proyecto:

```xml
<dependency>
    <groupId>com.mirkocaserta.bruce</groupId>
    <artifactId>bruce</artifactId>
    <version>2.0.0</version>
</dependency>
```

O con Gradle:

```kotlin
implementation("com.mirkocaserta.bruce:bruce:2.0.0")
```

Bruce requiere Java 21+ y tiene cero dependencias externas.

- [GitHub](https://github.com/mcaserta/bruce)
- [Documentación](https://bruce.mirkocaserta.com)
- [Maven Central](https://central.sonatype.com/artifact/com.mirkocaserta.bruce/bruce)

La vida es demasiado corta para `KeyPairGenerator.getInstance()`.
