// eslint-disable-next-line import/extensions
import emojilib from 'emojilib/emojis'
import sort from 'match-sorter'

/* build proper library with included name of the emoji */
const library = Object.entries(emojilib).map(([name, emojiObject]) =>
  Object.assign({}, emojiObject,
    { keywords: [].concat([name], emojiObject.keywords) }, name)
)
export default key => sort(library, key, { keys: ['keywords'] })
