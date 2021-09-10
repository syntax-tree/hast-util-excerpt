/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 * @typedef {import('hast').Text} Text
 * @typedef {Root|Content} Node
 *
 * @typedef Options
 *   Configuration.
 * @property {string} [comment='more']
 *   Comment value to search for.
 * @property {number} [maxSearchSize=2048]
 *   How far to search for the comment before bailing.
 *   The goal of this project is to find user-defined explicit excerpts, that
 *   are assumed to be somewhat reasonably placed.
 *   This option prevents searching giant documents for some comment
 *   that probably won’t be found at the end.
 * @property {Content[]} [ignore=[]]
 *   Nodes to exclude from the resulting tree.
 *   These are not counted towards `size`.
 */

import {truncate} from 'hast-util-truncate'

/**
 * Truncate the tree to a certain comment.
 * Returns a copy of the given tree if a comment is found, and `undefined`
 * otherwise.
 *
 * @template {Node} Tree
 * @param {Tree} tree
 * @param {Options} [options]
 * @returns {Tree|undefined}
 */
export function excerpt(tree, options = {}) {
  const {comment = 'more', ignore, maxSearchSize = 2048} = options
  let found = false
  const result = preorder(truncate(tree, {ignore, size: maxSearchSize}))

  // @ts-expect-error: `result` is most likely a clone of `tree`
  return found ? result : undefined

  /**
   * @param {Node} node
   * @returns {Node|undefined}
   */
  function preorder(node) {
    if (node.type === 'comment' && node.value.trim() === comment) {
      found = true
      return
    }

    if (
      // @ts-expect-error: integrate w/ `mdast-util-mdx`
      (node.type === 'mdxFlowExpression' ||
        // @ts-expect-error
        node.type === 'mdxTextExpression') &&
      // @ts-expect-error
      node.data &&
      // @ts-expect-error
      node.data.estree &&
      // @ts-expect-error
      node.data.estree.comments &&
      // @ts-expect-error
      node.data.estree.comments.some(
        (/** @type {import('acorn').Comment} */ node) =>
          node.value.trim() === comment
      )
    ) {
      found = true
      return
    }

    /** @type {typeof node} */
    const replacement = {...node}

    if ('children' in node) {
      /** @type {Content[]} */
      const children = []
      let index = -1

      while (++index < node.children.length && !found) {
        const result = preorder(node.children[index])
        // @ts-expect-error: assume content model matches.
        if (result) children.push(result)
      }

      // @ts-expect-error: assume content model matches.
      replacement.children = children
    }

    return replacement
  }
}
