import test from 'tape'
import {u} from 'unist-builder'
import {h} from 'hastscript'
import {removePosition} from 'unist-util-remove-position'
import {selectAll} from 'hast-util-select'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {mdxjs} from 'micromark-extension-mdxjs'
import {mdxFromMarkdown} from 'mdast-util-mdx'
import {toHast} from 'mdast-util-to-hast'
import {excerpt} from './index.js'

test('hastUtilExcerpt', (t) => {
  t.deepEqual(
    excerpt(
      h('div', [
        h('p', 'Lorem ipsum dolor sit amet.'),
        u('comment', 'more'),
        h('p', 'Consectetur adipisicing elit.')
      ])
    ),
    h('div', [h('p', 'Lorem ipsum dolor sit amet.')]),
    'should copy to an excerpt comment'
  )

  t.deepEqual(
    excerpt(
      h('div', [
        h('p', 'Lorem ipsum dolor sit amet.'),
        h('p', 'Consectetur adipisicing elit.')
      ])
    ),
    undefined,
    'should return `undefined` if there’s no comment'
  )

  t.deepEqual(
    excerpt(
      h('div', [
        h('p', 'Lorem ipsum dolor sit amet.'),
        u('comment', 'just a comment'),
        h('p', 'Consectetur adipisicing elit.')
      ])
    ),
    undefined,
    'should not match on comments with other values'
  )

  t.deepEqual(
    excerpt(
      h('div', [
        h('p', 'Lorem ipsum dolor sit amet.'),
        u('comment', '\r\n stop here\t\n'),
        h('p', 'Consectetur adipisicing elit.')
      ]),
      {comment: 'stop here'}
    ),
    h('div', [h('p', 'Lorem ipsum dolor sit amet.')]),
    'should ignore trailing whitespace around comments'
  )

  const tree = h('div', [
    h('p', ['Lorem ipsum ', h('del', 'dolor'), ' sit amet.']),
    u('comment', 'more'),
    h('p', 'Consectetur adipisicing elit.')
  ])

  t.deepEqual(
    excerpt(tree, {ignore: selectAll('del', tree)}),
    h('div', [h('p', ['Lorem ipsum ', ' sit amet.'])]),
    'should support `ignore`'
  )

  t.deepEqual(
    excerpt(
      // @ts-expect-error: hush!
      toHast(
        removePosition(
          fromMarkdown('Some text\n\n{/* more */}\n\nSome more text', {
            extensions: [mdxjs()],
            mdastExtensions: [mdxFromMarkdown]
          })
        ),
        {passThrough: ['mdxFlowExpression', 'mdxTextExpression', 'mdxjsEsm']}
      )
    ),
    u('root', [h('p', 'Some text'), u('text', '\n')]),
    'should integrate w/ `mdast-util-mdx` (support `/* comments */`)'
  )

  t.end()
})
