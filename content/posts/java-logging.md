+++
title = "Write decent log messages, or Jesus cries"
date = 2009-10-02T08:45:00Z
description = "Complete guide for writing effective log messages in Java: best practices for debugging, production monitoring, exception handling, and configuration of modern logging frameworks."
[taxonomies]
categories = ['Software']
tags = ['logging', 'java', 'software development']
+++

I would like to propose some considerations on the apparently obscure art of
writing log messages. I say _apparently obscure_ because it's a seemingly
trivial topic that actually turns out to be quite complex.

Since these are general observations, they should be taken with a dose of common
sense and under close observation by your trusted proctologist; this doesn't
mean that you'll probably find the following notes reasonably useful since
they're based on personal experience (a.k.a. blood spilled in the field).

# No religious wars, or Feuerbach cries

In the Java world, log4j is considered the de facto standard when it comes to
logging frameworks. However, my advice is to use a more modern framework, like
slf4j or logback. Logback is based on the slf4j API and it's sufficient to take
a look at the examples in the documentation to be productive within a quarter of
an hour.

I would like to avoid explaining the advantages of these frameworks compared to
log4j or java.util.logging because I believe the topic is not only abundantly
covered in literature but also easily prone to religious wars. Religious wars
are by definition irrational as well as mortally boring. You're smart enough to
research and decide for yourself.

Beyond any framework and the programming language used, log messages are
essential both in the test/debug phase and in the monitoring phase in
production.

Logging is often underestimated and treated as a nuisance that must be carried
out more out of duty than out of real necessity. However, I can assure you that
there is nothing worse than being called to solve an urgent problem in
production and finding yourself in front of a messed up log.

No one will ever let you connect with the debugger in production. Logs are your
only line of defense.

In particular, when some thousands of users are about to spend a bunch of money
on your client's website and the application is written by you and for some
obscure reason the possibility of such a large expense should be denied to the
users of the aforementioned site, you'll want to be sure to have the possibility
to quickly understand what's happening behind the scenes. In cases like these,
saying that writing badly in the log makes Jesus cry is at most a euphemism
that's not even too colorful.

# Garbage in, garbage out

One of the elementary concepts of software is that of input/output. By knowing
the input and the state of all variables involved in the processing process, you
know you can expect a certain output.

If the output is not consistent with expectations, it means that by analyzing
the context, the input, the code and the state of local and global variables
involved, you should be able to understand what doesn't add up.

It's not necessary to trace in the log every state change of every variable,
especially if the function or method are sufficiently complex.

Example of useless log:

```java
public BuyResponse buyItem(BuyRequest request) {
    log.debug(" ----- buyItem ------ start -----");
    // ...
    log.debug(" ----- buyItem ------ stop -----");
    return response;
}
```

Example of more useful log:

```java
public BuyResponse buyItem(BuyRequest request) {
    log.debug("buyItem(): request={}", request);
    // ...
    log.debug("buyItem(): request={}, response={}", request, response);
    return response;
}
```

This way I can check the input and output of the method. By repeating the input
also at the exit of the method, it will be easier to correlate the messages in
the analysis phase. However, this type of verbosity is not always useful.

As usual, common sense should guide you in the choice. In any case, input,
output and state changes of important variables should be traced at least at
debug level.

Make sure that the classes you include in the logs have a sensible override of
the `toString()` method, otherwise you'll only be reading a bunch of useless
pointer addresses in the logs and not the current state of the object variables.

# Logging at a certain level

All logging frameworks have a level mechanism that allows you to filter the
output so as to only output the messages that really interest us.

It often happens to copy and paste log statements so that a message that should
be at error level instead ends up at debug level. Watch out for copy and paste!

# Coherent formatting without frills

Try to maintain a consistent style without too many frills in log messages. Turn
off the _caps lock_, have mercy. This will help you in the analysis phase and
prevent your applications from looking like something written by a kid in visual
basic.

# Put messages on one line

Avoid introducing line breaks in log messages as much as possible. When you
`grep` for messages, it's important that a single line of output corresponds to
a coherent message.

At first, going to a new line seems to give a better appearance to the output
but over time you'll realize that you would have done better not to do it.

# Watch out for copy and paste

![Red alarm](../../images/posts/blinking-alarm.gif)

As already mentioned, it can happen to copy and paste log statements.

Every time I copy and paste, a special light bulb turns on in my head that
serves to remind me:

> check what you copied at least twice because you surely forgot to modify
> something

This applies more generally and not only for log messages. If I had a euro for
every piece of wrong code due to a hasty copy and paste, at this moment I would
be on the beach of a tropical island sipping cocktails surrounded by complacent
young ladies.

# Exceptions

The log of an error should carry with it the instance of the caught exception
and, if possible and useful, a minimum of context. I often see:

```java
catch (ConnectionException e) {
    log.error("Error: " + e);
}
```

It would be better something like this:

```java
catch (ConnectionException e) {
    log.error("connection error: user={}", user, e);
}
```

This way I don't lose the stack trace of the caught exception and I can trace it
back to a specific user instance.

# Know the tools

Equally important is knowing the deployment and configuration mechanisms of the
framework you're using. It might be useful for example to set a specific filter
on a certain logger. Also learn to know the mechanisms of message formatting.

By properly configuring a formatter, modern frameworks allow you to trace for
example timestamps to the millisecond, class names, methods and thread names.
The thread name is essential in a concurrent application to follow the execution
flow.
