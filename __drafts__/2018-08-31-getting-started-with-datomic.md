


## Pull data [(more)](https://docs.datomic.com/on-prem/getting-started/query-the-data.html)

```clojure
(comment
  '' literal
  "" string
  [] = list or vector
  {} = map {k1 v1 ...}
  () grouping
  | choice
  + one or more)
```
### Wildcards
```clojure
; meta-data
(d/pull db '[*] :track/name)
; entity
(d/pull-many db '[*] [17592186089442])

; meta-data
(d/pull-many db '[*] [:artist/name :track/name])
; entities
(d/pull-many db '[*] [17592186089442 17592186050536])
```

;Combining wildcards and map specifications
(d/pull db '["*" {:track/artists [:artist/name]}] some/entity)

;Limit recursion
(d/pull db '[:person/firstName :person/lastName {:person/friends 6}]
 some/entity)

;Unlimited recursion
(d/pull db '[:person/firstName :person/lastName {:person/friends ...}]
 some/entity)
```

### Attribute names
```clojure
;Attribute name
(d/pull db '[:artist/name :artist/gid] some/entity)

;Reverse lookup
(d/pull db '[:artist/_country] some/entity)
```

### Map specifications
```clojure
;Map specification
(d/pull db '[:track/name {:track/artists [:db/id :artist/name]}] some/entity)

;Map specification nesting
(d/pull db '[{:release/media
              [{:medium/tracks
                  [:track/name {:track/artists [:artist/name]}]}]}] some/entity)
```

### Attribute with options
```clojure
(require '[datomic.api :as d])
(def db-uri "datomic:dev://localhost:4334/oxygen")
(d/create-database db-uri)
(def conn (d/connect db-uri))
(def db (d/db conn))

;:as option
(d/pull db '[:artist/name :as "Band Name"] some/entity)

;:limit option
(d/pull db '[:artist/name (:track/_artists :limit 10)] some/entity)

;:limit inside a map specification
(d/pull db '[{(:track/_artists :limit 10) [:track/name]}] some/entity)

;:default option
(d/pull db '[:artist/name (:artist/endYear :default 0)] some/entity)
(d/pull db '[:artist/name (:artist/endYear :default "N/A")]  some/entity)
```

## Filters [(more)](https://docs.datomic.com/on-prem/filters.html)
### asOf
```clojure
(def db (d/db conn))
(def as-of-eoy-2013 (d/as-of db #inst "2014-01-01"))
(d/entity as-of-eoy-2013 [:item/id "DLC-042"])
```

### Since
```clojure
(def since-2014 (d/since db #inst "2014-01-01"))
(d/entity since-2014 [:item/id "DLC-042"])
(d/entity since-2014 (d/entid db [:item/id "DLC-042"]))
(d/q ('[:find ?count
        :in $ $since ?id
        :where [$ ?e :item/id ?id]
               [$since ?e :item/count ?count]])
  db since-2014 "DLC-042")
```

### History
```clojure
(def history (d/history db))
(->> (d/q '[:find ?aname ?v ?inst
            :in $ ?e
            :where [?e ?a ?v ?tx true]
                   [?tx :db/txInstant ?inst]
                   [?a :db/ident ?aname]]
          history [:item/id "DLC-042"])
     (sort-by #(nth % 2)))
```

### Filter errors
```clojure
(def error-txes
  "Known bad transactions"
  #{13194139534317})
(defn correct?
  [_ datom]
  (not (contains? error-txes (:tx datom))))
(def corrected (d/filter history correct?))
```

### Filter for security
```clojure
(def password-hash-id (d/entid plain-db :user/passwordHash))
(def password-hash-filter (fn [_ ^Datom datom] (not= password-hash-id (.a datom))))
(def filtered-db (d/filter (d/db conn) password-hash-filter))
```

### Join different filters of the same database
```clojure
[:find ?ent
 :in $plain $filtered ?email
 :where
 [$plain ?e :user/email ?email]
 [(datomic.api/entity $filtered ?e) ?ent]]
```