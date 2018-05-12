import { getWordStartAndEndLocation, insertSymbol } from './helpers'

describe('Markdown helpers', () => {
  it('get current world start & stop positions', () => {
    const text = 'Hello world'
    expect(getWordStartAndEndLocation(text, 1)).toEqual([0, 5])
  })
  it('return current position if it\'s not located in any word', () => {
    const text = 'Hello  world'
    expect(getWordStartAndEndLocation(text, 6)).toEqual([6, 6])
  })

  it('return previous word start/end if it the cursor is located at it\'s end', () => {
    const text = 'Hello world'
    expect(getWordStartAndEndLocation(text, 5)).toEqual([0, 5])
  })
})

describe('Markdown replace functions', () => {
  it('inserts symbol helper', () => {
    const text = 'Hello world'
    expect(insertSymbol(text, 1, ['**', '**'])).toEqual(['**Hello** world', true])
  })

  it('wrap the word if the cursor is located at the end of the word', () => {
    const text = 'Hello world'
    expect(insertSymbol(text, 5, ['**', '**'])).toEqual(['**Hello** world', true])
  })

  it('insert bold symbol in a middle of empty character', () => {
    const text = 'Hello  world'
    expect(insertSymbol(text, 6, ['**', '**'])).toEqual(['Hello **** world', true])
  })

  it('insert italics symbol in the second word', () => {
    const text = 'Hello Webscope'
    expect(insertSymbol(text, 14, ['_', '_'])).toEqual(['Hello _Webscope_', true])
  })

  it('multiline comment', () => {
    const text =
      `This is a multiline
comment

WOW`

    expect(insertSymbol(text, 28, ['`', '`'])).toEqual([`This is a multiline
comment
\`\`
WOW`, true])
  })

  it('word is already wrapped, insertSymbol is invoked with this symbol, symbol is removed', () => {
    const text = '**Hello** world'
    expect(insertSymbol(text, 1, ['**', '**'])).toEqual(['Hello world', false])
  })
})
