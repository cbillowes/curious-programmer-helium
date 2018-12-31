---
title:  "Contributing to the README"
cover: "https://picsum.photos/1600/800/?image=528"
date:   2016-09-24 15:00:49 +0200
tags:
    - Communication
    - Relationships
    - Technical
---

> When someone new works on your repository, make sure it is easy to get setup.

Imagine if we didn't have any documentation; if we all adopted the mindset of
"I already know this, let others figure it out on their own."

No more books. No more Wikipedia. No more READMEs. No more StackOverflow.
No more API references and tutorials.

<blockquote class="twitter-tweet" data-lang="en">
  <p lang="en" dir="ltr">
    Don&#39;t take what you know for granted. Someone else may not know what
    you know.
  </p>&mdash; Clarice Bouwer (@cbillowes)
  <a href="https://twitter.com/cbillowes/status/779058105439182852">
    September 22, 2016
  </a>
</blockquote>

Documentation is a very broad term and has a bad stigma to it. As it can apply
to anything from the enterprise to the application—what is written today can be
stale or incorrect tomorrow.

The code repository is something you have control over. It contains the
application which translates the business needs to code.

Your repository is meaningless if someone else needs to work on it and can't
even get setup. Use your README to help other software developers and assume
they know nothing about the project. Here's what I think could help contribute
to a great README file:

## Overview

### Introduction

-   A brief introduction to the repository summed up in one or two explanatory
    sentences.
-   If it's a component of a bigger project, mention it and reference the other
    components.
-   If the project has a vision add it.

### Architecture

Is there a simplified architectural diagram that can quickly highlight the
overall architecture at a glimpse? This changes over time so extensive
documentation is probably not an option unless it can be automated or there is
a role where someone needs to keep it updated.

### Dependencies

Your project is probably referencing some dependencies. In .NET all Nuget
packages and their dependencies sit in the root of the same folder. This makes
it difficult to differentiate what was explicitly referenced and why.

If future developers are unfamiliar with the packages, the chances of cleaning
unnecessary packages up later is slim to none.

List the dependencies that you have explicitly referenced and mention why.

### Environments

-   What environments exists for this application?
-   How can these environments be accessed?
-   What is the purpose of each environment and how does it tie into the build
    pipeline?
-   What are the different integration points so that I know where things can fail?
-   Do I need to know anything specific about each environment?

### Commit guidelines

If you have a [standard](/blog/importance-of-git-history/#useful-messages)
for commit messages then state how commits should be written for new features,
bug fixes, improvements and refactoring in this repository.

What other information needs to be present in the message; a link to the ticket
number or the reasoning behind a change?

## Getting setup

-   What tools do you suggest I use while I'm getting familiar with the code?
-   What software (and versions) do I need to install to get it to work?
-   Do I need to be on a specific network?
-   Do I need host entries for the application to run properly?
-   Is there something I should know about the proxy?
-   Is any of this automated in a VM or container script that I can use, and how?
-   How do I run the application? What dependency modules or services need to be
    up before I can run it properly?

## Testing

-   What testing and mocking frameworks are being used?
-   Do I need a specific test runner to run the tests?
-   What type of tests exist in the application? Where do I locate them (if it's
    not in a standard place)?
-   What is the strategy for running longer running tests in the CI?
-   How is the UI tested and where are those tests?

## Deployment pipeline

-   Where can I access the deployment pipeline?
-   What is the process?
-   Do I need to know anything specific about it?
-   Who can deploy to production? (Automated / Manual / Restricted access?)
-   How is production deployed to? What must be done before it can deployed to?
    (Governance requirements etc)
-   Is there something that must happen after deploying to production?

## Knowledgebase

All the knowledge you accumulate during your journey with this repository is
lost (only available in your mind) when you leave. What other knowledge can
you share to help future developers on the project to avoid the same mistakes
being made in the future.

-   Are there any caveats to know about?
-   Do you have a history of issues that you faced with solutions to those
    problems?
-   How does one troubleshoot?
-   Are there support tools or applications I need to know about?
-   What is the escalation procedure for common problems?
-   Is there a ticketing system?

## My final thoughts

The next time you think that documenting something will take too much time,
think how you would feel if you were in the next person's shoes. Too scared to
make changes, anxious about deploying and downright frightened to even look
at the code.

Make the world a better place. Contribute to the README and write about what
you learn so that others can benefit and start innovating instead of struggling
too much.

**Note**: This may appear verbose but could be broken down into separate pages
or linked out to other references. It doesn't have to be extensive but it
must be good enough to get someone up and running especially if the person is
new to the company or your team.

If your documentation does become extensive it could highlight problems within
your solution that could be reflected on for improvements.

* * *

## References

-   [A curated list of awesome README](https://github.com/matiassingers/awesome-readme)
-   [How to write a good README](http://stackoverflow.com/questions/2304863/how-to-write-a-good-readme)
    from StackOverflow
-   [The Importance of Git History](/blog/importance-of-git-history/#useful-messages),
    writing useful messages

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
