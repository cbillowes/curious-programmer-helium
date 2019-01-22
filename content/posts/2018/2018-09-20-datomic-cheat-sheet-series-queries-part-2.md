---
title: "Datomic Cheat Sheet Series - Queries (Part 2)"
ogImage: images/og/2018-09-06-datomic.png
date:   2018-09-20 05:30:00 +0200
tags:
    - Technical
    - Datomic
    - Database
    - Cheat sheet
---

<div id="accordion"></div>

In this post I work through more querying capabilities using the [Datomic MusicBrainz](https://github.com/Datomic/mbrainz-sample) sample database. The example queries are grabbed from the [Datomic Docs](https://docs.datomic.com/on-prem/query.html). *If you want to get started with Datomic, check out the [first post](/blog/datomic-cheat-sheet-series-getting-started) in the series. If you want to see some basic queries, then check out [part 1](/blog/datomic-cheat-sheet-series-queries-part-1).*

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
## Not clauses [(more)](https://docs.datomic.com/on-prem/query.html#not-caluses)
```clojure
; count all artists who are not Canadian
(d/q '[:find (count ?eid) .
       :where [?eid :artist/name]
       (not [?eid :artist/country :country/CA])] db)

; => 4538
```

```clojure
; number of artists who didn't release an album in 1970
(d/q '[:find (count ?artist) .
       :where [?artist :artist/name]
       (not-join [?artist]
                 [?release :release/artists ?artist]
                 [?release :release/year 1970])] db)
```

```clojure
; the number of releases named 'Live at Carnegie Hall'
; that were not by Bill Withers
(d/q '[:find (count ?release) .
       :where [?release :release/name "Live at Carnegie Hall"]
       (not-join [?release]
                 [?release :release/artists ?artist]
                 [?artist :artist/name "Bill Withers"])] db)
```

## Or clauses [(more)](https://docs.datomic.com/on-prem/query.html#or-clauses)
```clojure
; the number of vinyl media
(d/q '[:find (count ?medium) .
       :where (or [?medium :medium/format :medium.format/vinyl7]
                  [?medium :medium/format :medium.format/vinyl10]
                  [?medium :medium/format :medium.format/vinyl12]
                  [?medium :medium/format :medium.format/vinyl])] db)
; => 9219
```

```clojure
; the number of artists who are either groups or females
(d/q '[:find (count ?artist) .
       :where (or [?artist :artist/type :artist.type/group]
                  (and [?artist :artist/type :artist.type/person]
                       [?artist :artist/gender :artist.gender/female]))] db)
; => 2323
```

```clojure
; number of releases from 1970s or Canadian artists
(d/q '[:find (count ?release) .
       :where [?release :release/name]
       (or-join [?release]
                (and [?release :release/artists ?artist]
                     [?artist :artist/country :country/CA])
                     [?release :release/year 1970])] db)
; => 2124
```

## Expression clauses [(more)](https://docs.datomic.com/on-prem/query.html#expression-clauses)

### [Predicate expressions](https://docs.datomic.com/on-prem/query.html#predicate-expressions)
```clojure
; get artists who started before 1600
(d/q '[:find ?name ?year
       :where [?artist :artist/name ?name]
       [?artist :artist/startYear ?year]
       [(< ?year 1600)]] db)
; => #{["Choir of King's College, Cambridge" 1441]
;      ["Heinrich Schütz" 1585]}
```

### [Function expressions](https://docs.datomic.com/on-prem/query.html#function-expressions)
```clojure
; the minutes of each John Lennon track
; quot converts track lengths from milliseconds to minutes
(d/q '[:find ?track-name ?minutes
       :in $ ?artist-name
       :where
       [?artist :artist/name ?artist-name]
       [?track :track/artists ?artist]
       [?track :track/duration ?millis]
       [(quot ?millis 60000) ?minutes]
       [?track :track/name ?track-name]] db "John Lennon")
;=>
;#{["Crippled Inside" 3]
;  ["Working Class Hero" 3]
;  ["Sisters, O Sisters" 3]
;  ...}
```

```clojure
; multi-step calculation for celsius
(d/q '[:find ?celsius .
       :in $ ?fahrenheit
       :where
       [(- ?fahrenheit 32) ?f-32]
       [(/ ?f-32 1.8) ?celsius]] db 212)
; => 212
```

## Built-in expression functions and predicates [(more)](https://docs.datomic.com/on-prem/query.html#built-in-expressions)

### [get-else](https://docs.datomic.com/on-prem/query.html#get-else)
```clojure
; show "N/A" when the artist's startYear is not in the database
(d/q '[:find ?artist-name ?year
       :in $ [?artist-name ...]
       :where
       [?artist :artist/name ?artist-name]
       [(get-else $ ?artist :artist/startYear "N/A") ?year]] db ["Crosby, Stills & Nash" "Crosby & Nash"])
; => #{["Crosby & Nash" "N/A"] ["Crosby, Stills & Nash" 1968]}
```

### [get-some](https://docs.datomic.com/on-prem/query.html#get-some)
```clojure
; find :country/name for entity and then falls back to :artist/name
(d/q '[:find [?e ?attr ?name]
       :in $ ?e
       :where
       [(get-some $ ?e :country/name :artist/name) [?attr ?name]]] db :country/US)
; => [:country/US 84 "United States"]
```

### [missing](https://docs.datomic.com/on-prem/query.html#missing)
```clojure
; all artists whose start year has not been recorded
(d/q '[:find ?name
       :where [?artist :artist/name ?name]
       [(missing? $ ?artist :artist/startYear)]] db)

; =>
; #{["Sigmund Snopek III"]
;   ["De Labanda's"]
;   ["Baby Whale"]
;   ...}
```

### [tx-ids](https://docs.datomic.com/on-prem/query.html#tx-ids)
```clojure
; all transactions from time t 1000 through 1050
(def log (d/log conn))
(d/q '[:find [?tx ...]
       :in ?log
       :where [(tx-ids ?log 1000 1050) [?tx ...]]] log)

; => [13194139534340 13194139534312 13194139534313 13194139534314])
```

### [tx-data](https://docs.datomic.com/on-prem/query.html#tx-data)
```clojure
; find entities referenced by the transaction id
(def log (d/log conn))
(d/q '[:find [?e ...]
       :in ?log ?tx
       :where [(tx-data ?log ?tx) [[?e]]]] log 13194139534312)

; => [13194139534312 63 0 64 65 66 67 68 69 70 71 ...]
```

## Calling Java methods [(more)](https://docs.datomic.com/on-prem/query.html#calling-java)

### [Static methods](https://docs.datomic.com/on-prem/query.html#calling-static-methods)
```clojure
; calls System.getProperties, binding property names to ?k and property values to ?v
(defn get-props [] (System/getProperties))

(d/q '[:find ?k ?v
       :where [(user/get-props) [[?k ?v]]]])
; =>
; #{["java.vendor.url.bug" "http://bugreport.sun.com/bugreport/"]
;   ["sun.cpu.isalist" ""]
;   ["java.runtime.name" "OpenJDK Runtime Environment"]
;   ...}
```

### [Instance methods](https://docs.datomic.com/on-prem/query.html#calling-instance-methods)
```clojure
; calls System.getProperties, binding property names to ?k and property values to ?v
(d/q '[:find ?k ?v
       :where
       [(System/getProperties) [[?k ?v]]]
       [(.endsWith ^String ?k "version")]])
; =>
; #{["java.class.version" "52.0"]
;   ["java.runtime.version" "1.8.0_20-b26"]
;   ["java.version" "1.8.0_20"]
;   ...}
```

## Clojure functions [(more)](https://docs.datomic.com/on-prem/query.html#calling-clojure)
```clojure
; extract the first 5 letters of each word
(d/q '[:find [?prefix ...]
       :in [?word ...]
       :where [(subs ?word 0 5) ?prefix]] ["hello" "galaxy"])
; => ["galax" "hello"]
```

```clojure
; gets all values in a range from 1 to 10
(d/q '[:find ?v
       :in [?v ...]]  (range 1 10))
; => #{[1] [2] [3] [4] [5] [6] [7] [8] [9]}
```

## Aggregates [(more)](https://docs.datomic.com/on-prem/query.html#aggregates)
```clojure
; the number of heads possessed by a set of mythological monsters
(d/q '[:find (sum ?heads) .
       :with ?monster
       :in [[?monster ?heads]]], [["Cerberus" 3]
                                  ["Medusa" 1]
                                  ["Cyclops" 1]
                                  ["Chimera" 1]])
; => 6
```

### [Aggregates returning a single value](https://docs.datomic.com/on-prem/query.html#aggregates-returning-a-single-value)
```clojure
(min ?xs)
(max ?xs)
(count ?xs)
(count-distinct ?xs)
(sum ?xs)
(avg ?xs)
(median ?xs)
(variance ?xs)
(stddev ?xs)
```

```clojure
; finds the smallest and largest track lengths
(d/q '[:find [(min ?duration) (max ?duration)]
       :where [_ :track/duration ?duration]] db)
; => [3000 3894000]
```

```clojure
; sums the total number of tracks on all media
(d/q '[:find (sum ?count) .
       :with ?medium
       :where [?medium :medium/trackCount ?count]] db)
; => 100759
```

```clojure
; counts the total number of artist names
; counts the total number of unique artist names
(d/q '[:find (count ?name) (count-distinct ?name)
       :with ?artist
       :where [?artist :artist/name ?name]] db)
; => [[4601 4588]]
```

```clojure
; reports the median, avg and stddev of song title lengths (in characters),
; and includes year in the find set to break out the results by year
(d/q '[:find ?year (median ?namelen) (avg ?namelen) (stddev ?namelen)
       :with ?track
       :where [?track :track/name ?name]
       [(count ?name) ?namelen]
       [?medium :medium/tracks ?track]
       [?release :release/media ?medium]
       [?release :release/year ?year]] db)
; =>
; [[1968 16 18.92181098534824 12.898760656290335]
;  [1969 16 18.147895557287608 11.263945894977246]
;  [1970 15 18.007481296758105 12.076103750401026]
;  ...]
```

### [Aggregates returning collections](https://docs.datomic.com/on-prem/query.html#aggregates-returning-a-single-value)
```clojure
(distinct ?xs)
(min n ?xs)
(max n ?xs)
(rand n ?xs)
(sample n ?xs)
```

```clojure
; find distinct values in a collection
(d/q '[:find (distinct ?v) .
       :in [?v ...]]  [1 1 2 2 2 3])
```

```clojure
; find all distinct start years
(d/q '[:find (distinct ?start-year) .
       :where [?e :artist/startYear ?start-year]] db)
; =>
; #{1858
;  1903
;  1952
;  ...}
```

```clojure
; find the five shortest and five longest track lengths
(d/q '[:find [(min 5 ?millis) (max 5 ?millis)]
       :where [?track :track/duration ?millis]] db)
; => [[3000 4000 5000 6000 7000] [3894000 3407000 2928000 2802000 2775000]]
```

```clojure
; returns two random and two sampled artist names
; rand - selects exactly n items with potential for duplicates
; sample - returns up to n distinct items
(d/q '[:find [(rand 2 ?name) (sample 2 ?name)]
       :where [_ :artist/name ?name]] db)
; => [("Cléo" "Santana") ["Audience" "Dave Holland Quartet"]]
```

## Custom aggregates [(more)](https://docs.datomic.com/on-prem/query.html#custom-aggregates)
```clojure
; What is the most common release medium length, in tracks?
(defn mode
  [vals]
  (->> (frequencies vals)
       (sort-by (comp - second))
       ffirst))

(d/q '[:find (user/mode ?track-count) .
       :with ?media
       :where [?media :medium/trackCount ?track-count]] db)
; => 2
```