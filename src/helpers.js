// @flow
import type { MarkdownAction, MarkdownActionResult, Range } from './types'

// just a helper that is passed to a reduce helper
function sum(total, num) {
  return total + num
}

/**
 * Returns whether string is empty at a given position
 * @param word
 * @param position
 * @returns {boolean}
 */
const isEmptyAtPosition = (word: string, position: number): boolean =>
  word[position] === ' '

/**
 * Identifies the beginning and end of the word within which we have a cursor
 * @param word
 * @param position
 * @returns {{start: number, end: number}}
 */
export const getWordStartAndEndLocation = (word: string, position: number): Range => {
  if (isEmptyAtPosition(word, position) && isEmptyAtPosition(word, position - 1)) {
    return { start: position, end: position }
  }

  const firstPartOfWord = word.substr(0, position)
  const lastPartOfWord = word.substr(position)

  const start = firstPartOfWord.lastIndexOf(' ') + 1
  const end = lastPartOfWord.indexOf(' ')

  return {
    start: start !== -1 ? start : 0,
    end: position + (end !== -1 ? end : word.length),
  }
}

const insertSymbolInWord =
  (word: string, position: number, action: MarkdownAction): MarkdownActionResult => {
    const { prefix, suffix } = action
    const { start, end } = getWordStartAndEndLocation(word, position)

    const startWord = word.slice(0, start)
    const actualWord = word.slice(start, end)
    const endWord = word.slice(end, word.length)

    if (actualWord.startsWith(prefix) && actualWord.endsWith(suffix)) {
      const strippedWord = actualWord.slice(prefix.length, actualWord.length - suffix.length)
      return { text: `${startWord}${strippedWord}${endWord}`, added: false }
    }

    return { text: `${startWord}${prefix}${actualWord}${suffix}${endWord}`, added: true }
  }

export const insertSymbol =
  (text: string, position: number, action: MarkdownAction): MarkdownActionResult => {
    const { prefix, suffix } = action
    const lines = text.split('\n')
    const lineLengths = lines.map(line => line.length)

    const currentLine = text.substring(0, position).split('\n').length - 1

    const relativeLinePosition: number = position - lineLengths.slice(0, currentLine).reduce(sum, 0)

    const { text: newLine, added } =
      // if cursor is in the absolute end, we don't wrap the current word
      text.length === position
        ?
        { text: `${lines[currentLine]}${prefix}${suffix}`, added: true }
        :
        insertSymbolInWord(lines[currentLine], relativeLinePosition, action)

    lines[currentLine] = newLine
    return { text: lines.join('\n'), added }
  }

/**
 * Given a text and selected range, following function wraps this text with
 * provided symbols.
 */
export const wrapSelectedRangeWithSymbols =
  (text: string, range: Range, action: MarkdownAction): MarkdownActionResult => {
    const { start, end } = range
    const { prefix, suffix } = action

    const startWord = text.slice(0, start)
    const actualWord = text.slice(start, end)
    const endWord = text.slice(end, text.length)

    if (startWord.endsWith(prefix) && endWord.startsWith(suffix)) {
      const strippedStartWord = startWord.slice(0, startWord.length - prefix.length)
      const strippedEndWord = endWord.slice(2)
      return { text: `${strippedStartWord}${actualWord}${strippedEndWord}`, added: false }
    }

    return { text: `${startWord}${prefix}${actualWord}${suffix}${endWord}`, added: true }
  }
