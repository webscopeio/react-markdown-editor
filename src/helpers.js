// @flow

const isEmptyAtPosition = (word: string, position: number) => word[position] === ' ' || word[position] === '\n'

export const getWordStartAndEndLocation = (word: string, position: number) => {
  if (isEmptyAtPosition(word, position) && isEmptyAtPosition(word, position - 1)) {
    return [position, position]
  }

  const firstPartOfWord = word.substr(0, position)
  const lastPartOfWord = word.substr(position)

  const start = firstPartOfWord.lastIndexOf(' ') + 1
  const end = lastPartOfWord.indexOf(' ')

  return [
    start !== -1 ? start : 0,
    position + (end !== -1 ? end : word.length),
  ]
}

export const insertSymbol = (word: string, position: number, [prefix, suffix]: Array<string>) => {
  const [start, end] = getWordStartAndEndLocation(word, position)
  const startWord = word.slice(0, start)
  const actualWord = word.slice(start, end)
  const endWord = word.slice(end, word.length)

  if (actualWord.startsWith(prefix) && actualWord.endsWith(suffix)) {
    const strippedWord = actualWord.slice(prefix.length, actualWord.length - suffix.length)
    return [`${startWord}${strippedWord}${endWord}`, false]
  }

  return [`${startWord}${prefix}${actualWord}${suffix}${endWord}`, true]
}

