---
title: "Datomic Cheat Sheet Series - Getting Started"
ogImage: images/og/2018-09-06-datomic.png
date:   2018-09-06 06:00:00 +0200
tags:
    - Technical
    - Datomic
    - Database
    - Cheat sheet
---

<div id="accordion"></div>

Get started with the essentials of Datomic from installing Datomic, running a transactor, working with the Datomic console, running the Datomic REPL, creating and restoring a database, creating a schema and furnishing it with data.

The goal of this series is to expose a collection of queries that I find useful that can be conveniently referenced in projects.

## Overview [(more)](https://docs.datomic.com/on-prem/getting-started/brief-overview.html)

In a nutshell, Datomic is a distributed database and implementation of Datalog, a declarative logic programming language often used as a query language for deductive databases. Datomic has ACID transactions, is immutable, queryable and flexible.

It's important to note that this cheat sheet series focuses on using the **[Datomic On-Prem](https://docs.datomic.com/on-prem/index.html)** solution with the **[Peer Library](https://docs.datomic.com/on-prem/peer-getting-started.html)** and **[Dev Storage](https://docs.datomic.com/on-prem/dev-setup.html)** components.

## Getting started [(more)](https://docs.datomic.com/on-prem/get-datomic.html)

1. Datomic requires the Java 7 or 8 SDK.
2. Register a [My Datomic](https://my.datomic.com/login) account.
3. [Download](https://my.datomic.com/downloads/free) the free version for testing.
4. Extract the copy to a local path.
5. **Use the license sent to you via email**.

```bash
cd /path/to/datomic/datomic-pro-0.9.5561
```

## Run a transactor [(more)](https://docs.datomic.com/on-prem/dev-setup.html#run-dev-transactor)

```bash
# Create a properties file from the template
/path/to/dev-transactor.properties config/samples/dev-transactor-templates.properties

# Add the license key sent to you via email
vi /path/to/dev-transactor.properties
license-key=<INSERT HERE>

# Start the transactor with dev storage
# Keep this process running
bin/transactor path/to/dev-transactor.properties
```

## Datomic Console [(more)](https://docs.datomic.com/on-prem/dev-setup.html#console)

```shell
# New shell
/path/to/datomic/bin/console -p 8080 dev datomic:dev://localhost:4334/
```

Browse to [http://localhost:8080/browse/](http://localhost:8080/browse/).

## Run the REPL [(more)](https://docs.datomic.com/on-prem/dev-setup.html#create-db)

```bash
/path/to/datomic/bin/repl #./repl
# Exit with CTRL + D
```

For an interactive REPL, create and run a new project.

```bash
lein new oxygen
vi oxygen/project.clj # use your favorite editor

:dependencies [[org.clojure/clojure "1.9.0"]
               [com.datomic/datomic-pro "0.9.5703"]]
:repositories [["my.datomic.com" {:url      "https://my.datomic.com/repo"
                                  :username "<username>"
                                  :password "<uuid>"}]]

lein repl
# Exit with CTRL + D
```

*Use <b>pro</b> to access the <b>dev</b> protocol.*

## Create a database [(more)](https://docs.datomic.com/on-prem/dev-setup.html#create-db)

```clojure
; Create a connection to an anonymous to an in-memory database
; https://github.com/Datomic/day-of-datomic/blob/master/src/datomic/samples/repl.clj
(require '[datomic.api :as d])
(def db-uri-base "datomic:mem://")
(let [uri (str db-uri-base (d/squuid))]
  (d/delete-database uri)
  (d/create-database uri)
  (d/connect uri)))
```

```clojure
; Create a connection to a local storage database
(require '[datomic.api :as d])
(def db-uri "datomic:dev://localhost:4334/oxygen")
(d/create-database db-uri)
(def conn (d/connect db-uri))
```

## Restore a database [(more)](https://docs.datomic.com/on-prem/backup.html)
Grab a copy of the [mbrainz 1968-1973 sample set](https://github.com/Datomic/mbrainz-sample#getting-the-data) to follow along with some of the examples throughout the cheat sheet series.

```bash
wget http://s3.amazonaws.com/mbrainz/datomic-mbrainz-1968-1973-backup-2014-10-15.tar -O mbrainz.tar
tar -xvf mbrainz.tar
pwd # get path/to/backup
bin/datomic restore-db file:///path/to/backup/mbrainz-1968-1973 datomic:dev://localhost:4334/mbrainz-1968-1973
```

## Create a schema [(more)](https://docs.datomic.com/on-prem/getting-started/transact-schema.html)

```clojure
(require '[datomic.api :as d])
(def db-uri "datomic:dev://localhost:4334/oxygen")
(d/create-database db-uri)
(def conn (d/connect db-uri))

(def schema
  [{:db/ident :movie/reference
    :db/valueType :db.type/uuid
    :db/cardinality :db.cardinality/one
    :db/doc "uuid reference"}

    {:db/ident :movie/title
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "The title of the movie"}

   {:db/ident :movie/genre
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "The genre of the movie"}

   {:db/ident :movie/release-year
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "The year the movie was released in theaters"}])

; Make sure the transactor is running before transacting on a connection.
@(d/transact conn schema)

; Verify the database schema
(def db (d/db conn))
(d/q '[:find ?e ?doc
       :where [?e :db/doc ?doc]] db)
```

## Schema attributes [(more)](https://docs.datomic.com/on-prem/schema.html#attributes)

### Attributes

| Attribute | Description |
|-----------|-------------|
| :db/ident | Unique namespaced keyword **&lt;namespace&gt;/&lt;name&gt;** |
| :db/valueType | Expressed keyword type value |

### Type values

| Value type | Description |
|------------|-------------|
| :db.type/keyword | Value type for keywords. Keywords are used as names, and are interned for efficiency. Keywords map to the native interned-name type in languages that support them. |
| :db.type/string | Value type for strings. |
| :db.type/boolean | Boolean value type. |
| :db.type/long | Fixed integer value type. Same semantics as a Java long: 64 bits wide, two's complement binary representation. |
| :db.type/bigint | Value type for arbitrary precision integers. Maps to java.math.BigInteger on Java platforms. |
| :db.type/float | Floating point value type. Same semantics as a Java float: single-precision 32-bit IEEE 754 floating point. |
| :db.type/double | Floating point value type. Same semantics as a Java double: double-precision 64-bit IEEE 754 floating point. |
| :db.type/bigdec | Value type for arbitrary precision floating point numbers. Maps to *java.math.BigDecimal* on Java platforms. |
| :db.type/ref | Value type for references. All references from one entity to another are through attributes with this value type. |
| :db.type/instant | Value type for instants in time. Stored internally as a number of milliseconds since midnight, January 1, 1970 UTC. Maps to java.util.Date on Java platforms. |
| :db.type/uuid | Value type for UUIDs. Maps to java.util.UUID on Java platforms. |
| :db.type/uri | Value type for URIs. Maps to java.net.URI on Java platforms. |
| :db.type/bytes | Value type for small binary data. Maps to byte array on Java platforms. See [limitations](https://docs.datomic.com/on-prem/schema.html#bytes-limitations). |

### Cardinality
Specifies whether an attribute associates a single value or set of values with an entity.

* :db.cardinality/one
* :db.cardinality/many

## Adding data [(more)](https://docs.datomic.com/on-prem/getting-started/transact-data.html)

```clojure
(require '[datomic.api :as d])
(def db-uri "datomic:dev://localhost:4334/oxygen")
(def conn (d/connect db-uri))

(def movies [{:movie/reference (d/squuid)
              :movie/title "The Goonies"
              :movie/genre "action/adventure"
              :movie/release-year 1985}

             {:movie/reference (d/squuid)
              :movie/title "Commando"
              :movie/genre "action/adventure"
              :movie/release-year 1985}

             {:movie/reference (d/squuid)
              :movie/title "Repo Man"
              :movie/genre "punk dystopia"
              :movie/release-year 1984}])

(d/transact conn movies)
```