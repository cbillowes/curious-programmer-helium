---
title: "Problems with microservices"
cover: "https://picsum.photos/1600/800/?image=1078"
date:   2016-05-13 23:10:19 +0200
category: "tech"
tags:
    - Technical
---

> After an interesting debate, I decided to explore some of the problems that
> teams may face with microservices architecture.

Trying to decipher a monolithic app is a real pain. Changing it is
scary. I don't always trust the test suites attached to codebases because
with time and neglect, code and tests can rot. I do rely on them though.

The alternative to the monolith - microservices. It's become a buzz word.
Have services that do one thing and do it well. A separation of concerns when
it comes to the architecture of applications.

Yes! I am in, but wait... are we fully equipped to go down this path?

## Analysis paralysis

What if you could break your existing service down into 50 services. Another
person on your team only identifies 5 services. The dev lead sees 10. I don't
know if this exact scenario often happens but:

-   How do you go about splitting them?
-   Will you be able to communicate the benefits of splitting them to business?
-   How does splitting your current services impact your consumers?

## Time constraints

It takes time to set up each service:

-   Create the code base
-   Configure version control
-   Configure dependencies
-   Set up scaffolding
-   Write the logic
-   Add useful logging
-   Configure environments
-   Setup continuous integration and deployment pipelines
-   Create an automated test suite
-   Documentation

If you need to quickly produce a prototype or minimum viable product, you will
most likely skip this. Unfortunately the reality is that many prototypes
and MVPs end up in production - for life. I suppose this is how an app becomes
a monolith. If time is allocated to refactor and rework the architecture
iteratively it could be saved.

## Monolithic architecture

We are trading off a monolithic application for monolithic architecture. If
there isn't an overview (diagram or documentation) it can be hard to find
the source code and endpoints for each service - especially if the naming
convention is that of Marvel superheroes (I've not personally seen this but
developers can be quite creative).

Luckily the services need to be configured to talk to other services so endpoints
can be discovered once you have the source.

## Unpredictable environments

There can be a number of environments that need to be configured like
Localhost, Development, QA, Staging and Production.

One would assume that environments would be aligned for each dependency. If I
point to the QA `Billing` service, it would point to the QA `Accounts`
service.

This is not always the case. Each team has its own constraints and
reasons for pointing to different environments - especially if their dependencies
are external. Oh boy, how much pain this can cause

## Bloated configurations

Configurations become bloated with endpoints and each environment needs to be
configured accordingly. This isn't too bad unless you are the consumer
using a lot of dependencies.

## Identifying bugs

Bugs are hard to pin-point if there are no tests validating different
integration points.

### Unstable data

Data can become unpredictable the lower the level of the environment especially
across different teams. Strange and unpredictable behavior can cause skewed
results during testing. Developers end up spending valuable time chasing down
where things went wrong.

### Poor logging

It is "fairly easy" to debug monolithic applications (provided you can get it
running) because you can step into the code. When it comes to microservices,
the proof is in the logging.

Sadly, logging is sometimes an after thought. This makes it hard to
identify problems in the stack.

**Events need to be chained**. If you trigger an event, you need to be able to
track that event right through the stack in some form of visible logging
solution like [GrayLog](https://www.graylog.org).

## Getting buy-in

Not everyone believes that microservices are the solution. Every solution
has trade-offs. When designing the architecture it is important to consider the
advantages and disadvantages. The debates should be knowledgeable. I think it's
a terrible idea to consider implementing something just because everyone else is
doing it. That's resume-driven development - avoid it.

The team needs to support the application so they are responsible for the
decisions they make. It is important to consider what negative impact a
decision can have. Perhaps that could be the driving factor to deciding?

## My final thoughts

I am not opposed to microservices. What I am opposed to is struggling
to get features tested due to unpredictable data and unstable environments.

Often tremendous pain is felt in the front-end consumer teams. Valuable time
is wasted trying to sift through a plethora of services and meaningless logs
to try pin-point exactly where stuff broke.

If the company and teams don't have the right mindset or environment,
microservices aren't necessarily the answer. What I've discussed highlights
symptoms of different problems within teams and organizations that would have
an impact on a microservices architecture.

If this approach is taken, I believe that teams need:

-   Efficient and reliable continuous delivery pipelines ([Docker](https://www.docker.com/))
-   Visibility to [monitoring](https://www.paessler.com/prtg) of services
-   Overview [diagrams](https://trace.risingstack.com) and/or documentation of
    the architecture
-   Useful integration tests
-   Stable and predictable environments
-   Visible, useful and chained logs

> Please share your experiences in the comments below.

* * *

Want to find out more about microservices?

-   [How Enterprises Benefit From Microservices Architectures](https://blog.risingstack.com/how-enterprises-benefit-from-microservices-architectures/)
-   [Microservice Trade-Offs](http://martinfowler.com/articles/microservice-trade-offs.html)
-   [Pattern: Microservices Architecture](http://microservices.io/patterns/microservices.html)
-   [Microservices architecture: advantages and drawbacks](http://cloudacademy.com/blog/microservices-architecture-challenge-advantage-drawback/)
-   [The Benefits Of Microservices](http://sendachi.com/2016/microservices/the-benefits-of-microservices)
