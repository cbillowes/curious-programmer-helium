---
title:  "Design changes in HTML5"
date:   2016-06-16 10:00:00 +0200
cover: "https://picsum.photos/1600/800/?image=20"
tags:
    - Technical
---

Elements, attributes, and attribute values are semantic according to the
HTML5 Specification.

These definitions allow HTML processors, such as Web browsers, screen readers
or search engines, to present and use documents and applications in a wide
variety of contexts that the author might not have considered.

This enables a single document to be used by:

-   Different types of browsers (desktop vs mobile),
-   Screen readers for the visually impaired,
-   Indexing by search engines,
-   Navigation by making use of document outlines, and
-   Table of content generators.

**Note**: This post will not go in depth but will simply highlight some of the design
changes from HTML4.

## Simplified

### Doctype

The [Document Type Declaration](https://html.spec.whatwg.org/multipage/syntax.html#the-doctype)
is still required due to legacy reasons but is pragmatic compared
to previous iterations.

It's no longer coupled to a specific version or flavor (Strict, Traditional and
Frameset) of an HTML specification.

```html
<!DOCTYPE html>
```

### Character encoding

To target a specific character encoding for your documents to be served, you
should configure the `Content-Type` header. However, we no longer need to
provide the `http-equiv` and `content` attributes.

```html
<meta charset="UTF-8">
```

### Script references

Browsers by default assume scripts are written in JavaScript so the
`type="text/javascript"` attribute can now be dropped.

```html
<script src="script.js"></script>
```

### CSS references

We no longer need to specify `type="text/css"` when referencing external
stylesheets.

```html
<link rel="stylesheet" href="style.css">
```

### MathML & SVG

These elements can now be used within an HTML document without having to specify
their XML namespaces.

### Syntax

XHTML 1.0 enforces HTML to follow the same syntax as XML: all tags in lowercase,
attributes quoted, elements must be properly closed.

HTML5 is case-insensitive and has no rules when it comes to the style of
writing markup.

### Content model

This defines what child or descendant elements can be nested within an element.
Previously there were two major categories namely "inline" and "block-level"
which had different rules based on the flavor (Strict, Traditional and Frameset)
of HTML.

These terms also caused confusion with CSS so HTML5 no longer uses them.
Instead it categorized content based on how they can be nested.

Not all elements appear in these categories but those that do can overlap
other categories.

-   **Metadata** content e.g. `link` & `script`
-   **Flow** content e.g. `span` & `div`
-   **Sectioning** content e.g. `aside` & `section`
-   **Heading** content e.g. `h1` - `h6`
-   **Phrasing** content e.g. `span` & `img`
-   **Embedded** content e.g. `img`, `iframe` & `svg`
-   **Interactive** content e.g. `a`, `button` & `label`

## Obsolete

HTML5 no longer deprecates elements or attributes as it remains backwards
compatible instead they flag them as obsolete.

They shouldn't be used by web developers however user agents will still have
to support them.

-   Purely presentational

    `basefont`, `big`, `center`, `font`, `strike`, `tt`

-   Damages usability and accessibility

    `frame`, `frameset`, `noframes`

-   Not used often, caused confusion or its function is handled by another element

    `acronym`, `applet`, `isindex`, `dir`

A number of [attributes](https://www.w3.org/TR/html5-diff/#obsolete-attributes)
have also been made obsolete.

## Redefined

Some elements have been semantically redefined.

-   `a` element now has a transparent content model. This means you are legally
    allowed to nest a `div` element if its parent allows flow content.

-   `b` element makes text stylistically bold and **does not** indicate importance. To
    indicate importance you should use `strong`.

-   `i` element makes text stylistically italic and **does not** indicate emphasis. To
    emphasize something you should use `em`.

-   `cite` element represents the title of creative work like a movie, documentary or
    book. The browser will render the citation in italics.

-   `small` element is independent of its styled presentation and is now used for
    side-comments and small print, including copyright and legal text.

## New additions

These elements were introduced to enhance the structure of a document:

`section`, `article`, `main`, `aside`, `header`, `footer`, `nav`, `figure`,
`figcaption`, `template`

Other new elements include:

`video`, `audio`, `track`, `embed`, `mark`, `progress`, `meter`, `time`, `ruby`,
`rt`, `rp`, `bdi`, `wbr`, `canvas`, `datalist`, `keygen`, `output`

The `input` element has new values for the `type` attribute:

`tel`, `search`, `url`, `email`, `date`, `time`, `number`, `range`, `color`

## JavaScript APIs

For a long time browser implementors were making up JavaScript APIs for
browsers. Now the HTML 5 specification has sections dedicated to web application
APIs. Some include:

-   Drag and drop
-   Full screen
-   History
-   IndexDB
-   Online and Offline events
-   Pointer Lock
-   Web storage
-   Web workers

* * *

## References

-   A Book Apart: [HTML5 for web designers](https://abookapart.com/products/html5-for-web-designers)
    by Jeremy Keith
-   [HTML Living Standard](https://html.spec.whatwg.org/multipage/index.html) by
    the WHATWG (Web Hypertext Application Technology Working Group)
-   [HTML5 Guide](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
    from Mozilla Developer Network
-   [Differences from HTML4](https://www.w3.org/TR/html5-diff/)
-   [10 HTML APIs worth looking into](https://www.sitepoint.com/10-html5-apis-worth-looking/)
