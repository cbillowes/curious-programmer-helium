---
title: "Datomic Cheat Sheet Series - Queries (Part 4) - Pull"
ogImage: images/og/2018-09-06-datomic.png
date:   2018-09-20 07:00:00 +0200
tags:
    - Technical
    - Datomic
    - Database
    - Cheat sheet
---

In this post I work through pull expressions using the [Datomic MusicBrainz](https://github.com/Datomic/mbrainz-sample) sample database. The example queries are grabbed from the [Datomic Docs](https://docs.datomic.com/on-prem/query.html). *If you want to get started with Datomic, check out the [first post](/blog/datomic-cheat-sheet-series-getting-started) in the series. If you want to see other queries, then check out [part 1](/blog/datomic-cheat-sheet-series-queries-part-1) and [part 2](/blog/datomic-cheat-sheet-series-queries-part-2). If you want to set up query rules then check out [part 3](/blog/datomic-cheat-sheet-series-queries-part-3).*

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

## Example pull expressions

```clojure
(def artist-id (:db/id (first (d/q '[:find ([pull ?e [:db/id] ...])
                                     :in $ ?name
                                     :where [?e :artist/name ?name]] db "The Jimi Hendrix Experience"))))
; => #'user/artist-id

artist-id
; => 17592186048480
```

```clojure
(d/q '[:find ([pull ?e [*] ...])
       :in $ ?artist
       :where [?e :release/artists ?artist]] db artist-id)

; =>
; [{:release/name "1968-10-12: Winterland, San Francisco, CA, USA (Early Show)",
;   :release/artists [#:db{:id 17592186048480}],
;   :release/country #:db{:id 17592186045504},
;   ...}]
```

```clojure
(d/q '[:find ([pull ?e [:release/name] ...])
       :in $ ?artist
       :where [?e :release/artists ?artist]] db artist-id)

; => [#:release{:name "1968-10-12: Winterland, San Francisco, CA, USA (Early Show)"}]
```

```clojure
(d/q '[:find ([pull ?e [{:release/country [*]}] ...])
       :in $ ?artist
       :where [?e :release/artists ?artist]] db artist-id)

;=> [#:release{:country {:db/id 17592186045504, :db/ident :country/US, :country/name "United States"}}]
```

```clojure
(d/q '[:find ([pull ?e [{:release/artists [{:artist/country [*]}]}] ...])
       :in $ ?artist
       :where [?e :release/artists ?artist]] db artist-id)

; =>
; [#:release{:artists [#:artist{:country {:db/id 17592186045576, :db/ident :country/GB, :country/name "United Kingdom"}}]}]
```

```clojure
(d/q '[:find (pull ?e pattern)
       :in $ ?artist pattern
       :where [?e :release/artists ?artist]] db artist-id [:release/name :release/status])

; =>
; [[#:release{:name "1968-10-12: Winterland, San Francisco, CA, USA (Early Show)", :status "Bootleg"}]
;  [#:release{:name "Electric Ladyland", :status "Official"}]
;  [#:release{:name "Axis: Bold as Love", :status "Official"}]
;  ...]
```

```clojure
(d/q '[:find (pull ?e [:release/name])
       :in $ ?artist-name
       :where
       [?e :release/artists ?a]
       [?a :artist/name ?artist-name]] db "Led Zeppelin")

; =>
; [[#:release{:name "Immigrant Song / Hey Hey What Can I Do"}]
;  [#:release{:name "Heartbreaker / Bring It On Home"}]
;  [#:release{:name "Led Zeppelin III"}]
;  ...]
```

```clojure
(d/q '[:find (pull ?e [:release/name]) (pull ?a [*])
       :in $ ?artist-name
       :where
       [?e :release/artists ?a]
       [?a :artist/name ?artist-name]] db "Led Zeppelin")

; =>
; [[#:release{:name "Led Zeppelin II"}
;   {:artist/sortName "Led Zeppelin",
;    :artist/name "Led Zeppelin",
;    :artist/type #:db{:id 17592186045746},
;    :artist/country #:db{:id 17592186045576},
;    :artist/gid #uuid"678d88b2-87b0-403b-b63d-5da7465aecc3",
;    :artist/endDay 25,
;    :artist/startYear 1968,
;    :artist/endMonth 9,
;    :artist/endYear 1980,
;    :db/id 17592186050305}]
;    ...]
```

```clojure
(d/q '[:find (pull ?e [:release/name :release/artists])
       :in $ ?artist-name
       :where [?e :release/artists ?a]
       [?a :artist/name ?artist-name]] db "Led Zeppelin")

;=>
; [[#:release{:name "Immigrant Song / Hey Hey What Can I Do", :artists [#:db{:id 17592186050305}]}]
;  [#:release{:name "Heartbreaker / Bring It On Home", :artists [#:db{:id 17592186050305}]}]
;  [#:release{:name "Led Zeppelin III", :artists [#:db{:id 17592186050305}]}]
;  ...]
```

---

```clojure
(d/pull db '[*] artist-id)

; =>
; {:artist/sortName "Hendrix, Jimi, The, Experience",
;  :artist/name "The Jimi Hendrix Experience",
;  :artist/type #:db{:id 17592186045746},
;  :artist/country #:db{:id 17592186045576},
;  :artist/gid #uuid"33b3c323-77c2-417c-a5b4-af7e6a111cc9",
;  :artist/startYear 1966,
;  :artist/endMonth 6,
;  :artist/endYear 1969,
;  :db/id 17592186048480}
```

```clojure
(d/pull db '[:artist/name :artist/gid] artist-id)

; => #:artist{:name "The Jimi Hendrix Experience", :gid #uuid"33b3c323-77c2-417c-a5b4-af7e6a111cc9"}
```