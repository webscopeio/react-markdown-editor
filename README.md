# react-markdown-editor

> Markdown editor with Github-like autocomplete

[![CircleCI](https://circleci.com/gh/webscopeio/react-markdown-editor/tree/master.svg?style=svg)](https://circleci.com/gh/webscopeio/react-markdown-editor/tree/master)

![demo](https://user-images.githubusercontent.com/1083817/39962530-ba6b3040-5651-11e8-8279-b7ec74b56ca5.gif)

## Install

```bash
yarn add @webscopeio/react-markdown-editor
```

## Demo
https://webscope-react-markdown-editor.firebaseapp.com/

## Why does it exist?

We needed a simple markdown editor with preview functionality and OOTB support for emojis. 

Since we're very satisfied with Github's markdown editor, the goal is to get as close as possible to it's functionality. 

### Core characteristics
1. **Out of the box solution** - It should be possible to use this plugin without futher configuration/coding - `yarn install` & `import` and you're ready to go -> If you're looking for more customizable solution, check out [@webscopeio/react-textarea-autocomplete](https://github.com/webscopeio/react-textarea-autocomplete), which is more low-level.
2. **Configurable** - Even though it's working OOTB, it is possible to override styles (especially with CSS modules) or pass custom properties to any of the components at the lower level ([RTA](https://github.com/webscopeio/react-textarea-autocomplete), [showdown](https://github.com/showdownjs/showdown))
3. **Modular** - We plan to export smaller chunks of this solution either directly or as a separate `npm` modules in a future (markdown functionality, autocomplete functionality, etc.) 
4. **TDD** - We write test before functionality is implemented

## Usage

```jsx
import React, { Component } from 'react'

import ReactMarkdownEditor from '@webscopeio/react-markdown-editor'

export default class App extends Component {
  state = {
    value: 'Hello world',
  }

  render () {
    return (
      <div>
        <ReactMarkdownEditor
          placeholder={'Write something ...'}
          value={this.state.value}
          onChange={({ target: { value } }) => this.setState({ value })}
        />
      </div>
    )
  }
}

```

## Properties

| Props         | Type           |  Description | Default
| :------------- | :-------------  |  --------- | -------
| value | `string` | value property | `''`
| onChange | `(Event) => void` | onChange handler | None
| placeholder | `string` | Placeholder value | `''`
| textAreaProperties | `Object` | [RTA](https://github.com/webscopeio/react-textarea-autocomplete) properties | `{}`
| noPreviewMessage | `string` | Message to be displayed in a preview panel if no content is present | `Nothing to preview`
| previewClass | `string` | Main class name that is used to format Markup preview | `markdown-body` see [githubb-markdown-css](https://github.com/sindresorhus/github-markdown-css)
| classes | `{[key: string]: string}` | classes / CSS modules reference to override styling | 



## Styling
We provide basic styles so that the plugin can be used out of the box. You can override styles by passing `classes` property. 

Ideally, you will pass a reference to your CSS module. Check out the source code for more info. Optionally you can pass class names directly if you don't use CSS modules.

## Acknowledgment

> If I have seen further it is by standing on ye sholders of Giants. (Isaac Newton)

This library is here thanks to the great open source software that is used under the hood. 
The most important parts are:

- [@webscopeio/react-textarea-autocomplete](https://github.com/webscopeio/react-textarea-autocomplete)
- [showdownjs/showdown](https://github.com/showdownjs/showdown)
- [sindresorhus/github-markdown-css](https://github.com/sindresorhus/github-markdown-css)
- [muan/emojilib](https://github.com/muan/emojilib)
- see other dependencies in `package.json`

## License

MIT © [webscope.io](https://github.com/webscopeio)

