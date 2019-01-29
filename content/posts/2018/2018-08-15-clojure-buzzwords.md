---
title: "Clojure Buzzwords I am Learning"
ogImage: images/og/2018-08-15-clojure-logo.png
date:   2018-08-15 20:15:00 +0200
tags:
    - Technical
    - Comfort Zone
    - Clojure
---

<div id="accordion"></div>

When I first started with Clojure, my mind was foggy and filled with a swarm of buzzwords. There were tools, plugins, libraries, patterns and frameworks with names that were all new to me. This is a blog post of all the buzzwords that I am learning.

I have been a .NET and SQL web developer for the last decade. I now find myself in the land of Infrastructure as a Service (IaaS) as a senior systems and web/full stack developer in completely new paradigms.

I am writing production and utility software in Clojure(Script) integrating with Datomic. I also have SysAdmin responsibilities where I configure monitoring, manage and provide support for our systems.

I've migrated to Ubuntu after twenty years of using Windows so it is safe to say that all these changes have stretched me outside my comfort zone - and I am absolutely loving it!

**Disclaimer: I am only sharing my understanding of each. If I have misunderstood something, please jump in and submit a pull request.**

## Leiningen (Build automation)

 [![CircleCI](https://circleci.com/gh/technomancy/leiningen.svg?style=svg)](https://circleci.com/gh/technomancy/leiningen) [![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Leiningen](https://leiningen.org/), pronounced (LINE-ing-en ['laɪnɪŋən], is a tool created by Phil Hagelberg. He wanted to simplify the complexities involved in creating a project with Apache Maven.

 **lein** was born as a Clojure build automation and dependency management tool that can accept input from the terminal.  You can create projects, fetch dependencies, run tests, create a REPL and do other cool [things](https://github.com/technomancy/leiningen/blob/stable/doc/TUTORIAL.md).

```bash
lein new app awesome-app
lein update
lein test
lein repl
```

On the front end, **lein** is used to replace JavaScript tooling such as:

| Build step | Tools |
|-|-|
| **Project scaffolding** | Grunt, Slush, Yeoman |
| **Build tools** | Webpack, Grunt, Gulp, Browserify |
| **Package managers** | npm, yarn, bower |

*This table is adapted from [Why I chose ClojureScript over JavaScript](https://m.oursky.com/why-i-chose-clojure-over-javascript-24f045daab7e) by akiroz.*

## ClojureScript (Clojure to JavaScript)

Clojure targets platforms like the JVM and .NET CLR. [ClojureScript](https://clojurescript.org/)  is just a Clojure (without Java API calls) compiler targeting JavaScript. The JavaScript is compiled in such a way that it can be optimized using the Google Closure compiler.

## Google Closure (JavaScript optimizer)

JavaScript libraries can become bloated with dead code, comments and require dependency management. [Google Closure](https://developers.google.com/closure/)  compiles JavaScript code with an optimization algorithm creating compact and high-performance code.

The compiler inspects variable references, checks syntax, types and warnings along with other common JavaScript idiosyncrasies. It then strips away dead code, rewrites what's left, minifies and packages a file that can be quickly downloaded and executed.

## Datomic (Database)

[Datomic](https://docs.datomic.com/cloud/index.html) is a non-traditional distributed database with ACID transactions, joins and a logical query language.

Datomic is a set of **datoms** which are atomic facts. They say if the relation between an entity, an attribute, a value, and a transaction has been added or retracted. A datom is expressed as a five-tuple:

* entity id (E)
* attribute (A)
* value (V)
* transaction id (Tx)
* addition / retraction boolean (Op)

| E (ntity) | A(ttribute) | V(alue) | Tx | Op |
|---|---|---|---|---|
| 42 | :user/first-name | "Douglas" | 1234 | true |
| 42 | :user/last-name | "Adams" | 1234 | true |
| 42 | :user/favorite-color | :emerald | 1234 | false |
| 42 | :user/favorite-color | :teal | 1235| false |
| 42 | :user/favorite-color | :crimson | 1236 | true |

That can translate to the following point-in-time view as only a three-tuple with Tx and Op omitted:

| E (ntity) | A(ttribute) | V(alue)
|---|---|---|
| 42 | :user/first-name | "Douglas" |
| 42 | :user/last-name | "Adams" |
| 42 | :user/favorite-color | :crimson |

```clojure
{:db/id 42
 :user/favorite-color :crimson
 :user/first-name "Douglas"
 :user/last-name "Adams"}
```

## Reagent (React framework) [![](https://clojars.org/reagent/latest-version.svg)](https://clojars.org/reagent)

[![CircleCI](https://circleci.com/gh/reagent-project/reagent.svg?style=svg)](https://circleci.com/gh/reagent-project/reagent) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [Reagent](https://github.com/reagent-project/reagent) is a minimalistic ClojureScript interface to React.js. HTML components are represented as Clojure data following a hiccup-like syntax and is compiled to React components. Pssst. No more JSX files.

```clojure
(defn home-panel []
  [:div.hello-world
    [:p
      [:b "Hello World"]]])
```

```html
<div data-reactroot="" class="hello-world">
  <p><b>Hello World</b></p>
</div>
```

## re-frame (React pattern) [![](https://clojars.org/re-frame/latest-version.svg)](https://clojars.org/re-frame)

[![Circle CI](https://circleci.com/gh/Day8/re-frame/tree/master.svg?style=shield&circle-token=:circle-ci-badge-token)](https://circleci.com/gh/Day8/re-frame/tree/master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [re-frame](https://github.com/Day8/re-frame) is a Reagent Framework pattern for writing SPAs (Single Page Applications) in ClojureScript. It is built on the same principles of Redux.

It's a loop of what they refer to as dominoes. One domino triggers the next until it is ready for the next iteration of the same cascade.

!["The 6 Dominoes"](https://raw.githubusercontent.com/Day8/re-frame/master/images/Readme/6dominoes.png)

## Figwheel (Hot reloader) [![](https://clojars.org/lein-figwheel/latest-version.svg)](https://clojars.org/lein-figwheel)

 [![CircleCI](https://circleci.com/gh/bhauman/lein-figwheel.svg?style=svg)](https://circleci.com/gh/bhauman/lein-figwheel) [![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Figwheel](https://github.com/bhauman/lein-figwheel), a **lein** plugin, is a ClojureScript auto builder/server which pushes changed files to the browser.

Cutting some fruit, it says on load, it detects changes in the code, reloads the screen and keeps all the glorious state in the application at that time.

```bash
lein new figwheel hello-world -- --reagent  #for a reagent based project
```

## Garden (ClojureScript to CSS) [![](https://clojars.org/garden/latest-version.svg)](http://clojars.org/garden)

[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Garden](https://github.com/noprompt/garden) generates CSS from ClojureScript data structures.

As I write this I am imagining a garden with ornamental green grasses, thick green plants and maybe a few flowers here and there. This beautiful garden seems symbolic of styling.

This imagined outdoor beauty can be digitized into Clojure vectors and maps written in a Hiccup inspired syntax to generate CSS to beautify your website.

```clojure
(require '[garden.core :refer [css]])
(css [:body {:font-size "16px"}])
```

```css
body{font-size:16px}
```

## Compojure (Server-side routing) [![](https://clojars.org/compojure/latest-version.svg)](https://clojars.org/compojure)

[![Build Status](https://travis-ci.org/weavejester/compojure.svg?branch=master)](https://travis-ci.org/weavejester/compojure) [![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Compojure](https://github.com/weavejester/compojure) is a small **server-side** routing library for [Ring](https://github.com/ring-clojure/ring) that allows web applications to be composed of small, independent parts.

```bash
lein new compojure hello-world
cd hello-world
lein ring server-headless
```

```clojure
(ns hello-world.core
  (:require [compojure.core :refer :all]
            [compojure.route :as route]))

(defroutes app
  (GET "/" [] "<h1>Hello World</h1>")
  (route/not-found "<h1>Page not found</h1>"))
```

## Secretary (Client-side routing) [![](https://clojars.org/secretary/latest-version.svg)](https://clojars.org/secretary)

[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Secretary](https://github.com/gf3/secretary) is a **client-side** router for ClojureScript. It is built to create route matchers and dispatch actions.

```clojure
(ns app.routes
  (:require [secretary.core :as secretary :refer-macros [defroute]]))

(defroute "/users/:id" {:as params}
  (js/console.log (str "User: " (:id params))))

(secretary/dispatch! "/users/gf3")
```

## Pushy (HTML5 pushState) [![](https://clojars.org/kibu/pushy/latest-version.svg)](https://clojars.org/kibu/pushy/)

[![Build Status](https://travis-ci.org/kibu-australia/pushy.svg?branch=master)](https://travis-ci.org/kibu-australia/pushy) [![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Pushy](https://github.com/kibu-australia/pushy) is used for HTML5 pushState and can be integrated with routing libraries such as
[Secretary](https://github.com/gf3/secretary),
[Bidi](https://github.com/juxt/bidi),
[Silk](https://github.com/DomKM/silk),
[Router](https://github.com/darkleaf/router) and
[Sibiro](https://github.com/aroemers/sibiro).

Here's an example implementation of an integration with Secretary:

```clojure
(ns foo.core
  (:require [secretary.core :as secretary :include-macros true :refer-macros [defroute]]
            [pushy.core :as pushy]))

(secretary/set-config! :prefix "/")

(defroute index "/foo" []
  (.log js/console "Hi"))

(def history (pushy/pushy secretary/dispatch!
                          (fn [x] (when (secretary/locate-route x) x))))

;; Start event listeners
(pushy/start! history)
```

## Bouncer (Validation) [![](https://clojars.org/bouncer/latest-version.svg)](https://clojars.org/bouncer/)

[![Build Status](https://travis-ci.org/leonardoborges/bouncer.svg?branch=master)](https://travis-ci.org/leonardoborges/bouncer) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [Bouncer](https://github.com/leonardoborges/bouncer) is a validation DSL.

```clojure
(ns some.ns
  (:require [bouncer.core :as b]
            [bouncer.validators :as v]))

(def person {:name "Leo"})

(b/validate person
    :name v/required
    :age  v/required)

;; [{:age ("age must be present")}
;;  {:name "Leo", :bouncer.core/errors {:age ("age must be present")}}]
```

## Inflections (Word manipulation) [![](https://clojars.org/inflections/latest-version.svg)](https://clojars.org/inflections/)

[![Build Status](https://travis-ci.org/r0man/inflections-clj.svg?branch=master)](https://travis-ci.org/r0man/inflections-clj) [![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Inflections](https://github.com/r0man/inflections-clj) is a rails-like inflection library.

**Inflection:** *A change in the form of a word (typically the ending) to express a grammatical function or attribute such as tense, mood, person, number, case, and gender.*

```clojure
(use 'inflections.core)

(plural "word")
;=> "words"

(plural "virus")
;=> "viri"

(pluralize 12 "virus")
;=> "12 viri"

(singular "apples")
;=> "apple"

(singular "octopi")
;=> "octopus"

(underscore "puni-puni")
;=> "puni_puni"

(ordinalize "52")
;=> "52nd"

(capitalize "clojure")
;=> "Clojure"
```

## Humanize (Word manipulation) [![](https://clojars.org/clojure-humanize/latest-version.svg)](https://clojars.org/clojure-humanize/)

[![Build Status](https://travis-ci.org/trhura/clojure-humanize.svg?branch=master)](https://travis-ci.org/trhura/clojure-humanize) [![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Humanize](https://github.com/trhura/clojure-humanize) produces human readable strings and dates.

```clojure
user> (numberword 3567)
=> "three thousand five hundred and sixty-seven"

user>  (clojure.contrib.humanize/intcomma 1000)
=> 1,000

user>  (clojure.contrib.humanize/intword 2000000000)
=> 2.0 billion

user>  (clojure.contrib.humanize/ordinal 111)
=> 111th

user>  (clojure.contrib.humanize/filesize 3000000 :binary true)
=> 2.9MiB

user> (clojure.contrib.humanize/truncate "abcdefghijklmnopqrstuvwxyz" 10 "...xyz")
=> "abcd...xyz"

user> (clojure.contrib.humanize/oxford ["apple" "orange" "mango" "pear"]
                                       :maximum-display 2
                                       :truncate-noun "fruit")
=> "apple, orange, and 2 other fruits"

user> (clojure.contrib.inflect/pluralize-noun 6 "buzz")
=> "buzzes"

user> (clojure.contrib.humanize/datetime (plus (now) (years -7)))
=> "7 years ago"

user> (clojure.contrib.humanize/duration 325100 {:number-format str})
=> "5 minutes, 25 seconds"
```

## URL (URL Library) [![](https://clojars.org/com.cemerick/url/latest-version.svg)](https://clojars.org/com.cemerick/url/)

[![Travis CI status](https://secure.travis-ci.org/cemerick/url.png)](http://travis-ci.org/#!/cemerick/url/builds) [![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [URL](https://github.com/cemerick/url) is a library that makes working with URLs easier.

```clojure
=> (url "https://api.twitter.com/")
#cemerick.url.URL{:protocol "https", :username nil, :password nil,
                  :host "api.twitter.com", :port -1, :path "/", :query nil,
                  :anchor nil}
=> (url "https://api.twitter.com/" "1" "users" "profile_image" "cemerick")
#cemerick.url.URL{:protocol "https", :username nil, :password nil,
                  :host "api.twitter.com", :port -1,
                  :path "/1/users/profile_image/cemerick", :query nil, :anchor nil}
=> (str *1)
"https://api.twitter.com/1/users/profile_image/cemerick"
=> (str (url "https://api.twitter.com/1/users/profile_image/cemerick" "../../lookup.json"))
"https://api.twitter.com/1/users/lookup.json"
```

## Sente (WebSockets) [![](https://clojars.org/com.taoensso/sente/latest-version.svg)](https://clojars.org/com.taoensso/sente/)

[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Sente](https://github.com/ptaoussanis/sente) is a real time web communications library the does bidirectional async comms over WebSockets (AJAX as fallback) working with auto keep-alives, buffering, protocol selection and reconnects.

## Slingshot (try/throw) [![](https://clojars.org/slingshot/latest-version.svg)](https://clojars.org/slingshot)

[![Build Status](https://travis-ci.org/scgilardi/slingshot.svg?branch=master)](https://travis-ci.org/scgilardi/slingshot)
[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Slingshot](https://github.com/scgilardi/slingshot) provides `try+` and `throw+` which is compatible with Java's native exception handling and a power-up to Clojure's native `try` and `throw` behavior.

* `throw+` can throw any Java object, not just classes derived from `java.lang.Throwable`.
* `catch` will catch Java objects thrown by `throw+`, map passed `ex-info` thrown by `throw`, `throw+` or any `Throwable` thrown by Clojure or Java's `throw`.

```clojure
(ns math.expression
  (:require [tensor.parse]
            [clojure.tools.logging :as log])
  (:use [slingshot.slingshot :only [throw+ try+]]))

(defn read-file [file]
  (try+
    [...]
    (tensor.parse/parse-tree tree)
    [...]
    (catch [:type :tensor.parse/bad-tree] {:keys [tree hint]}
      (log/error "failed to parse tensor" tree "with hint" hint)
      (throw+))
    (catch Object _
      (log/error (:throwable &throw-context) "unexpected error")
      (throw+))))
```

## Timbre (Logging) [![](https://clojars.org/com.taoensso/timbre/latest-version.svg)](https://clojars.org/com.taoensso/timbre/)

[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Timbre](https://github.com/ptaoussanis/timbre) is a logging library for Clojure(Script). It offers full support for v4+ with no XML or properties files. Create a single config map and you're good to go.

Add the dependency to your project and then setup your namespace imports.

```clojure

(ns my-clj-ns ; Clojure namespace
  (:require
    [taoensso.timbre :as timbre
      :refer [log  trace  debug  info  warn  error  fatal  report
              logf tracef debugf infof warnf errorf fatalf reportf
              spy get-env]]))

(ns my-cljs-ns ; ; ClojureScript namespace
  (:require
    [taoensso.timbre :as timbre
      :refer-macros [log  trace  debug  info  warn  error  fatal  report
                     logf tracef debugf infof warnf errorf fatalf reportf
                     spy get-env]]))
```

You can call `(timbre/refer-timbre)` to configure the Clj namespace referrals automatically.

Basic `println` and `js/console` (v4+) output at a `:debug` level is given by default.

```clojure
(info "This will print") => nil
%> 15-Jun-13 19:18:33 localhost INFO [my-app.core] - This will print

(spy :info (* 5 4 3 2 1)) => 120
%> 15-Jun-13 19:19:13 localhost INFO [my-app.core] - (* 5 4 3 2 1) => 120

(defn my-mult [x y] (info "Lexical env:" (get-env)) (* x y)) => #'my-mult
(my-mult 4 7) => 28
%> 15-Jun-13 19:21:53 localhost INFO [my-app.core] - Lexical env: {x 4, y 7}

(trace "This won't print due to insufficient log level") => nil
```

## Other

**Shadow CLJS** [![](https://clojars.org/thheller/shadow-cljs/latest-version.svg)](https://clojars.org/thheller/shadow-cljs)

[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0) [Shadow CLJS](https://github.com/thheller/shadow-cljs) is a ClojureScript development tool.

I haven't used this library. By the looks of it, it compiles ClojureScript code with little configuration. It does this in a specific build order like what you would do in Grunt and Gulp. It has reliable npm integration and some other cool stuff that can be investigated in the [guide](https://shadow-cljs.github.io/docs/UsersGuide.html).

**DevCards** [![](https://clojars.org/devcards/latest-version.svg)](https://clojars.org/devcards)

[DevCards](https://github.com/bhauman/devcards) is a ClojureScript library. You can experiment and inspect your ClojureCode from the REPL-like feature in the browser. This REPL is powered by data in the source files. Code examples can be executed and changes can be inspected directly in the DOM.

**Ring** [![](https://clojars.org/ring/latest-version.svg)](https://clojars.org/ring)

 [![Build Status](https://travis-ci.org/ring-clojure/ring.svg?branch=master)](https://travis-ci.org/ring-clojure/ring) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [Ring](https://github.com/ring-clojure/ring) is a low-level interface and library for building web applications in the Clojure programming language.

This abstracted HTTP API allows web applications to be constructed of modular components. These components can be shared among applications, web servers and web frameworks.

**re-frisk** [![](https://clojars.org/re-frisk/latest-version.svg)](https://clojars.org/re-frisk)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [re-frisk](https://github.com/flexsurfer/re-frisk) creates a little button on the screen that lets you visualize re-frame pattern data; you can see the reagent [ratom](http://reagent-project.github.io/docs/master/reagent.ratom.html) as a tree structure; watch re-frame events and export the state in the debugger.

!["re-frisk panel from flexsurfer/re-frisk on GitHub"](https://raw.githubusercontent.com/flexsurfer/re-frisk/master/img/re-frisk.png)

**CIDER**

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [CIDER](http://docs.cider.mx/en/latest/) is a Clojure(Script) Interactive Development Environment that Rocks! CIDER extends Emacs with support for interactive programming in Clojure.

## Resources

### **Learn Clojure**
* [Clojure for the Brave and True](https://www.braveclojure.com/foreword/) by [Daniel Higginbotham](https://twitter.com/nonrecursive) can be read online for free.
* [clojuredocs.org](https://clojuredocs.org/) has documentation and examples contributed by the community.
* [Clojure TV](https://www.youtube.com/channel/UCaLlzGqiPE2QRj6sSOawJRg) is a YouTube channel with Clojure talks and presentations. Other video gems are available in YouTube when searching for Clojure.
* [The Re-frame Building Blocks Guide](https://purelyfunctional.tv/guide/re-frame-building-blocks/)
* [Learn Reagent Free](https://www.jacekschae.com/learn-reagent-free?coupon=SHADOW)

### **Interesting articles**
* [A Noob's Walkthrough of a re-frame Application](http://www.multunus.com/blog/2016/02/noobs-walkthrough-re-frame-app/)
* [Why I chose ClojureScript over JavaScript](https://m.oursky.com/why-i-chose-clojure-over-javascript-24f045daab7e)
* [6 mistakes that Reacters do that re-framers avoid](https://purelyfunctional.tv/article/react-vs-re-frame/)

### **Referenced links**

* [Leiningen](https://leiningen.org/)
* [ClojureScript](https://clojurescript.org/)
* [Google Closure](https://developers.google.com/closure/)
* [Datomic](https://docs.datomic.com/cloud/index.html)
* [Reagent](https://github.com/reagent-project/reagent)
* [re-frame](https://github.com/Day8/re-frame)
* [Figwheel](https://github.com/bhauman/lein-figwheel)
* [Garden](https://github.com/noprompt/garden)
* [Compojure](https://github.com/weavejester/compojure)
* [Secretary](https://github.com/gf3/secretary)
* [Pushy](https://github.com/kibu-australia/pushy)
* [Bouncer](https://github.com/leonardoborges/bouncer)
* [Inflections](https://github.com/r0man/inflections-clj)
* [Humanize](https://github.com/trhura/clojure-humanize)
* [URL](https://github.com/cemerick/url)
* [Sente](https://github.com/ptaoussanis/sente)
* [Slingshot](https://github.com/scgilardi/slingshot)
* [Timbre](https://github.com/ptaoussanis/timbre)
* [Shadow CLJS](https://github.com/thheller/shadow-cljs)
* [DevCards](https://github.com/bhauman/devcards)
* [Ring](https://github.com/ring-clojure/ring)
* [re-frisk](https://github.com/flexsurfer/re-frisk)
* [CIDER](http://docs.cider.mx/en/latest/)
