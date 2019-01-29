---
title: "Logging to Graylog in Clojure"
ogImage: images/og/2018-11-30-graylog.png
date:   2018-11-30 21:30:00 +0200
tags:
    - Technical
    - Clojure
    - Graylog
    - Logging
---

It's simple. I wanted to log to Graylog from my Clojure application.
I banged my head numerous times trying to figure out how and why it did't want to work.
Here's what I did to complete my mission.

## Graylog
Go to **System > Inputs > Gelf UDP / TCP > Launch new input**.
By default that input will be created on port **12201**.

## Using Timbre
Add `[com.taoensso/timbre "4.10.0"]` to your project file.

In the middleware or where you configure your logging on startup, add this configuration:

```clojure
(ns wildfire.logging
  (:require
    [taoensso.timbre :as timbre]
    [taoensso.timbre.appenders.core :as appenders]
    [taoensso.timbre.appenders.3rd-party.gelf :as gelf]))
```

```clojure
; This configuration includes the console and file appenders
(defn init [config]
  (timbre/with-config
    (timbre/merge-config!
      {:level        :info
       :ns-blacklist ["*datomic*"]
       :output-fn    (partial timbre/default-output-fn {:stacktrace-fonts {}})
       :appenders    {:println (appenders/println-appender)
                      :spit    (appenders/spit-appender {:fname "log/wildfire.log" :append? true})
                      :gelf    (gelf/gelf-appender "graylog.example.com" 12201 :udp)}})))
```

## Using Logstash Gelf

I chose to give [mp911de/logstash-gelf](https://github.com/mp911de/logstash-gelf) a bash for now.

Add a Gelf dependency to your project file `[biz.paluch.logging/logstash-gelf "1.12.0"]`

Edit the configuration file: **env > [dev | prod] > resources > logback.xml** with the configuration for
that Gelf dependency.

```xml
<appender name="gelf" class="biz.paluch.logging.gelf.logback.GelfLogbackAppender">
    <host>udp:graylog.example.com</host>
    <port>12201</port>
    <version>1.1</version>
    <facility>wildfire</facility>
    <extractStackTrace>true</extractStackTrace>
    <filterStackTrace>true</filterStackTrace>
    <mdcProfiling>true</mdcProfiling>
    <timestampPattern>yyyy-MM-dd HH:mm:ss,SSS</timestampPattern>
    <maximumMessageSize>8192</maximumMessageSize>
    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
        <level>INFO</level>
    </filter>
</appender>
<root level="INFO">
    <appender-ref ref="gelf" />
</root>
```

## Things that went wrong

* **I was using the wrong Graylog input**:
  I had setup a Syslog input on port **1514**.
  I was connecting to that instead of a Gelf input configured in Graylog.

* **The Gelf reference did not exist in my project**:
  With Timbre working, I knew I was on the right track. Something was wrong with logback.
  An old appender existed in the configuration file and the namespace for that class was not
  referenced in the project. I found [mp911de/logstash-gelf](https://github.com/mp911de/logstash-gelf),
  updated my project.clj and it still didn't work.

* **The configuration was invalid**:
  RTFM! I updated the configuration to use the properties defined in the spec and it worked.

I am so new to configuring logging in Clojure that I confused myself silly. At least I now have a
working implementation that makes me happy.
