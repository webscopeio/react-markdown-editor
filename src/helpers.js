// @flow

const isEmptyAtPosition = (word: string, position: number) => {
  return word[position] === ' '
}

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

const insertSymbolInWord = (word: string, position: number, [prefix, suffix]: Array<string>) => {
  const [ start, end ] = getWordStartAndEndLocation(word, position)
  const startWord = word.slice(0, start)
  const actualWord = word.slice(start, end)
  const endWord = word.slice(end, word.length)

  if (actualWord.startsWith(prefix) && actualWord.endsWith(suffix)) {
    const strippedWord = actualWord.slice(prefix.length, actualWord.length - suffix.length)
    return [ `${startWord}${strippedWord}${endWord}`, false ]
  }

  return [ `${startWord}${prefix}${actualWord}${suffix}${endWord}`, true ]
}

// reduce helper
function sum(total, num) {
  return total + num
}

export const insertSymbol = (text: string, position: number, [prefix, suffix]: Array<string>) => {

  const lines = text.split('\n')
  const lineLengths = lines.map(line => line.length)

  const currentLine = text.substring(0, position).split('\n').length - 1

  const relativeLinePosition: number = position - lineLengths.slice(0, currentLine).reduce(sum, 0)
  const [newLine, replaced] = insertSymbolInWord(lines[currentLine], relativeLinePosition, [prefix, suffix])

  lines[currentLine] = newLine
  return [lines.join('\n'), replaced]
}

