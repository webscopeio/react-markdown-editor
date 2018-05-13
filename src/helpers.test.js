// @flow
// TMP solution, install flow-typed - jest
import type { MarkdownAction } from './types'

declare var expect: any
declare var it: any
declare var describe: any

import { getWordStartAndEndLocation, insertSymbol, wrapSelectedRangeWithSymbols } from './helpers'

const BOLD_ACTION: MarkdownAction = {
  prefix: '**',
  suffix: '**',
}

const ITALICS_ACTION: MarkdownAction = {
  prefix: '_',
  suffix: '_',
}

const CODE_ACTION: MarkdownAction = {
  prefix: '`',
  suffix: '`',
}

describe('Markdown helpers', () => {
  it('get current world start & stop positions', () => {
    const text = 'Hello world'
    expect(getWordStartAndEndLocation(text, 1)).toEqual({ start: 0, end: 5 })
  })
  it('return current position if it\'s not located in any word', () => {
    const text = 'Hello  world'
    expect(getWordStartAndEndLocation(text, 6)).toEqual({ start: 6, end: 6 })
  })

  it('return previous word start/end if it the cursor is located at it\'s end', () => {
    const text = 'Hello world'
    expect(getWordStartAndEndLocation(text, 5)).toEqual({ start: 0, end: 5 })
  })
})

describe('Markdown replace functions', () => {
  it('put symbols in the end if cursor is at the end', () => {
    const text = 'Hello world'
    expect(insertSymbol(text, 11, BOLD_ACTION))
      .toEqual({ text: 'Hello world****', added: true })
  })

  it('put symbols in the end if cursor is at the end', () => {
    const text = 'Hello Webscope'
    expect(insertSymbol(text, 14, ITALICS_ACTION)).toEqual({ text: 'Hello Webscope__', added: true })
  })

  it('wraps selected text with symbols', () => {
    const text = 'Hello world! I hope you like this plugin!'
    expect(wrapSelectedRangeWithSymbols(text, { start: 2, end: 14 }, BOLD_ACTION))
      .toEqual({ text: 'He**llo world! I** hope you like this plugin!', added: true })
  })

  it('unwraps selected text with symbols', () => {
    const text = 'He**llo world! I** hope you like this plugin!'
    expect(wrapSelectedRangeWithSymbols(text, { start: 4, end: 16 }, BOLD_ACTION))
      .toEqual({ text: 'Hello world! I hope you like this plugin!', added: false })
  })

  it('inserts symbol helper', () => {
    const text = 'Hello world'
    expect(insertSymbol(text, 1, BOLD_ACTION)).toEqual({ text: '**Hello** world', added: true })
  })

  it('wrap the word if the cursor is located at the end of the word', () => {
    const text = 'Hello world'
    expect(insertSymbol(text, 5, BOLD_ACTION)).toEqual({ text: '**Hello** world', added: true })
  })

  it('insert bold symbol in a middle of empty character', () => {
    const text = 'Hello  world'
    expect(insertSymbol(text, 6, BOLD_ACTION)).toEqual({ text: 'Hello **** world', added: true })
  })

  it('insert italics symbol in the second word', () => {
    const text = 'Hello Webscope'
    expect(insertSymbol(text, 13, ITALICS_ACTION)).toEqual({ text: 'Hello _Webscope_', added: true })
  })

  it('multiline comment - cursor is in an empty line', () => {
    const text =
      `This is a multiline
comment

WOW`

    expect(insertSymbol(text, 28, CODE_ACTION)).toEqual({
      text: `This is a multiline
comment
\`\`
WOW`,
      added: true,
    })
  })

  it('multiline comment - cursor is at the word', () => {
    const text =
      `This is a multiline
comment

WOW`

    expect(insertSymbol(text, 30, ITALICS_ACTION)).toEqual({
      text: `This is a multiline
comment

_WOW_`,
      added: true,
    })
  })

  it('word is already wrapped, insertSymbol is invoked with this symbol, symbol is removed', () => {
    const text = '**Hello** world'
    expect(insertSymbol(text, 1, BOLD_ACTION)).toEqual({ text: 'Hello world', added: false })
  })

  it('empty string is wrapped with a **** symbol, insertSymbol is invoked with the symbol, **** disappear', () => {
    const text = `**A**

****

AHOJ **B**`
    expect(insertSymbol(text, 9, BOLD_ACTION)).toEqual({
      text: `**A**



AHOJ **B**`,
      added: false,
    })
  })

  it('there are multiple lines, word in a middle of those lines should be wrapped if cursor is at that word', () => {
    const text = `first
hello world 
last`
    expect(insertSymbol(text, 9, BOLD_ACTION)).toEqual({
      text: `first
**hello** world 
last`,
      added: true,
    })
  })
})
