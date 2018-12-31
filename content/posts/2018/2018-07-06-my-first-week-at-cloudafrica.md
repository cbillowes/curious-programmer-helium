---
title: "My First Week at CloudAfrica"
cover: "https://picsum.photos/1600/800/?image=1056"
date:   2018-07-06 23:32:00 +0200
tags:
    - Mindset
    - Comfort Zone
    - Clojure
---

Stay tuned if you are interested to know what I learned, did and achieved in the past week. Maybe something I did could be of interest to you. Only time will tell. Read on.

## Monday
I started the week by saying my goodbyes to the lovely people at MultiChoice. I have learned a great deal over the past four years in the familiar territories of OOP, .NET and Microsoft.

I used to be shy nestled away in my own corner building software for small companies. Joining MultiChoice opened me up to working with a diverse crowd of professionals.

I became curious about how pieces fit into place so I would visit different teams to find out more. By doing this, I formed strong relationships and got a basic systematic overview of the entire solution and knew who was responsible for what.

This gave me the ability to help members of the team to get support for failing systems from the right people. My natural leadership skills started to shine - something I never knew was in me.

After a while I needed a change in technology. I started dabbling in Linux and was offered a new challenge in Clojure. So I packed my bags, said my goodbyes and stared my adventure on Tuesday.

## Tuesday

<div style="text-align:center;margin:30px;">
    <a href="https://www.cloudafrica.net/" target="_blank" nofollow>
        <img src="/images/cloud-africa.svg" style="width:400px" />
    </a>
</div>

Knowing that I have to climb a steep mountain, I have been both eager and anxious about going into a domain I know nothing about. I joined CloudAfrica and started the ramp up process.

We started setting up my laptop until my hard drive slowed down to a halt because it's old and giving up on life. We `sudo`'ed into my laptop [remotely to copy](https://stackoverflow.com/questions/14928382/how-can-i-get-a-folder-from-remote-machine-to-local-machine) my `/home/` directory over the network hoping that the hard drive wouldn't give in. It worked. I couldn't believe that my entire setup was there just like that. Linux for the win!

We got [IntelliJ](https://www.jetbrains.com/idea/) running with the [Cursive](https://cursive-ide.com/) plugin and then [Datomic](https://www.datomic.com/) for the database. We then pulled the project from git, installed its dependencies, setup postgres and got ready to start tinkering.

## Wednesday
On Wednesday I started looking at the website. I stared blankly at libraries and patterns new to me materializing on the screen. I noticed that the powerful thing about these libraries is that I will write them all in Clojure. I don't have to switch between different contexts and languages.

Starting with [Reagent](http://reagent-project.github.io/), I have a library that will let me create React components. It's written in a hiccup-like syntax. [Hiccup](https://github.com/weavejester/hiccup) is just a nifty rendering library converting ClojureScript to HTML.

```clojure
(defn simple-component []
  [:div
   [:p "I am a component!"]
   [:p.someclass
    "I have " [:strong "bold"]
    [:span {:style {:color "red"}} " and red "] "text."]])
```

On top of Reagent is the [re-frame](https://github.com/Day8/re-frame) pattern which is used for writing SPAs. They say that being a functional framework, it is about data, and the functions which transform that data.

To make life easier as a developer, [Figwheel](https://github.com/bhauman/lein-figwheel) will build the ClojureScript code and hot reload the browser while coding. As one would want, the browser state is maintained - the page is not refreshed.

I spent the day reading up on the technologies and tinkering with the website. I changed some buttons and tried to move a horizontal menu to a left vertical menu. That was more complicated than I originally anticipated. In fact, it felt downright impossible.

I dabbled in [Semantic UI](https://semantic-ui.com/) which is just a development framework to make pretty things. This is what the UI is written in so I had to use the right structure and classes to move the menu into the right position. I got somewhere. I was happy.

## Thursday
I was determined to get that menu to the left! I managed to get it there by moving around a few `div`s and adding classes where necessary after I knew what I needed to do in the HTML after creating a prototype.

I was still playing around when a [PINE ROCK64](https://www.pine64.org/?page_id=7147) was placed on my desk and I was asked to set up a monitoring display on a 4K screen. I'll post about those learnings soon but that's not something that happens everyday. That was a lot of fun!

At lunch time we attended [Jozi Lunch and Learn](https://www.meetup.com/Jozi-Lunch-Learn/?_cookie-check=eIIf-oNRFC4BYyiX) and got to spend time with [Danie Roux](http://www.danieroux.com/) and other interesting technologists.

## Friday
I tried to figure out why the PINE was going into power saving mode and why I couldn't change it as I didn't have the privileges to change it. This is still a mystery to me.

I also watched two really great Clojure videos:

* [Introduction to ClojureScript and Reagent](https://www.youtube.com/watch?v=wq6ctyZBb0A)
* [Tim Ewald: Clojure - Programming with Hand Tools](https://www.youtube.com/watch?v=ShEez0JkOFw)

## Rounding it off
That about sums up my first knowledge-packed week. Exhausting. Exhilarating! I look forward to many such weeks ahead.