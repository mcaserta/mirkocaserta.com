+++
title = "Firme digitali in Java: il modo difficile vs. il modo Bruce"
date = 2026-03-25T10:00:00Z
description = "Un confronto prima-e-dopo che mostra come Bruce trasforma 20+ righe di boilerplate JCA in codice pulito e leggibile per le firme digitali in Java."
[taxonomies]
categories = ['Software']
tags = ['java', 'crittografia', 'sviluppo software', 'bruce']
[extra]
toc = true
+++

Se hai mai implementato le firme digitali in Java usando direttamente la
JCA (Java Cryptography Architecture), conosci la sensazione: quella che
dovrebbe essere un'operazione semplice si trasforma in una cerimonia di
factory method, gestione delle eccezioni e incantesimi arcani. Lascia che
ti mostri cosa intendo.

## Il modo JCA

Ecco un ciclo completo di firma e verifica usando solo la libreria
standard:

```java
import java.security.*;

public class JcaSignatureExample {

    public static void main(String[] args) throws Exception {
        // Genera una coppia di chiavi
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();

        byte[] message = "Trasferisci 500€ ad Alice".getBytes("UTF-8");

        // Firma
        Signature signer = Signature.getInstance("SHA256withRSA");
        signer.initSign(keyPair.getPrivate());
        signer.update(message);
        byte[] signatureBytes = signer.sign();

        // Verifica
        Signature verifier = Signature.getInstance("SHA256withRSA");
        verifier.initVerify(keyPair.getPublic());
        verifier.update(message);
        boolean isValid = verifier.verify(signatureBytes);

        System.out.println("Valida: " + isValid);
    }
}
```

Sono 16 righe di logica (senza contare import e boilerplate della classe)
solo per firmare un messaggio e verificare la firma. E questo è il
*percorso felice* — nessun caricamento di keystore, nessuna codifica,
nessuna gestione degli errori. Ogni chiamata può lanciare un'eccezione
checked. La stringa dell'algoritmo è duplicata. L'oggetto `Signature` è
mutabile e con stato: fai `init`, poi `update`, poi chiami `sign` o
`verify`. Salta un passaggio e ottieni una criptica `SignatureException`.

Ora immagina di caricare le chiavi da un keystore PKCS#12. Ecco come
appare:

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

        // Carica il keystore
        KeyStore keystore = KeyStore.getInstance("PKCS12");
        try (InputStream is = new FileInputStream("keystore.p12")) {
            keystore.load(is, "changeit".toCharArray());
        }

        // Estrai le chiavi
        PrivateKey privateKey = (PrivateKey)
            keystore.getKey("alice", "changeit".toCharArray());
        PublicKey publicKey =
            keystore.getCertificate("alice").getPublicKey();

        byte[] message = "Trasferisci 500€ ad Alice".getBytes("UTF-8");

        // Firma
        Signature signer = Signature.getInstance("SHA256withRSA");
        signer.initSign(privateKey);
        signer.update(message);
        byte[] signatureBytes = signer.sign();

        // Codifica per il trasporto
        String encoded = Base64.getEncoder().encodeToString(signatureBytes);

        // Decodifica e verifica
        byte[] decoded = Base64.getDecoder().decode(encoded);
        Signature verifier = Signature.getInstance("SHA256withRSA");
        verifier.initVerify(publicKey);
        verifier.update(message);
        boolean isValid = verifier.verify(decoded);

        System.out.println("Valida: " + isValid);
    }
}
```

Trenta righe di logica. Sette eccezioni checked nella clausola `throws`.
Un cast a `PrivateKey`. Codifica Base64 manuale. Eppure tutto quello che
stiamo facendo è: caricare le chiavi, firmare un messaggio, verificare la
firma.

## Il modo Bruce

Ecco la stessa operazione con [Bruce](https://github.com/mcaserta/bruce):

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

var message   = Bytes.from("Trasferisci 500€ ad Alice");
var signature = signer.sign(message);
var isValid   = verifier.verify(message, signature);
```

Tutto qui. Nessuna eccezione checked che inquina la tua API. Nessuno stato
mutabile da gestire. Nessuna danza manuale `init`/`update`/`sign`. `Signer`
e `Verifier` sono interfacce funzionali — immutabili, thread-safe e
componibili.

E con un keystore:

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

var message   = Bytes.from("Trasferisci 500€ ad Alice");
var signature = signer.sign(message);
var encoded   = signature.encode(BASE64);      // pronto per il trasporto
var isValid   = verifier.verify(message, Bytes.from(encoded, BASE64));
```

Caricare le chiavi, firmare, codificare in Base64, decodificare e
verificare — in codice leggibile e lineare.

## Cosa fa Bruce sotto il cofano

Bruce non sostituisce la JCA. È un sottile wrapper in puro Java attorno ad
essa. Nessuna dipendenza crittografica esterna, nessun codice nativo —
solo il motore crittografico della JVM con un'API umana sopra. Ecco cosa
ottieni:

- **`Signer` e `Verifier`** sono `@FunctionalInterface`. Fanno una sola
  cosa e sono immutabili. Puoi passarli, memorizzarli in campi, usarli
  nelle lambda.
- **`Bytes`** è il tipo universale di I/O di Bruce. Avvolge `byte[]` con
  factory method convenienti (`Bytes.from(String)`, `Bytes.from(Path)`,
  `Bytes.from(InputStream)`) e supporto alla codifica (`encode(BASE64)`,
  `encode(HEX)`). Niente più gestione manuale di charset o Base64.
- I **builder** gestiscono la cerimonia `getInstance`/`init` una volta al
  momento della costruzione. Dopo, firmare e verificare sono chiamate di
  una riga.
- Le **eccezioni checked** vengono catturate e wrappate in
  `BruceException` unchecked, così non inquinano le firme dei tuoi metodi.

## Chiavi multiple? Nessun problema

Se gestisci firme per più soggetti, Bruce ha le varianti `SignerByKey` e
`VerifierByKey`:

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

Prova a farlo in modo pulito con la JCA pura. Ti aspetto.

## Per iniziare

Aggiungi Bruce al tuo progetto:

```xml
<dependency>
    <groupId>com.mirkocaserta.bruce</groupId>
    <artifactId>bruce</artifactId>
    <version>2.0.0</version>
</dependency>
```

Oppure con Gradle:

```kotlin
implementation("com.mirkocaserta.bruce:bruce:2.0.0")
```

Bruce richiede Java 21+ e ha zero dipendenze esterne.

- [GitHub](https://github.com/mcaserta/bruce)
- [Documentazione](https://bruce.mirkocaserta.com)
- [Maven Central](https://central.sonatype.com/artifact/com.mirkocaserta.bruce/bruce)

La vita è troppo breve per `KeyPairGenerator.getInstance()`.
