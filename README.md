# react-markdown-editor

> Markdown editor with Github-like autocomplete

[![CircleCI](https://circleci.com/gh/webscopeio/react-markdown-editor/tree/master.svg?style=svg)](https://circleci.com/gh/webscopeio/react-markdown-editor/tree/master)

![alt text](https://raw.githubusercontent.com/webscopeio/react-markdown-editor/master/static/demo.gif)

## Warning
This is a work in progress. It's not well tested yet, please do not use this in production yet.

## Demo
https://webscope-react-markdown-editor.firebaseapp.com/

## Install

```bash
yarn add @webscopeio/react-markdown-editor
```

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

## License

MIT © [Webscope.io](https://github.com/Webscope.io)
