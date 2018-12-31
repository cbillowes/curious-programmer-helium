---
title: "Integrate statuspage.io with Clojure"
socialCover: social-covers/2018-09-06-datomic.png
date:   2018-10-31 13:26:00 +0200
tags:
    - Technical
    - Clojure
    - statuspage.io
---

Creating new subscribers 

API https://doers.statuspage.io/api/v1/subscribers/

```clojure
(client/post "https://api.statuspage.io/v1/pages/[page-id]/subscribers.json"
             {:headers {"Authorization" "OAuth [oauth-token]"}
              :form-params [["subscriber[email]" "anonymous@example.com"]
                            ["subscriber[phone_number]" "+1123456789"]
                            ["subscriber[phone_country]" "us"]]})
```