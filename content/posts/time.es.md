+++
title = "Una Introduccion a la Representacion, Serializacion y Gestion del Tiempo en el Software"
date = 2013-04-15T14:19:00Z
description = "La mayoria de los problemas en el desarrollo de software suelen surgir de un conocimiento pobre e inconsistente del dominio en cuestion. Un tema aparentemente tan simple como la representacion, serializacion y gestion del tiempo puede causar facilmente una serie de problemas tanto al programador novato como al experimentado."
[taxonomies]
categories = ["Software Development"]
tags = ["time", "software development"]
[extra]
toc = true
+++


La mayoria de los problemas en el desarrollo de software suelen surgir de un
conocimiento pobre e inconsistente del dominio en cuestion. Un tema
aparentemente tan simple como la representacion, serializacion y gestion del
tiempo puede causar facilmente una serie de problemas tanto al programador
novato como al experimentado.

En este post, veremos que no hace falta ser un
[Senor del Tiempo](http://en.wikipedia.org/wiki/Time_Lord) para comprender los
poquisimos conceptos simples necesarios para no caer en el infierno de la
gestion del tiempo.

![El tiempo no existe. Los relojes existen.](/images/posts/time.jpg)

## Representacion

Una pregunta tan simple como _"Que hora es?"_ presupone una serie de sutilezas
contextuales que son obvias para el cerebro humano, pero se convierten en un
completo sinsentido para un ordenador.

Por ejemplo, si me estuvieras preguntando que hora es ahora mismo, podria decir:
_"Son las 15:39"_ y, si fueras un colega en mi oficina, esa seria informacion
suficiente para deducir que son las 15:39 CEST. Esto se debe a que ya estarias
en posesion de algunos bits de informacion contextual importantes como

- es por la tarde porque ya hemos almorzado
- estamos en Roma, por lo tanto nuestra zona horaria es la Hora Central Europea
  (CET) o la Hora de Verano de Europa Central (CEST)
- cambiamos al horario de verano hace unas semanas, asi que la zona horaria
  actual debe ser la Hora de Verano de Europa Central

_15:39_ es una representacion conveniente del tiempo siempre y cuando estemos en
posesion de los bits contextuales. Para representar el tiempo de manera
universal, deberian tener una idea de que son
[UTC](http://en.wikipedia.org/wiki/Coordinated_Universal_Time) y las
[zonas horarias](http://en.wikipedia.org/wiki/Time_zone).

Por favor, no confundan UTC con GMT: aunque su hora coincide, son _dos cosas
diferentes_: uno es un estandar universal mientras que el otro es una zona
horaria. Cuando alguien dice que usa GMT, a menos que esa persona tenga un
divertido acento escoces, lo que realmente quiere decir es UTC.

Como radioaficionado, tengo contactos con personas de todo el mundo. Cada
operador esta obligado a mantener un registro de sus contactos, y normalmente
intercambiamos las llamadas tarjetas QSL, que son una confirmacion escrita del
contacto. Por supuesto, una tarjeta QSL debe reportar la hora exacta del
contacto de radio y por convencion es en UTC. Se que cuando recibo una tarjeta
QSL de cualquier colega radioaficionado, sin importar donde este ubicado en
todo el mundo, puedo buscar el contacto en mi registro y la informacion de
fecha y hora va a coincidir, ya que ambos nos adherimos al mismo estandar: UTC.

Ahora, supongamos que tengo que programar un chat de Skype con un colega
desarrollador en los Estados Unidos. Podria escribirle un correo y decir algo
como _"nos vemos el 2/3"_. En Italia, eso seria el segundo dia del mes de
marzo, pero para una persona estadounidense, eso seria el tercer dia del mes de
febrero. Como pueden ver, nuestro chat nunca va a ocurrir.

Estos son solo algunos ejemplos del tipo de problemas que podrian surgir al
representar informacion de fecha y hora. Afortunadamente, hay una solucion a
los enigmas de la representacion, a saber, el estandar
[ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) o, mejor aun,
[RFC 3339](https://www.rfc-editor.org/rfc/rfc3339).

Solo para darles un ejemplo, en RFC 3339, `1994-11-05T08:15:30-05:00`
corresponde al 5 de noviembre de 1994, 8:15:30 am, Hora Estandar del Este de
los Estados Unidos. `1994-11-05T13:15:30Z` corresponde al mismo instante (la
`Z` significa UTC). Mismo instante, diferentes representaciones.

RFC 3339 tambien tiene el bonito efecto secundario de proporcionar ordenamiento
natural en sistemas que utilizan el orden lexicografico (como los sistemas de
archivos) porque la informacion esta organizada de la mas a la menos
significativa, es decir, ano, mes, dia, hora, minuto, segundo, fraccion de
segundo[^tz].

Incluso si solo estan manejando horas locales en su software, deben saber que,
a menos que tambien muestren la zona horaria, nunca pueden estar seguros de la
hora. No puedo recordar cuantas veces un desarrollador me ha pedido que
_arregle la hora_ en el servidor, solo para descubrir que su software estaba
imprimiendo la hora en UTC.

En el momento de la visualizacion, esta bien manejar representaciones parciales
del tiempo porque la experiencia de usuario asi lo requiere. Solo asegurense,
al depurar, de imprimir el conjunto completo de informacion, incluyendo la zona
horaria, de lo contrario nunca pueden estar seguros de que lo que estan viendo
es lo que realmente creen que es.

Aunque un momento dado en el tiempo es inmutable, hay un numero arbitrario de
formas de expresarlo. Y ni siquiera hemos hablado de los calendarios juliano o
indio o de cosas como expresar duraciones.

Permitanme resumir algunos puntos clave hasta ahora:

- conozcan las [zonas horarias](http://en.wikipedia.org/wiki/Time_zone) y
  [UTC](http://en.wikipedia.org/wiki/Coordinated_Universal_Time)
- no confundan UTC y GMT
- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) y
  [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) son sus amigos
- siempre impriman la zona horaria al depurar

![Reloj de Volver al Futuro](/images/posts/bttf-clock.png)

## Serializacion

Hablando de software, la serializacion es un proceso donde se toma el estado de
un objeto y se detalla de tal manera que pueda ser posteriormente reconstruido
por completo, exactamente como el original, utilizando la informacion detallada
(serializada). Piensen en un archivo xml o json:

```json
{
  "person": {
    "name": "Mirko",
    "surname": "Caserta",
    "class": "nerd"
  }
}
```

Esta es la forma serializada de una peculiar instancia imaginaria de la clase
persona.

En el mundo binario de los ordenadores, el tiempo se serializa y almacena
normalmente utilizando la convencion del
[tiempo Unix](http://en.wikipedia.org/wiki/Unix_time). Mientras escribo esto,
mi tiempo Unix es `1366191727`. Es decir: `1366191727` segundos han pasado
desde el 1 de enero de 1970 a las 00:00 UTC. No es una forma bastante
inteligente, consistente y compacta de representar una pletora de informacion,
como `17 de abril de 2013 @ 11:42:07am CEST`?

El tiempo Unix es solo otra representacion arbitraria de un momento dado en el
tiempo, aunque no muy legible para los humanos. Pero pueden tomar ese numero,
escribirlo en un trozo de papel, pegarlo a una paloma mensajera, y su
destinatario seria capaz de descifrar su mensaje vital simplemente recurriendo
a Internet y visitando un sitio como
[unixtimestamp.com](http://www.unixtimestamp.com/) o
[currentmillis.com](https://currentmillis.com/).

Si son adictos a la linea de comandos como yo, en sistemas Linux pueden usar:

```bash
$ date -d @1366191727
Wed Apr 17 11:42:07 CEST 2013
```

Sin embargo, en sistemas derivados de BSD como Mac OS X, date -d no funciona
asi que tienen que usar en su lugar:

```bash
$ date -r 1366191727
Wed Apr 17 11:42:07 CEST 2013
```

Igual que pueden escribir ese numero en un trozo de papel y despues devolver el
instante completo a la vida, pueden almacenarlo en un archivo o en una fila de
su RDBMS favorito. Aunque puede que quieran comunicarse con su RDBMS usando un
driver apropiado y pasandole una instancia de fecha simple; su driver se
encargara entonces de la conversion al formato de serializacion subyacente de
la base de datos para instancias de tiempo nativas.

Al almacenar el tiempo usando un formato nativo, obtienen gratuitamente las
excelentes funcionalidades de formateo, ordenamiento, consulta, etc. de su
RDBMS para el tiempo, asi que puede que quieran pensarlo dos veces antes de
almacenar timestamps Unix simples en, digamos, Oracle.

Solo asegurense de saber a que zona horaria se refiere su timestamp Unix, o
podrian confundirse despues en el momento de la deserializacion. Por defecto, un
timestamp Unix esta en UTC. Si usan las librerias de su sistema, deberian estar
bien.

Cuando trabajen con bases de datos, usen los tipos de datos mas apropiados. Por
ejemplo en Oracle, hay
[cuatro tipos de datos diferentes](https://www.infobloom.com/why-does-china-have-only-one-time-zone.htm):
`DATE`, `TIMESTAMP`, `TIMESTAMP WITH TIME ZONE` y
`TIMESTAMP WITH LOCAL TIME ZONE`. Ademas, las bases de datos normalmente tienen
un concepto de zona horaria de la base de datos y zona horaria de la sesion, asi
que asegurense de entender como su base de datos especifica los esta usando. Un
usuario que abre una sesion con zona horaria `A` va a ver valores diferentes que
un usuario que se conecta con zona horaria `B`.

ISO 8601 tambien es un favorito para la serializacion. De hecho, se usa en el
estandar [XML Schema](http://www.w3.org/TR/xmlschema-2/#isoformats). La mayoria
de los frameworks xml son nativamente capaces de serializar y deserializar de
ida y vuelta entre `xs:date`, `xs:time` y `xs:dateTime` y el formato nativo de
su lenguaje de programacion (y viceversa). Lo mismo aplica para json. Solo
tengan cuidado al manejar representaciones parciales: por ejemplo, si omiten la
zona horaria, asegurense de acordar previamente una por defecto con su
contraparte comunicante (normalmente UTC o su zona horaria local si ambos estan
en la misma).

## Gestion

Antes que nada, si creen que pueden escribir su propia libreria de software
para la gestion del tiempo, o incluso escribir una pequena rutina que sume o
reste valores arbitrarios de la hora del dia, permitanme mostrarles el codigo
fuente de las clases
[java.util.Date](https://github.com/openjdk/jdk17u/blob/master/src/java.base/share/classes/java/util/Date.java)
y
[java.util.GregorianCalendar](https://github.com/openjdk/jdk17u/blob/master/src/java.base/share/classes/java/util/GregorianCalendar.java)
del JDK 7, que pesan respectivamente 1331 y 3179 lineas de codigo.

De acuerdo, estos probablemente no son los mejores ejemplos de rutinas de
software que manejan el tiempo, lo admito. Por eso se escribieron librerias
Java como [Joda Time](http://joda-time.sourceforge.net/). De hecho, Joda Time
se hizo tan popular que dio origen a
[JSR-310](http://jcp.org/en/jsr/detail?id=310) y ahora es
[parte](http://www.h-online.com/open/news/item/JSR-310-s-Date-and-Time-API-added-to-JDK-8-1708647.html)
[del](http://www.infoq.com/news/2013/02/java-time-api-jdk-8) JDK 8.

El uso de frameworks de tiempo populares, bien disenados e implementados les
salvara la vida. En serio. Tomense el tiempo para familiarizarse con la API de
su eleccion.

## Tareas Comunes de Tiempo en Java

Veamos como todo esto se traduce en codigo java. Cualquier lenguaje sera por
supuesto diferente pero todo lo que estoy haciendo aqui deberia ser posible en
el lenguaje de su eleccion.

Por favor, no usen `java.util.Date` ni `java.util.Calendar`. Ya no usamos esas
clases. La nueva API de tiempo esta en el paquete `java.time`.

```java
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

class Main {
  public static void main(String[] args) {
    ZoneId systemDefault = ZoneId.systemDefault();
    System.out.println("systemDefault = " + systemDefault);

    long now = System.currentTimeMillis();
    System.out.println("now = " + now);

    LocalDate localDate = LocalDate.now();
    System.out.println("localDate = " + localDate);

    LocalDateTime localDateTime = LocalDateTime.now();
    System.out.println("localDateTime = " + localDateTime);

    LocalDateTime utc = LocalDateTime.now(ZoneId.of("UTC"));
    System.out.println("utc = " + utc);

    ZonedDateTime zonedDateTime1 = ZonedDateTime.now();
    System.out.println("zonedDateTime1 = " + zonedDateTime1);

    ZonedDateTime zonedDateTime2 = ZonedDateTime.now(ZoneId.of("UTC"));
    System.out.println("zonedDateTime2 = " + zonedDateTime2);

    String iso8601 = zonedDateTime2.format(DateTimeFormatter.ISO_INSTANT);
    System.out.println("iso8601 = " + iso8601);

    ZonedDateTime zonedDateTime3 = zonedDateTime2.plus(Duration.ofDays(7));
    System.out.println("zonedDateTime3 = " + zonedDateTime3);

    Instant nowAsInstant = Instant.ofEpochMilli(now);
    System.out.println("nowAsInstant = " + nowAsInstant);

    ZonedDateTime nowAsInstantInRome = nowAsInstant.atZone(ZoneId.of("Europe/Rome"));
    System.out.println("nowAsInstantInRome = " + nowAsInstantInRome);

    LocalDateTime romeLocalTime = nowAsInstantInRome.toLocalDateTime();
    System.out.println("romeLocalTime = " + romeLocalTime);

    LocalDate localDateInRome = nowAsInstantInRome.toLocalDate();
    System.out.println("localDateInRome = " + localDateInRome);

    LocalTime localTimeInRome = nowAsInstantInRome.toLocalTime();
    System.out.println("localTimeInRome = " + localTimeInRome);

    String shortTimeInRome = nowAsInstantInRome.format(DateTimeFormatter.ofLocalizedTime(FormatStyle.SHORT));
    System.out.println("shortTimeInRome = " + shortTimeInRome);

    String evenShorterTimeInRome = nowAsInstantInRome.format(DateTimeFormatter.ofPattern("HH:mm"));
    System.out.println("evenShorterTimeInRome = " + evenShorterTimeInRome);
  }
}
```

Si ejecutan este codigo con `java Main.java`, deberian ver algo como esto:

```bash
systemDefault = Europe/Rome
now = 1753718631998
localDate = 2025-07-28
localDateTime = 2025-07-28T10:03:51.999991
utc = 2025-07-28T16:03:52.000089
zonedDateTime1 = 2025-07-28T10:03:52.000532-06:00[Europe/Rome]
zonedDateTime2 = 2025-07-28T16:03:52.000620Z[UTC]
iso8601 = 2025-07-28T16:03:52.000620Z
zonedDateTime3 = 2025-08-04T16:03:52.000620Z[UTC]
nowAsInstant = 2025-07-28T16:03:51.998Z
nowAsInstantInRome = 2025-07-28T18:03:51.998+02:00[Europe/Rome]
romeLocalTime = 2025-07-28T18:03:51.998
localDateInRome = 2025-07-28
localTimeInRome = 18:03:51.998
shortTimeInRome = 6:03PM
evenShorterTimeInRome = 18:03
```

## Pruebas

En Java hay una clase `Clock` que permite conectar una implementacion de reloj
arbitrariamente configurable para su uso en la API de tiempo. Esto es
especialmente util en pruebas unitarias y depuracion. Otros lenguajes deberian
tener una funcionalidad equivalente.

<https://docs.oracle.com/javase/8/docs/api/java/time/Clock.html>

## Recursos Adicionales

Aqui hay algunos enlaces utiles que he acumulado con el tiempo:

- [How to Think About Time in Programming](https://shanrauf.com/archive/how-to-think-about-time-in-programming)
- [UTC is enough for everyone... right?](https://zachholman.com/talk/utc-is-enough-for-everyone-right)
- [The Problem with Time & Timezones - Computerphile](https://youtu.be/-5wpm-gesOY)
- [Falsehoods programmers believe about time](https://gist.github.com/timvisee/fcda9bbdff88d45cc9061606b4b923ca)
- [Storing UTC is not a silver bullet](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/)
- [The 5 laws of API dates and times](http://apiux.com/2013/03/20/5-laws-api-dates-and-times/)
- [Storing Date/Times in Databases](http://derickrethans.nl/storing-date-time-in-database.html)
- [5 Levels of Handling Date and Time in Python](https://medium.com/techtofreedom/5-levels-of-handling-date-and-time-in-python-46b601e47f65)
- [Timezone Bullshit](https://blog.wesleyac.com/posts/timezone-bullshit)
- [ISO 8601: the better date format](https://kirby.kevinson.org/blog/iso-8601-the-better-date-format/)
- [A summary of the international standard date and time notation](https://www.cl.cam.ac.uk/~mgk25/iso-time.html)
- [A Short History of the Modern Calendar](http://youtu.be/kzprsR2SvrQ)
- [Should We 'Heed the Science and Abolish Daylight Saving Time'?](https://yro.slashdot.org/story/21/03/14/014233/should-we-heed-the-science-and-abolish-daylight-saving-time)
- [When a Calendar Defeated Russia in the 1908 Olympics](https://www.si.com/extra-mustard/2013/12/30/the-extra-mustard-trivia-hour-when-a-calendar-defeated-russia-in-the-1908-olympics)
- [Why does China Have Only One Time Zone?](https://www.infobloom.com/why-does-china-have-only-one-time-zone.htm)
- [First day meme](https://www.reddit.com/r/ProgrammerHumor/comments/l99ip9/or_is_it_0th/)
- [Glory to ISO8601 Subreddit](https://www.reddit.com/r/ISO8601/)
- [Time.is](https://time.is/)
- [How Ancient Romans Kept Time](https://www.amusingplanet.com/2021/05/how-ancient-romans-kept-time.html)
- [rtc: rk808: Compensate for Rockchip calendar deviation on November 31st](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=f076ef44a44d02ed91543f820c14c2c7dff53716)
- [Daylight saving time is 'not helpful' and has 'no upsides' experts say](https://eu.usatoday.com/story/news/health/2021/11/01/fall-back-daylight-saving-time-health-experts-want-you-know/6174156001/)
- [Neil deGrasse Tyson Reminds Us Daylight Saving Time is Ridiculous](https://youtu.be/j8VcpmpN0NM)
- [A "Day" Isn't What It Used To Be](https://youtu.be/DHIQxVhruak)
- [Why Time Zones Exist](https://youtu.be/qjUT7FbmNZ8)
- [xkcd: Dailight Calendar](https://xkcd.com/2542/)
- [xkcd: Edge Cake](https://xkcd.com/2549/)
- [How does Britain know what time it is?](https://youtu.be/yqciKS_N0K8)
- [Clockwork raises $21M to keep server clocks in sync](https://techcrunch.com/2022/03/16/clockwork-raises-21m-to-keep-server-clocks-in-sync/)
- [How to Fix Daylight Saving Time](https://youtu.be/39wAtJwFrVY)
- [US Senate Unanimously Passes Bill to Make Daylight Saving Time Permanent](https://www.reddit.com/r/sysadmin/comments/tez7ra/us_senate_unanimously_passes_bill_to_make/)
- [The Daily WTF: Starting your Date](https://thedailywtf.com/articles/starting-your-date)
- [Tech Giants Want To Banish the Leap Second To Stop Internet Crashes](https://www.cnet.com/tech/computing/tech-giants-try-banishing-the-leap-second-to-stop-internet-crashes/)
- [Meta calls for the death of the leap second](https://www.engadget.com/meta-death-of-the-leap-second-103545749.html)
- [Satellites Keep the World's Clocks on Time. What if They Fail?](https://www.wired.com/story/satellite-time-distribution/)
- [Stop using utcnow and utcfromtimestamp](https://blog.ganssle.io/articles/2019/11/utcnow.html)
- [Dall'ora legale all'ora solare: i pro e contro del cambio orario e perche si parla di abolizione](https://youtu.be/Fu6AT5WLgJg)
- [Deer-vehicle collisions spike when daylight saving time ends](https://www.sciencenews.org/article/deer-vehicle-collisions-daylight-saving-time)
- [The Falling Dates](https://thedailywtf.com/articles/the-falling-dates)
- [Scientists Don't Want to Count Leap Seconds, so They're Going Away](https://www.howtogeek.com/850114/scientists-don%E2%80%99t-want-to-count-leap-seconds-so-they%E2%80%99re-going-away/)
- [What time is it on the Moon?](https://www.nature.com/articles/d41586-023-00185-z)
- [What time is it on the moon? Europe pushing for lunar time zone](https://www.cbc.ca/news/science/moon-time-zone-1.6763962)
- [What time is it? A simple question with a complex answer. How computers synchronize time](https://andrea.corbellini.name/2023/01/23/what-time-is-it/)
- [The Daylight Saving Time Mess Just Won't Go Away](https://www.wired.com/story/2023-daylight-saving-time/)
- [The best way to handle time zones in a Java web application](https://vladmihalcea.com/time-zones-java-web-application/)
- [Your Calendrical Fallacy Is...](https://yourcalendricalfallacyis.com/)
- [Greenland Solves the Daylight Saving Time Debate](https://www.bnnbloomberg.ca/greenland-solves-the-daylight-saving-time-debate-1.1900228)
- [Time Zone and Currency Database in JDK](https://foojay.io/today/time-zone-and-currency-database-in-jdk/)
- [(There Ought To Be A) Moonlight Saving Time](https://youtu.be/Zpiou9Rn8UE)
- [We don't do DST at this company](https://blog.backslasher.net/no-dst.html)
- [Daylight Savings Time be like](https://www.instagram.com/p/CzPDoZcuV-b/)
- [List of 2024 leap day bugs](https://codeofmatt.com/list-of-2024-leap-day-bugs/)
- [California State Legislator Proposes Ending DST](https://yro.slashdot.org/story/24/03/09/2311200/california-state-legislator-proposes-ending-daylight-saving-time)
- [The science behind why people hate Daylight Saving Time so much](https://arstechnica.com/features/2024/03/the-science-behind-why-people-hate-daylight-savings-time-so-much/)
- [Storing UTC is not a silver bullet](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/)
- [JS Dates Are About to Be Fixed](https://docs.timetime.in/blog/js-dates-finally-fixed/)
- [Researchers Figure Out How To Keep Clocks On the Earth, Moon In Sync 13](https://science.slashdot.org/story/24/08/15/0145200/researchers-figure-out-how-to-keep-clocks-on-the-earth-moon-in-sync)
- [NASA confirms it's developing the Moon's new time zone](https://www.engadget.com/science/space/nasa-confirms-its-developing-the-moons-new-time-zone-165345568.html)
- [Storing time for human events](https://simonwillison.net/2024/Nov/27/storing-times-for-human-events/)
- [Date and Time Mappings with Hibernate and JPA](https://thorben-janssen.com/hibernate-jpa-date-and-time/)
- [I Found the Dumbest Time Zone](https://youtu.be/Lz3jAEdzbbA)
- [A Server for Matching Long/Lat to Timezone](https://github.com/LittleGreenViper/LGV_TZ_Lookup)
- [Ianto Cannon's clock graphics](https://ianto-cannon.github.io/clock.html)
- [AlphaDec, a timezone-agonistic time format for humans, machines, and AI](https://github.com/firasd/alphadec)
- [RFC 3339 vs ISO 8601](https://ijmacd.github.io/rfc3339-iso8601/)
- [How the tz database works](https://yatsushi.com/blog/tz-database/)
- [A literary appreciation of the Olson/Zoneinfo/tz database](https://blog.jonudell.net/2009/10/23/a-literary-appreciation-of-the-olsonzoneinfotz-database/)
- [Benjamin Franklin's Essay on Daylight Saving](https://www.webexhibits.org/daylightsaving/franklin3.html)
- [How England Colonized Time](https://youtu.be/mkVxJVgO1QY)
- [Cheatsheet & Examples: date](https://tech.mrleong.net/cheatsheet-examples-date)
- [timekeep.cc](https://www.timekeep.cc/)

## Memes

![Elon Musk: "Estoy llevando gente a Marte!", Desarrolladores: "Fantastico, mas
zonas horarias que soportar".](/images/posts/mars-timezone.png)

![Perro del horario de verano](/images/posts/daylight-dog.jpg)

![Horario de verano? Que tal inversiones diurnas?](/images/posts/daylight-investing.jpg)

![Amigo: "Que paso?", Yo: "Tuve que trabajar con zonas horarias
hoy".](/images/posts/timezones-meme.png)

![Meme del 1 de enero de 1970](/images/posts/time-universe-meme.png)

![Meme Boeing 787](/images/posts/time-boeing-787.jpg)

![xkcd: Consensus Time](/images/posts/time-consensus.jpg)

![Desarrolladores teniendo que implementar otro cambio de zona horaria mas](/images/posts/time-devs.png)

![Desarrolladores teniendo que explicar...](/images/posts/time-devs-again.png)

![Dias desde el ultimo problema de zona horaria: 0](/images/posts/time-days-since.png)

![Relojes atrasados](/images/posts/clocks-back-meme.jpg)

![Picard DST](/images/posts/picard-dst.png)

![Meme del 1 de enero](/images/posts/time-format-meme.png)

![Un mapa completo de todos los paises que usan el formato de fecha MMDDYYYY](/images/posts/terrible-maps.png)

![Comic de Shen sobre el formato de EE.UU.](/images/posts/shen-usa-format.png)

![Cita perfecta](/images/posts/perfect-date.jpg)

![DST](/images/posts/time-dst-meme.jpg)

![Trabajadores nocturnos](/images/posts/time-overnight-meme.jpg)

![XKCD: DateTime](/images/posts/time-xkcd-datetime.png)

![Paises Bajos](/images/posts/time-netherlands.jpg)

[^tz]: asumiendo que se usa la misma zona horaria en todas partes
