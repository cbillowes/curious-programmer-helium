---
title: "Datomic Cheat Sheet Series - Queries (Part 1)"
ogImage: images/og/2018-09-06-datomic.png
date:   2018-09-15 06:00:00 +0200
tags:
    - Technical
    - Datomic
    - Database
    - Cheat sheet
---

<div id="accordion"></div>

In this post I work through querying the [Datomic MusicBrainz](https://github.com/Datomic/mbrainz-sample) sample database. The example queries are grabbed from the [Datomic Docs](https://docs.datomic.com/on-prem/query.html). *If you want to get started with Datomic, check out the [previous post](/blog/datomic-cheat-sheet-series-getting-started) in the series.*

![Relationship diagram](https://raw.githubusercontent.com/Datomic/mbrainz-sample/master/relationships.png)

<iframe width="1280" height="720" src="https://www.youtube.com/embed/bAilFQdaiHk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Create a new project

```bash
lein new beryllium
vi beryllium/project.clj # use your favorite editor

# add the following snippet to your project.clj file
:dependencies [[org.clojure/clojure "1.9.0"]
               [com.datomic/datomic-pro "0.9.5703"]]
:repositories [["my.datomic.com" {:url      "https://my.datomic.com/repo"
                                  :username "<username>"
                                  :password "<uuid>"}]]

lein repl
# Exit with CTRL + D
```

Get your credentials from your [My Datomic Account](https://my.datomic.com/account).

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

## Query entities

```clojure
  (d/q '[:find ?e
         :where [?e :track/name]] db)

  ;=> #{[17592186050536]
  ;     [17592186050537]
  ;     [17592186050538]
  ;     ...}
```

```clojure
  (d/q '[:find [?e ...]
         :where [?e :track/name]] db)

  ;=> [17592186050536
  ;    17592186050537
  ;    17592186050538
  ;     ...]
```

```clojure
  (d/q '[:find [(sample 10 ?e) ...]
         :where [?e :track/name]] db)

  ;=> [[17592186052808
  ;     17592186070900
  ;     17592186170898
  ;     ...]]
```

```clojure
  (def release (d/entity db 17592186089442))
  (d/touch release)

  ;=> #:db{:id 17592186089442}
```

```clojure
  (def release (d/entity db 17592186089442))
  (def media (:release/media release))
  (map #(println (:medium/tracks %)) media)

  ;#{#:db{:id 17592186089445} #:db{:id 17592186089447} #:db{:id 17592186089444} #:db{:id 17592186089446}}
```

## Get values from entities
```clojure
  (def release (d/entity db 17592186089442))
  (:release/name release)

  ;=> "Banished Bridge"
```

```clojure
  (d/q '[:find ?release-name
         :where [?e :release/name ?release-name]] db)

  ;=> #{["Osmium"]
  ;     ["Hela roept de akela"]
  ;     ["Ali Baba"]
  ;     ...}
```

```clojure
  (d/q '[:find [?release-name ...]
         :where [?e :release/name ?release-name]] db)

  ;=> ["Osmium"
  ;    "Hela roept de akela"
  ;    "Ali Baba"
  ;    ...]
```

## Multiple inputs [(more)](https://docs.datomic.com/on-prem/query.html#multiple-inputs)
```clojure
(d/q '[:find [?release-name ...]
       :in $ ?artist-name
       :where
       [?artist :artist/name ?artist-name]
       [?release :release/artists ?artist]
       [?release :release/name ?release-name]] db "John Lennon")

  ;=> ["Power to the People"
  ;    "Unfinished Music No. 2: Life With the Lions"
  ;    "Live Peace in Toronto 1969"
  ;    ...]
```

## Tuple binding [(more)](https://docs.datomic.com/on-prem/query.html#tuple-binding)
```clojure
(d/q '[:find [?release ...]
       :in $ [?artist-name ?release-name]
       :where
       [?artist :artist/name ?artist-name]
       [?release :release/artists ?artist]
       [?release :release/name ?release-name]] db ["John Lennon" "Mind Games"])

  ;=> [17592186157686 17592186157672 17592186157690 17592186157658]
```

## Collection binding [(more)](https://docs.datomic.com/on-prem/query.html#collection-binding)
```clojure
  (d/q '[:find [?release-name ...]
         :in $ [?artist-name ...]
         :where
         [?artist :artist/name ?artist-name]
         [?release :release/artists ?artist]
         [?release :release/name ?release-name]] db ["Paul McCartney" "George Harrison"])

  ;=> ["My Sweet Lord"
  ;    "Electronic Sound"
  ;    "Give Me Love (Give Me Peace on Earth)"
  ;    ...]
```

## Relation binding [(more)](https://docs.datomic.com/on-prem/query.html#relation-binding)
```clojure
  (d/q '[:find [?release ...]
         :in $ [[?artist-name ?release-name]]
         :where
         [?artist :artist/name ?artist-name]
         [?release :release/artists ?artist]
         [?release :release/name ?release-name]] db [["John Lennon" "Mind Games"]
                                                     ["Paul McCartney" "Ram"]])

  ;=> [17592186157686 17592186157672 17592186157690 17592186157658 17592186063566]
```

## Find specifications [(more)](https://docs.datomic.com/on-prem/query.html#find-specifications)
```clojure
  (d/q '[:find ?artist-name ?release-name
         :where
         [?release :release/name ?release-name]
         [?release :release/artists ?artist]
         [?artist :artist/name ?artist-name]] db)

  ;=> #{["George Jones" "With Love"]
  ;     ["Shocking Blue" "Hello Darkness / Pickin' Tomatoes"]
  ;     ["Junipher Greene" "Friendship"]
  ;     ...}
```

```clojure
  (d/q '[:find [?year ?month ?day]
         :in $ ?name
         :where
         [?artist :artist/name ?name]
         [?artist :artist/startDay ?day]
         [?artist :artist/startMonth ?month]
         [?artist :artist/startYear ?year]] db "John Lennon")

  ;=> [1940 10 9]
```

```clojure
  (d/q '[:find ?year .
         :in $ ?name
         :where
         [?artist :artist/name ?name]
         [?artist :artist/startYear ?year]] db "John Lennon")

  => 1940
```