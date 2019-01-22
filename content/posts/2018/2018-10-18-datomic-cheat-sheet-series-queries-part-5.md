---
title: "Datomic Cheat Sheet Series - Queries (Part 5) - Transactions"
ogImage: images/og/2018-09-06-datomic.png
date:   2018-10-18 04:54:00 +0200
tags:
    - Technical
    - Datomic
    - Database
    - Cheat sheet
---

<div id="accordion"></div>

In this post I work through transactions. The example queries are grabbed from the [Datomic Docs](https://docs.datomic.com/on-prem/transactions.html). *If you want to get started with Datomic, check out the [first post](/blog/datomic-cheat-sheet-series-getting-started) in the series. If you want to see other queries, then check out [part 1](/blog/datomic-cheat-sheet-series-queries-part-1) and [part 2](/blog/datomic-cheat-sheet-series-queries-part-2). If you want to set up query rules then check out [part 3](/blog/datomic-cheat-sheet-series-queries-part-3). If you want to learn more about pull then check out [part 4](blog/datomic-cheat-sheat-series-queries-part-4).*

<iframe width="1280" height="720" src="https://www.youtube.com/embed/bAilFQdaiHk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Create a database connection

Create an inline database connection

```clojure
(require '[datomic.api :as d])
(def db-uri "datomic:dev://localhost:4334/oxygen")
(def conn (d/connect db-uri))
(def db (d/db conn))
```

Create a database connection as a function

```clojure
(ns beryllium.core
  (:require [datomic.api :as d]))

(defn new-db []
  (let [db-uri "datomic:dev://localhost:4334/oxygen"
        conn (d/connect db-uri)
        db (d/db conn)]
    db))
```

## Transact

```clojure
(require '[datomic.api :as d])
(def txn ...)
(:db-after @(d/transact [txn]))
```

```clojure
(let [tempid (d/tempid :db.part/user)
      txn {:db/id tempid :person/name name :person/email "curious-programmer.io@gmail.com"}
      {:keys [db-after tempids]} @(d/transact-async conn [txn])
      key-id (d/resolve-tempid db-after tempids tempid)]
    (get-person-by-id db-after key-id)))
```

## Identifying entities

You can specify an entity id in three ways by using a:

* **a temporary id for a new entity being added to the database**

  ```clojure
  [[:db/add "jdoe" :person/first "Jan"]
   [:db/add "jdoe" :person/last "Doe"]]
  ```

  ```clojure
   (d/tempid :db.part/user)
   ```

* **an existing id for an entity that's already in the database**
  For example, this query retrieves the id of an existing entity based on an email address.

  ```clojure
  [:find ?e :in $ ?email :where [?e :person/email ?email]]
  ```

  If the entity id returned by the query is 17592186046416, the following transaction data will set the entity's customer status:

  ```clojure
  {:db/id 17592186046416
   :customer/status :active}
  ```

  If the entity in question has a unique identifier, you can specify the entity id by using a lookup ref. Rather than querying the database, you can provide the unique attribute, value pair corresponding to the entity you want to assert or retract a fact for. Note that a lookup ref specified in a transaction will be resolved by the transactor.

  ```clojure
  {:db/id [:customer/email "joe@example.com"]
  :customer/status :active}
  ```

* **an identifier for an entity that's already in the database**
  In the example below, the entity is specified by the ident :person/name:

  ```clojure
  [:db/add :person/name :db/doc "A person's full name"]
  ```

## Add data transactions

### New entity

```clojure
[{:person/name "Bob"
  :person/email "bob@example.com"}]
```

### Entity reference

```clojure
[{:db/id "bobid"
  :person/name "Bob"
  :person/spouse "aliceid"}
 {:db/id "aliceid"
  :person/name "Alice"
  :person/spouse "bobid"}]
```

### Cardinality many transactions

```clojure
[{:db/id #db/id[:db.part/user]
  :person/name "Bob"
  :person/email "bob@example.com"
  :person/aliases ["Robert" "Bert" "Bobby" "Curly"]}]
```

### Nested maps in transactions

```clojure
[{:db/id order-id
  :order/lineItems [{:lineItem/product chocolate
                     :lineItem/quantity 1}
                    {:lineItem/product whisky
                     :lineItem/quantity 2}]}]
```

## Retract transactions

```clojure
[[:db/retract person-id :person/email "curious-programmer.io@gmail.com"]]
```

```clojure
[[:db.fn/retractEntity id-of-jane]
 [:db.fn/retractEntity [:person/email "jdoe@example.com"]]]
```

## Compare and swap transactions

The following example transaction data sets entity 42's `:account/balance` to 110,
if and only if `:account/balance` is 100 at the time the transaction executes:

```clojure
[[:db.fn/cas 42 :account/balance 100 110]]
```