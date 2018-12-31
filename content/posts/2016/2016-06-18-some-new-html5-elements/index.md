---
title:  "Some new HTML5 elements"
cover: "https://picsum.photos/1600/800/?image=526"
date:   2016-06-18 13:26:44 +0200
tags:
    - Technical
---

The HTML5 specification has introduced more elements to aid us with
semantic markup. I've discussed some of the
[design changes](/blog/design-changes-in-html5/)
as well as the introduction of
[structural elements](/blog/html5-structural-semantics/).

**Note**: There are many books, articles, wikis and posts relating to these elements.
I wanted to document my research by combining the semantics, usage and code
samples to act as a cheatsheet to personally use. I also won't be covering rich
media elements here.

## Main

You can use the `main` element to indicate the main content that is unique to
the document or expands upon the central topic or functionality of it.
You can only use it once.

It shouldn't contain content that is repeated site wide such as site logos,
navigational aids, sidebars, site footers or search forms (unless that is
the document's main purpose).

**Note**: It doesn't affect the document outline as it isn't considered as
sectioning content.

It must not be a child (or descendant) of `header`, `nav`, `article`, `aside`,
or `footer` elements.

```html
<main>
  <h1>Warcraft: The Beginning</h1>
  <p>
    The peaceful realm of Azeroth stands on the brink
    of war as its civilization faces a fearsome race
    of invaders: orc warriors fleeing their dying
    home to colonize another.
  </p>
  <p>
    Source snippet from <cite>IMDB</cite>.
  </p>
</main>
```

[MDN Reference](https://developer.mozilla.org/en/docs/Web/HTML/Element/main)

## Details

You can use the `details` element in conjunction with the `summary` element to
provide additional information to a user.

**Note**: Not all browsers currently support this feature.

```html
<details>
  <summary>World of Warcraft has a Wiki</summary>
  <p>
    Check out the community driven World of Warcraft
    wiki at http://wowwiki.wikia.com/wiki/ to find
    out more about the Horde and the Alliance.
  </p>
</details>
```

<details>
  <summary><b>Live Demo</b>. If you can expand this then your browser supports this feature.</summary>
  <p>
    <b>World of Warcraft has a Wiki</b><br>
    Check out the community driven World of Warcraft wiki at
    <a href="http://wowwiki.wikia.com/wiki/">Wiki</a> to find out more
    about the Horde and the Alliance.
  </p>
</details>

[MDN Reference](https://developer.mozilla.org/en/docs/Web/HTML/Element/details)

## Mark

You can use the `mark` element to highlight text that is relevant to a
particular context like highlighting keywords from a search result.

```html
<h1>Search Results</h1>
<p>You searched for "spoilers"</p>
<p>
  Beware of <mark>spoilers</mark> when reading up
  on the "Warcraft: The Beginning" movie.
</p>
```

<p>
  <b>Live Demo</b> (default styling has been overridden).<br>
  Beware of <mark>spoilers</mark> when reading up on the
  "Warcraft: The Beginning" movie.
</p>

[MDN Reference](https://developer.mozilla.org/en/docs/Web/HTML/Element/mark)

## Time

You can use the `time` element for dates and/or times in the
[Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) to
present it so that people can read it and encode it so that user agents
can provide additional functionality such as:

-   adding reminders for birthdays and scheduled events to a user's calendar, or
-   producing smarter search results from search engines.

```html
<p>
  I'll be watching "Warcraft: The Beginning" on
  <time datetime="2016-06-17T20:00">
    17 June at 8h00 pm
  </time>.
</p>
```

[MDN Reference](https://developer.mozilla.org/en/docs/Web/HTML/Element/time)

## Figure

You can use the `figure` element to display self contained content such as
diagrams, charts, photos, images, illustrations, artwork, code listings and
schemas.

The content can be captioned with the `figcaption` element but isn't required.

**Note**: It's position must be independent of the main flow of the document.
If you remove it, the flow shouldn't be affected.

```html
<figure>
  <img src="medivh.jpg" alt="Photo of Medivh">
</figure>
```

[MDN Reference](https://developer.mozilla.org/en/docs/Web/HTML/Element/figure)

## Figcaption

You can use the `figcaption` element to caption or create a legend for a figure.

It's optional to use and can be placed as the first or last element
within the `figure` element.

```html
<figure>
  <img src="medivh.jpg" alt="Photo of Medivh" >
  <figcaption> Photo of Medivh, the Last Guardian of Tirisfal.</figcaption>
</figure>
```

[MDN Reference](https://developer.mozilla.org/en/docs/Web/HTML/Element/figcaption)

* * *

## References

-   [W3.org Wiki](https://www.w3.org/wiki/HTML_structural_elements)
-   A Book Apart: [HTML5 for web designers](https://abookapart.com/products/html5-for-web-designers)
    by Jeremy Keith
-   Some [World of Warcraft](http://wowwiki.wikia.com/) references were used in
    examples
