---
title: "Creating a Clojure solution using IntelliJ"
date:   2019-04-17 03:28:00 +0200
tags:
    - Technical
    - Clojure
    - IntelliJ
---

I am creating a simple Clojure web app and API. In this post I explore
how to create each with the `lein` command and what references I need to use.

I plan to work on a monolith IntelliJ and git solution so that I don't need
to maintain multiple projects and repositories.

### Web App

```bash
lein new re-frame kashikoi-app +less +garden +10x +re-frisk +test +handler +routes
```

* CSS `+less`: [less](https://github.com/montoux/lein-less) -
  LESS CSS compiler plugin for Lein.

* CSS `+garden`: [garden](https://github.com/noprompt/garden) -
  Generate CSS with Clojure.

* Debug `+re-frisk`: [re-frisk](https://github.com/Day8/re-frame-10x) -
  A debugging dashboard for re-frame.

* Debug `+10x`: [re-frame-10x](https://github.com/flexsurfer/re-frisk) -
  Visualize re-frame pattern data or reagent ratom data as a tree
  structure, watch re-frame events and export state in the debugger.

* Development `+test`: [clj.test](https://github.com/clojure/clojurescript/blob/master/src/main/cljs/cljs/test.cljs) -
  A unit testing framework and [doo](https://github.com/bensu/doo) -
  A library and lein plugin to run cljs.test on different js environments.

* Full-stack `+handler`: [compojure](https://github.com/weavejester/compojure) -
  A consice routing library for Ring/Clojure.

* Routing `+routes`: [secretary](https://github.com/clj-commons/secretary) -
  A client-side router for ClojureScript.

## API

```bash
lein new app kashikoi-api
```

Follow the [instructions](https://www.codementor.io/tamizhvendan/developing-restful-apis-in-clojure-using-compojure-api-and-toucan-part-1-oc6yzsigc)
to create an API using [Compojure](https://github.com/metosin/compojure-api)
(web APIs, includes Swagger) and
[Toucan](https://github.com/metabase/toucan)
(define application models and retrieve them from a database).

## IntelliJ
Create a monolith solution by adding both projects to the solution.
This is useful if you want to maintain a single repository instead of two.

* Create a blank project
* Import each module using the Leiningen external module option
* Set resources, sources and test directories
* `git init` on solution
* Commit your files as desired

To access the modules dialog box again > Right-click on a project,
click on **Open Module Settings** or File > **Project Structure** or `Ctrl + Alt + Shift + S`

## References
* [IntelliJ IDEA](https://www.jetbrains.com/idea/)
* [Developing RESTful APIs in Clojure Using Compojure-API and Toucan (Part-1)](https://www.codementor.io/tamizhvendan/developing-restful-apis-in-clojure-using-compojure-api-and-toucan-part-1-oc6yzsigc)
  Codementor Community - Tamizhvendan S
* [Day8 / re-frame template](https://github.com/Day8/re-frame-template) - Github
