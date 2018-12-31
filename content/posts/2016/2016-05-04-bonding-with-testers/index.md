---
title: "Bonding with Testers"
cover: "https://picsum.photos/1600/800/?image=7"
date:   2016-05-04 23:56:55 +0200
category: "tech"
tags:
    - Relationships
    - Communication
    - Productivity
---

> Do you form relationships with testers? Teaming up with testers from the
> beginning of a feature can positively impact the quality of the feature
> being developed.

At work we often get trapped in our roles. We develop the software so we should
only contribute to the development of whatever we're building.
Once complete, someone - hopefully not the user - should test it. We
[suck at testing](https://simpleprogrammer.com/2016/04/20/developers-poor-testers-can-done/)
anyway don't we?

Perhaps. I guess it depends. I don't particularly have "parental feelings"
towards my code. I love coding but I make mistakes. I can't think of all
possible scenarios. I am aware of this. Today I write code and think it's
the most beautiful code I've ever written.
Some time in the future I am guaranteed to pull my hair out. I've made peace
with it.

> I've worked on codebases alone for most of my career. I know the sense of
> autonomy it presents but I am also well aware of the problems it can cause.
> Now that I am part of a team, I can produce better quality code because I
> have more validation from others through brainstorms, discussions, code reviews,
> CI and testing. I have more input.

The factory line of progressing a feature from UX to design to development to
QA to DevOps into production feels very "pushy" to me. Sure it is the natural line
of progression but we shouldn't just dump it onto the next stage. A deeper
understanding of the **purpose** of the feature is definitely desirable.

## Reaching the testing stage

Let's focus on development to QA. Quality assurance is something that
shouldn't be an after-thought therefore I'm going to refer to this stage as
**testing** instead of QA. _(This is a more favorable term I've picked up
through many craftsman in our industry)_

### Understanding the feature

Imagine a feature submitted for testing where the tester doesn't understand the
feature entirely. The feature is tested subjectively, goes to production and its a
disaster. Or it goes back to development because it failed. Perhaps the tester
wasn't aware of something critical to the feature.

Does this make them bad testers? I don't think so. I think it's just an error in
communication.

It could be that the preferred method of communication is through email or
digital boards. I feel that text is great for audit trails and refreshing your
memory of something but it is subjective. When I read something I build a
picture in my mind. That picture may look completely different to someone else.
In practice, talking to one another can help iron out those kinks in understanding.

If the testers are in the same vicinity as you, what stops you from
having a conversation with them? If you are working remotely, you could
have VoIP call.

### Not always very technical

Most people won't say out of the blue, "hey, I am not a technical person"
so the level of technical skills shouldn't be assumed. Technical issues -
network connectivity, proxy-related, authentication problems, environment
configuration misalignment, etc. - could cause terrible impediments for testers.

If you are technical, why not step in an lend a helping hand? Encourage your
team to raise issues before stand-ups the next day. You don't have to take on
everything yourself but you could be a gateway to roping in the right people
for the job. Show your tester how you are resolving it so that he/she can learn
and upskill in that space.

### User-focused

Testers try to understand how users interact with systems. Depending
on the audience, this could be completely different to how a developer interacts
with a system. If you are very technical and logical, what you create may make
sense to you. That doesn't mean that your users will understand it.

You could learn a lot about testing and how users interact with what you build
when you partner up with your tester.

### Use-cases

As testers are user-focused, they think up different use cases to test features
against. If a feature fails any of these cases, it needs to be fixed before
it can progress. This is valuable knowledge that we should consider upfront.

This could help us understand what will be tested so that we can ensure we cater
for such cases. It's less expensive as stories have a lower chance of hopping
back and forth within a sprint.

### Automated tests

Testers these days rely on testing our systems by executing automated regression
and functional test suites. This involves code. Perhaps we can help out here.
This could provide a great platform to learn new tools and share knowledge and ideas.

There is nothing wrong with pair programming with a tester.

## My final thoughts

The team is responsible for quality and delivery of software - not you alone.
You may not have control over the entire eco-system but you do have
control over the quality of the code going into the repository. How much do you
value quality?

You can't do everything alone. You need to work cohesively as a team.

> [Oz Chihwayi](https://twitter.com/ozchihwayi) and
> [Janco Wolmarans](https://twitter.com/jancowol) presented together at
> [DeveloperUG](http://www.meetup.com/DeveloperUG/)
> (a local meetup) one night. Their talk was titled **"The story of a Tester and a
> Developer"**. This story really resonated with me as it touched on a lot of
> concepts I had to figure out the hard way.
