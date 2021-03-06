# hast-util-excerpt

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[hast][] utility to truncate the tree to a comment.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`excerpt(tree, options?)`](#excerpttree-options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a utility that takes a [hast][] (HTML) syntax tree and truncates
it to a comment, while otherwise preserving the tree structure.

## When should I use this?

This is a small utility useful when you need to create a shorter version of a
potentially long document, and want authors to be able to mark where that
version ends.

This utility is similar to [`hast-util-truncate`][hast-util-truncate], which
truncates a tree to a certain number of characters.

The rehype plugin
[`rehype-infer-description-meta`][rehype-infer-description-meta]
wraps both this utility and `hast-util-truncate` to figure out a description of
a document, for use with [`rehype-meta`][rehype-meta].

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install hast-util-excerpt
```

In Deno with [`esm.sh`][esmsh]:

```js
import {excerpt} from "https://esm.sh/hast-util-excerpt@1"
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {excerpt} from "https://esm.sh/hast-util-excerpt@1?bundle"
</script>
```

## Use

Say our module `example.js` looks as follows:

```js
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {excerpt} from 'hast-util-excerpt'

const tree = h('p', [
  'Lorem ipsum dolor sit amet, ',
  h('em', 'consectetur'),
  'adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  u('comment', 'more'),
  'Ut enim ad minim veniam, quis nostrud'
])

console.log(excerpt(tree));
```

???now running `node example.js` yields:

```js
{
  type: 'element',
  tagName: 'p',
  properties: {},
  children: [
    {type: 'text', value: 'Lorem ipsum dolor sit amet, '},
    {
      type: 'element',
      tagName: 'em',
      properties: {},
      children: [Array]
    },
    {
      type: 'text',
      value:
        'adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ]
}
```

## API

This package exports the identifier `excerpt`.
There is no default export.

### `excerpt(tree, options?)`

Truncate the tree to a comment.

##### `options`

Configuration (optional).

###### `options.comment`

Comment value to search for (`string`, default: `'more'`).

###### `options.maxSearchSize`

How far to search for the comment before bailing (`number`, default: `2048`).
The goal of this project is to find user-defined explicit excerpts, that are
assumed to be somewhat reasonably placed.
This option prevents searching giant documents for some comment that probably
won???t be found at the end.

###### `options.ignore`

Nodes to exclude from the resulting tree (`Array<Node>`).
These are not counted towards `size`.

###### Returns

Truncated copy of `tree` if there???s a comment, `undefined` otherwise (`Node?`).

## Types

This package is fully typed with [TypeScript][].
It exports the additional type `Options`.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

Use of `hast-util-excerpt` should be safe if the tree is already safe and
you???re not using user content in options.
When in doubt, use [`hast-util-sanitize`][hast-util-sanitize].

## Related

*   [`hast-util-truncate`](https://github.com/syntax-tree/hast-util-truncate)
    ??? truncate the tree to a number of characters
*   [`rehype-infer-description-meta`][rehype-infer-description-meta]
    ??? infer file metadata from the contents of the document
*   [`rehype-meta`][rehype-meta]
    ??? add metadata to the head of a document

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] ?? [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/hast-util-excerpt/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/hast-util-excerpt/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-excerpt.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-excerpt

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-excerpt.svg

[downloads]: https://www.npmjs.com/package/hast-util-excerpt

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-excerpt.svg

[size]: https://bundlephobia.com/result?p=hast-util-excerpt

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[hast]: https://github.com/syntax-tree/hast

[hast-util-sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[hast-util-truncate]: https://github.com/syntax-tree/hast-util-truncate

[rehype-infer-description-meta]: https://github.com/rehypejs/rehype-infer-description-meta

[rehype-meta]: https://github.com/rehypejs/rehype-meta
