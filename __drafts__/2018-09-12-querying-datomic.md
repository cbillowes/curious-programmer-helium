---
title: "Backup Datomic Cheatsheet"
date:   2018-08-30 06:40:00 +0200
tags:
    - Technical
    - Datomic
    - Database
---



## Identify transactions [(more)](https://docs.datomic.com/on-prem/identity.html)
```clojure
  ; lookup reference
  [:find ?e :in $ ?email :where [?e :person/email ?email]]

  ; lookup reference
  {:db/id [:customer/email "joe@example.com"]
   :customer/status :active}

  ; Entity identifier
  [:db/add :person/name :db/doc "A person's full name"]
```

## Transactions [(more)](https://docs.datomic.com/on-prem/transactions.html)
```clojure
(d/transact conn [[:db/add "jdoe" :person/first "Jan"]
                  [:db/add "jdoe" :person/last "Doe"]])

(d/transact conn [[:db.fn/retractEntity id-of-jane]
                  [:db.fn/retractEntity [:person/email "jdoe@example.com"]]])

(d/transact conn [[:db.fn/cas 42 :account/balance 100 110]])
```