---
title: "Datomic Cheat Sheet Series - Queries (Part 3) - Rules"
ogImage: images/og/2018-09-06-datomic.png
date:   2018-09-20 06:00:00 +0200
tags:
    - Technical
    - Datomic
    - Database
    - Cheat sheet
---

In this post I work through the creation of rules using the [Datomic MusicBrainz](https://github.com/Datomic/mbrainz-sample) sample database. The example queries are grabbed from the [Datomic Docs](https://docs.datomic.com/on-prem/query.html) and the [Datomic mbrainz sample](https://github.com/Datomic/mbrainz-sample/wiki/Queries) GitHub pages. *If you want to get started with Datomic, check out the [first post](/blog/datomic-cheat-sheet-series-getting-started) in the series. If you want to see other queries, then check out [part 1](/blog/datomic-cheat-sheet-series-queries-part-1) and [part 2](/blog/datomic-cheat-sheet-series-queries-part-2).*

![Relationship diagram](https://raw.githubusercontent.com/Datomic/mbrainz-sample/master/relationships.png)

<iframe width="1280" height="720" src="https://www.youtube.com/embed/bAilFQdaiHk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Create a database connection

Create an inline database connection

```clojure
(require '[datomic.api :as d])
(def db-uri "datomic:dev://localhost:4334/mbrainz-1968-1973")
(def conn (d/connect db-uri))
(def db (d/db conn))
```

Create a database connection as a function

```clojure
(ns beryllium.core
  (:require [datomic.api :as d]))

(defn new-db []
  (let [db-uri "datomic:dev://localhost:4334/mbrainz-1968-1973"
        conn (d/connect db-uri)
        db (d/db conn)]
    db))
```

Rules are a named group of clauses that can be used to create reusable logical components that can be slotted into multiple `:where` clauses. This binds portions of the query's logic at query time.

## Create rules

```clojure
(def rules ' [[(track-name ?e ?t)
              [?e :track/name ?t]]])

(d/q '[:find ?e ?artist-name ?track-name
       :in $ % ?track-name
       :where
       (track-name ?e ?track-name)
       [?e :track/artists]
       [?a :artist/name ?artist-name]] db rules "Can't Find a Reason")

; =>
; #{[17592186149695 "McCully Workshop" "Can't Find a Reason"]
;   [17592186149685 "Love" "Can't Find a Reason"]
;   [17592186149685 "Bakerloo" "Can't Find a Reason"]
;   ...}
```

```clojure
(def rules ' [[(track-name ?e ?t)
              [?e :track/name ?t]]])

(d/q '[:find ?e ?track-name ?duration
       :in $ % ?track-name
       :where
       (track-name ?e ?track-name)
       [?e :track/duration ?duration]] db rules "Can't Find a Reason")

; => #{[17592186149695 "Can't Find a Reason" 271506]
;      [17592186149685 "Can't Find a Reason" 270573]}
```


```clojure
(def rules ' [[(track-release ?t ?r)
              [?m :medium/tracks ?t]
              [?r :release/media ?m]]])

(d/q '[:find ?title ?album ?year
       :in $ % ?artist-name
       :where
       [?a :artist/name   ?artist-name]
       [?t :track/artists ?a]
       [?t :track/name    ?title]
       (track-release ?t ?r)
       [?r :release/name  ?album]
       [?r :release/year  ?year]] db rules "John Lennon")

;=>
;#{["Yer Blues" "Live Peace in Toronto 1969" 1969]
;  ["Isolation" "John Lennon/Plastic Ono Band" 1970]
;  ["Open Your Box" "Power to the People" 1971]
;  ...}
```