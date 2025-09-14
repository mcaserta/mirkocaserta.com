+++
title = "Escribe mensajes de log decentes, o Jesús llora"
date = 2009-10-02T08:45:00Z
description = "Guía completa para escribir mensajes de log efectivos en Java: mejores prácticas para debugging, monitoreo en producción, manejo de excepciones y configuración de frameworks de logging modernos."
[taxonomies]
categories = ['Software']
tags = ['logging', 'java', 'desarrollo de software']
+++

Me gustaría proponer algunas consideraciones sobre el aparentemente oscuro arte
de escribir mensajes de log. Digo _aparentemente oscuro_ porque se trata de un
tema aparentemente trivial pero que en realidad resulta ser bastante complejo.

Al tratarse de observaciones generales, estas deberían tomarse con una dosis de
sentido común y bajo estrecha observación del proctólogo de confianza; esto no
quita que con toda probabilidad encontrarás las siguientes notas razonablemente
útiles ya que están basadas en la experiencia personal (a.k.a. sangre derramada
en el campo).

# Nada de guerras religiosas, o Feuerbach llora

En el mundo Java, log4j se considera el estándar de facto cuando se habla de
frameworks de logging. Sin embargo, mi consejo es usar un framework más moderno,
como slf4j o logback. Logback está basado en la API de slf4j y es suficiente
echar un vistazo a los ejemplos en la documentación para ser productivo en un
cuarto de hora.

Me gustaría evitar explicar las ventajas de estos frameworks comparados con
log4j o java.util.logging porque creo que el tema no solo está abundantemente
tratado en la literatura sino que también es fácilmente propenso a guerras
religiosas. Las guerras religiosas son por definición irracionales además de
mortalmente aburridas. Eres lo suficientemente inteligente para documentarte y
decidir por ti mismo.

Más allá de cualquier framework y el lenguaje de programación usado, los
mensajes de log son esenciales tanto en la fase de test/debug como en la fase de
monitoreo en producción.

El log a menudo se subestima y se trata como una molestia que debe llevarse a
cabo más por deber que por una necesidad real. Sin embargo, te puedo asegurar
que no hay nada peor que ser llamado a resolver un problema urgente en
producción y encontrarte frente a un log desordenado.

Nadie te dejará conectar con el debugger en producción. Los logs son tu única
línea de defensa.

En particular, cuando algunos miles de usuarios están a punto de gastar un
montón de dinero en el sitio web de tu cliente y la aplicación está escrita por
ti y por alguna razón oscura la posibilidad de tal gasto considerable debería
ser negada a los usuarios del mencionado sitio, querrás estar seguro de tener la
posibilidad de entender rápidamente qué está pasando detrás de escena. En casos
como estos, decir que escribir mal en el log hace llorar a Jesús es como máximo
un eufemismo que ni siquiera es demasiado colorido.

# Basura entra, basura sale

Uno de los conceptos elementales del software es el de entrada/salida.
Conociendo la entrada y el estado de todas las variables involucradas en el
proceso de procesamiento, sabes que puedes esperar una cierta salida.

Si la salida no es consistente con las expectativas, significará que analizando
el contexto, la entrada, el código y el estado de las variables locales y
globales involucradas, deberías ser capaz de entender lo qué no cuadra.

No es necesario rastrear en el log cada cambio de estado de cada variable,
especialmente si la función o el método son suficientemente complejos.

Ejemplo de log inútil:

```java
public BuyResponse buyItem(BuyRequest request) {
    log.debug(" ----- buyItem ------ start -----");
    // ...
    log.debug(" ----- buyItem ------ stop -----");
    return response;
}
```

Ejemplo de log más útil:

```java
public BuyResponse buyItem(BuyRequest request) {
    log.debug("buyItem(): request={}", request);
    // ...
    log.debug("buyItem(): request={}, response={}", request, response);
    return response;
}
```

De esta manera puedo verificar la entrada y salida del método. Repitiendo la
entrada también a la salida del método, será más fácil correlacionar los
mensajes en la fase de análisis. Sin embargo, este tipo de verbosidad no siempre
es útil.

Como siempre, el sentido común debería guiarte en la elección. En cualquier
caso, entrada, salida y cambios de estado de variables importantes deberían ser
rastreados al menos a nivel de debug.

Asegúrate de que las clases que incluyes en los logs tengan una sobrescritura
sensata del método `toString()`, de lo contrario en los logs solo leerás un
montón de direcciones de punteros inútiles y no el estado actual de las
variables de los objetos.

# Logar a un cierto nivel

Todos los frameworks de logging tienen un mecanismo de niveles que permite
filtrar la salida para obtener solo los mensajes que realmente nos interesan.

A menudo sucede hacer copia y pega de declaraciones de log por lo que un mensaje
que debería estar a nivel de error en su lugar termina a nivel de debug.
¡Cuidado con el copia y pega!

# Formateo coherente y sin adornos

Trata de mantener un estilo coherente y sin demasiados adornos en los mensajes
de log. Desactiva el _bloqueo de mayúsculas_, ten piedad. Esto te ayudará en la
fase de análisis y evitará que tus aplicaciones tengan la apariencia de algo
escrito por un mocoso en visual basic.

# Pon los mensajes en una línea

En la medida de lo posible, evita introducir caracteres de salto de línea en los
mensajes de log. Cuando uses `grep` para buscar los mensajes, es importante que
a una sola línea de salida corresponda un mensaje coherente.

Al principio, ir a una nueva línea parece dar una mejor apariencia a la salida
pero con el tiempo te darás cuenta de que habrías hecho mejor en no hacerlo.

# Cuidado con el copia y pega

![Alarma roja](../../images/posts/blinking-alarm.gif)

Como ya se mencionó, puede suceder hacer copia y pega de declaraciones de log.

Cada vez que hago copia y pega, se enciende una bombilla especial en mi cabeza
que sirve para recordarme:

> verifica lo que copiaste al menos dos veces porque seguramente olvidaste
> modificar algo

Esto se aplica más en general y no solo para los mensajes de log. Si tuviera un
euro por cada fragmento de código erróneo debido a un copia y pega apresurado,
en este momento estaría en la playa de una isla tropical bebiendo cócteles
rodeado de señoritas complacientes.

# Excepciones

El log de un error debería llevar consigo la instancia de la excepción capturada
y, si es posible y útil, un mínimo de contexto. A menudo veo código del tipo:

```java
catch (ConnectionException e) {
    log.error("Error: " + e);
}
```

Sería mejor algo así:

```java
catch (ConnectionException e) {
    log.error("connection error: user={}", user, e);
}
```

De esta manera no pierdo el stack trace de la excepción capturada y puedo
rastrearla de vuelta a una instancia específica de usuario.

# Conoce las herramientas

Igualmente importante es conocer los mecanismos de despliegue y configuración
del framework que estás usando. Podría serte útil por ejemplo establecer un
filtro específico en un cierto logger. También aprende a conocer los mecanismos
de formateo de mensajes.

Configurando apropiadamente un formateador, los frameworks modernos permiten
rastrear por ejemplo timestamps al milisegundo, nombres de clases, métodos y
nombre del thread. El nombre del thread es esencial en una aplicación
concurrente para seguir el flujo de ejecución.
