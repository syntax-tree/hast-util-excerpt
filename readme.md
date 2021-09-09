# hast-util-excerpt

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[hast][]** utility to truncate the tree to a comment.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install hast-util-excerpt
```

## Use

Say we have the following module, `example.js`:

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

Now, running `node example.js` yields:

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

This package exports the following identifiers: `excerpt`.
There is no default export.

### `excerpt(tree, options?)`

Truncate the tree to a comment.

###### `options.comment`

Comment value to search for (`string`, default: `'more'`).

###### `options.maxSearchSize`

How far to search for the comment before bailing (`number`, default: `2048`).
The goal of this project is to find user-defined explicit excerpts, that are
assumed to be somewhat reasonably placed.
This option prevents searching giant documents for some comment that probably
won’t be found at the end.

###### `options.ignore`

Nodes to exclude from the resulting tree (`Array.<Node>`).
These are not counted towards `size`.

###### Returns

`Node?` — Truncated copy of `tree` if there’s a comment, `undefined` otherwise.

## Security

Use of `hast-util-excerpt` should be safe if the tree is already safe and
you’re not using user content in options.
When in doubt, use [`hast-util-sanitize`][sanitize].

## Related

*   [`hast-util-truncate`](https://github.com/syntax-tree/hast-util-truncate)
    — Truncate the tree to a certain number of characters

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

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

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[hast]: https://github.com/syntax-tree/hast
