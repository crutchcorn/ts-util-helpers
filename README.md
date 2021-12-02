<div align="center">
<h1>ts-util-helpers</h1>

<p>TypeScript first utility helpers</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]](#contributors-)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## The problem

Sometimes, in particular with developer tooling, you want to have immensely
tight type strictness in your TypeScript codebase. However, to make your
extremely code type strict can be
[difficult to maintain](./src/objects/pick-deep.ts), to say the least.

While type strictness can be overused in some instances, in others it allows you
to be confident in the code you're shipping, and provide a uniquely strong
developer experience.

## This solution

This library provides extremely restrictive typings to common (and somewhat
niche) utilities such as `pick`ing keys from an object.

We've written some utilities that don't exist elsewhere that contain extremely
complex TypeScript typings in the name of retaining as strict of type
information as the compiler allows us to. We pull out all the stops to make that
happen.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [String Helpers](#string-helpers)
    - [String Concatination](#string-concatination)
  - [Object Helpers](#object-helpers)
    - [Immutability Set Property](#immutability-set-property)
    - [Object Filter](#object-filter)
    - [Object Map](#object-map)
    - [Pick](#pick)
    - [Pick Deep](#pick-deep)
  - [Utility Types](#utility-types)
- [Other Solutions](#other-solutions)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors ✨](#contributors-)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save ts-util-helpers
```

## Usage

We provide a myriad of utilities for your usage.

### String Helpers

#### String Concatination

You can choose to use the implemented TS logic:

```typescript
import {concatStr} from 'ts-util-helpers'

// Pseudo-code typing:
// concatStr<R extends string>(...string[]): R;
concatStr('H', 'i', '!') // Type is "Hi!"
concatStr('Hi!') // Type is "Hi!"
const constStr = 'Hi!' as const
concatStr(constStr) // Type is "Hi!"
// Strings must be `as const` for type strictness to apply
const str = 'Hi!'
concatStr(str) // Type is string
```

Or, if you just need the TS typing:

```typescript
import type {JoinStr} from 'ts-util-helpers';

JoinStr<["H", "i"]> // Type is "Hi!"
```

### Object Helpers

#### Immutability Set Property

This function takes three properties:

1. An object
2. A key name
3. A value to set to the key name

And returns a new object for you to use with said key updated.

```typescript
import {objectImmutablySetProp} from 'ts-util-helpers'

// Return type is `{welcomeMsg: "Hello, world!"}
objectImmutablySetProp({welcomeMsg: 'Hey'}, 'welcomeMsg', 'Hello, world!')
```

This is what it's doing under-the-hood at runtime:

```javascript
return {...object, [key]: val}
```

While the logic of this is quite simple, the typings can be somewhat tricky if
you're not familiar with mapped generics to get only the single key updating.

#### Object Filter

Similar to `Array.filter`, `objectFilter` allows you to take:

1. An object to iterate through
2. A callback

And filter out the keys based on said callback from the returned object.

The callback receives three properties:

1. The value of the key being inspected
2. The key name being inspected
3. The full object

```typescript
import {objectFilter} from 'ts-util-helpers'

// Return type is Optional<{a: 1, b: 2, c: 3}>
// Return value is {a: 1, b: 2}
objectFilter({a: 1, b: 2, c: 3}, val => val <= 2)
```

> If you know how to make this function more type-strict, please [make a pull
> request][prs] or open an issue and let us know! We tried for ages to
> experiment different ways

#### Object Map

Similar to `Array.map`, `objectMap` allows you to take:

1. An object to iterate through
2. A callback

And map keys' values based on said callback from the returned object.

The callback receives three properties:

1. The value of the key being inspected
2. The key name being inspected
3. The full object

```typescript
import {objectMap} from 'ts-util-helpers'

// Return type is Optional<{a: number, b: number, c: number}>
// Return value is {a: 3, b: 4, c: 5}
objectMap({a: 1, b: 2, c: 3}, val => val + 2)

// Return type is Optional<{a: "a" | "b" | "c", b: "a" | "b" | "c", c: "a" | "b" | "c"}>
// Return value is {a: "a", b: "b", c: "c"}
objectMap({a: 1, b: 2, c: 3}, (_, key) => key)

// Return type is Optional<{a: number, b: number, c: number}>
// Return value is {a: 3, b: 3, c: 3}
objectMap({a: 1, b: 2, c: 3}, (_, __, obj) => Object.keys(obj).length)
```

> If you know how to make this function more type-strict, please [make a pull
> request][prs] or open an issue and let us know! We tried for ages to
> experiment different ways

#### Pick

There are often times where you may want to object destructure values from an
array that's passed in during runtime, but don't want to lose your type
strictness.

While solutions like [`_.pick`](https://lodash.com/docs/4.17.15#pick) allow you
to get the values, you'd have to manually re-type everything.

This is where `pick` comes into play.

```typescript
import {pick} from 'ts-util-helpers'

// Return type is {test: 1, other: 2}
pick({test: 1, other: 2, ignored: 3} as const, ['test', 'other'])
```

> This utility only supports the top-most level of keys in an object. If you
> need something that can handle any depth,
> [see our "pick deep" utility if you need arbitrary depth](#pick-deep)

#### Pick Deep

This utility provides an almost-[GQL](https://graphql.org/)-like query interface
to pick only the keys you need from an object at any depth.

It takes two arguments:

1. The object to get values from
2. The query object, telling the utility what object to get values from

```typescript
import {pickDeep} from 'ts-util-helpers'

const obj = {
  key: 'Hello',
  ignored: 1,
  exlcluded: 2,
  arr: [{objVal: 3}],
  deepObj: {
    num: 4,
    deeper: {
      val: 5,
      ignored: 6,
    },
  },
} as const

const queryObj = {
  key: true,
  excluded: false,
  arr: {
    objVal: true,
  },
  deepObj: {
    num: true,
    deeper: {
      val: true,
    },
  },
} as const

pickDeep(obj, queryObj)

/*
// Return type and value is:
{
    key: "Hello",
    arr: [
        {objVal: 3}
    ],
    deepObj: {
        num: 4,
        deeper: {
            val: 5
        }
    }
}
*/
```

The query object must have a `true` or `false` value passed to grab the
underlying value or not. To query for arrays, simply pass an argument that
aligns with the underlying types.

We will also enforce the required `queryObj` to be the same expected shape as
the `obj`, if you don't see this behavior - consider it a bug.

> While you can `true` or `false` any object key, you cannot do so if the key's
> value is an array or object currently.
>
> This means that while this works:
>
> ```typescript
> pickDeep(
>   {parent: {child: 1}},
>   {
>     parent: {
>       child: true,
>     },
>   },
> )
> ```
>
> This does not:
>
> ```typescript
> pickDeep(
>   {parent: {child: 1}},
>   {
>     parent: true,
>   },
> )
> ```
>
> This is a limitation with our typings currently and should be fixed in the
> future.

### Utility Types

```typescript
import type {OnlyOptional, OnlyNonOptional} from 'ts-util-helpers';

type Obj = {
    optional?: 1,
    required: 2
}
OnlyOptional<Obj>; // Type will be {optional?: 1}
OnlyNonOptional<Obj>; // Type will be {required: 2}
```

## Other Solutions

- [Type Fest](https://github.com/sindresorhus/type-fest) provides some great
  utility types without implementations
- [Lodash](https://lodash.com/) provides some (usually less strictly typed)
  utility functions

If you know more, please [make a pull request][prs] and add it here!

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## Contributors ✨

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://crutchcorn.dev/"><img src="https://avatars.githubusercontent.com/u/9100169?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Corbin Crutchley</b></sub></a><br /><a href="https://github.com/crutchcorn/ts-util-helpers/commits?author=crutchcorn" title="Code">💻</a> <a href="#infra-crutchcorn" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/crutchcorn/ts-util-helpers/commits?author=crutchcorn" title="Documentation">📖</a> <a href="https://github.com/crutchcorn/ts-util-helpers/commits?author=crutchcorn" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/github/workflow/status/crutchcorn/ts-util-helpers/validate?logo=github&style=flat-square
[build]: https://github.com/crutchcorn/ts-util-helpers/actions?query=workflow%3Avalidate
[coverage-badge]: https://img.shields.io/codecov/c/github/crutchcorn/ts-util-helpers.svg?style=flat-square
[coverage]: https://codecov.io/github/crutchcorn/ts-util-helpers
[version-badge]: https://img.shields.io/npm/v/ts-util-helpers.svg?style=flat-square
[package]: https://www.npmjs.com/package/ts-util-helpers
[downloads-badge]: https://img.shields.io/npm/dm/ts-util-helpers.svg?style=flat-square
[npmtrends]: https://www.npmtrends.com/ts-util-helpers
[license-badge]: https://img.shields.io/npm/l/ts-util-helpers.svg?style=flat-square
[license]: https://github.com/crutchcorn/ts-util-helpers/blob/main/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: https://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/crutchcorn/ts-util-helpers/blob/main/CODE_OF_CONDUCT.md
[emojis]: https://github.com/all-contributors/all-contributors#emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[all-contributors-badge]: https://img.shields.io/github/all-contributors/crutchcorn/ts-util-helpers?color=orange&style=flat-square
[bugs]: https://github.com/crutchcorn/ts-util-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Acreated-desc+label%3Abug
[requests]: https://github.com/crutchcorn/ts-util-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/crutchcorn/ts-util-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement+label%3A%22good+first+issue%22
<!-- prettier-ignore-end -->
