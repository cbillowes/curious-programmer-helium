---
title:  "The rainbow in our storm sprint"
cover: "https://picsum.photos/1600/800/?image=903"
date:   2016-07-12 22:24:49 +0200
tags:
    - Mindset
    - Productivity
---

> Communication is essential to minimize stress and get the support a team
> needs to be successful.

We are seven days into our two week sprint and our burndown is flat-lining.
Until today, this sprint felt like a terrible storm that would never clear up.

Naturally a flat-lining burndown raises red flags and causes concern and
sometimes panic. Pressure builds and hits the team from the outside like a ton
of bricks.

This didn't happen here. Our stress was superficial and here's why:

## Motivation

We had two stories which heavily relied on core components seeking immediate
technical attention that wasn't planned for. We found tight coupling,
duplication, unused and misplaced components across different assemblies.

Us two developers discussed this and decided that it needs to be addressed.
As we are accountable for the product, we need to care about its
quality. Also when something goes wrong, we need to know exactly when, where and
how it broke and these components weren't meeting these needs.

We knew it would take a bit of time to address so we motivated this change with
our Product Owner and Tester. We highlighted the need to focus on the quality
of the plumbing on these components and the problems it could potentially
fix with troubleshooting problems users experience as we are always
burned by this.

Motivating technical changes with a Product Owner is a gray area as it is the
professional duty of a developer to fix code rot and leave code in a better
condition than it was before. I don't dispute this but if the change may impact
other commitments, the Product Owner **must** be in the know. as they need to
manage stakeholder expectations.

If we blindly entered this refactor without motivating this need in
business/product terms to our Product Owner, we would have jeopardized our
sprint and destroyed trust.

## Manage expectations

As the days went on we [Developers] were starting to stress a bit. This simple
refactor grew into a mountain of work that required a lot of focus.

No one was pushing us for status or progress updates because we made sure we
highlighted our progress and struggles during stand ups and throughout the day.

Many technical queries entered our team which interrupted our focus. When
we communicated the situation and the need for focus, our Product Owner,
Scrum Master, Dev Lead and Tester really stepped up to alleviate the pressures
by tackling the issues the best they could so that we could focus.

Yesterday we started showing how some bugs were resolved and how other enhancements
were automatically surfacing through this refactor. We were all getting really
excited but weren't out the woods yet.

We could feel the technical plumbing become more solid and product could see
the minor enhancements on the front end on our local environments.

Our Product Owner suggested creating visibility for these changes so we created
zero point stories in the sprint and increased our story points for the stories
we underestimated.

## Confidence

After many technical struggles, today we were victorious. Our blood sweat and
tears entered our staging environment in a working condition and our stories
started moving making our sprint look more balanced.

We would never have made it this far without our additional tests that we
introduced. As we branched off, we were rebasing, introducing changes,
discarding changes and merging. Our test suite and new components really
increased our confidence.

We also made a point of writing the code in such a way that it would only impact
the stories we are currently working on. In next iterations we can slowly migrate
other components when we touch on that code.

## My final thoughts

Our stress was superficial because we took it upon ourselves to improve the
quality of our codebase.

Even though our burndown doesn't reflect so, this is one of the best sprints
I've ever been a part of. The rainbow at the end of our storm sprint was that
our team really pulled together to make a flat-lining storm of a sprint
victorious.

Here's a summary of the factors contributing to our victory:

-   We took ownership and accountability of the product and codebase
-   We worked cohesively together driven by passion towards to the success of the product
-   We admitted to mistakes that we made and learned from them
-   We regularly communicated our progress, risks and issues we faced
-   We worked and thought strategically keeping the team, business, product and
    user's best interests at heart
-   We got support because we asked for help
-   We created visibility of the success that came from addressing our technical
    debt

The bottom line is that when people are not in the know, teams can pull in
all sorts of directions. **Communication is essential to minimize stress and
get the support a team needs to be successful.** That is why our flat-lining
sprint wasn't riddled by constant interruptions and panicked people.
