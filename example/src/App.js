import React, { Component } from 'react'

import ReactMarkdownEditor from 'react-markdown-editor'

export default class App extends Component {
  state = {
    value: 'Hello world',
  }

  render () {
    return (
      <div>
        <ReactMarkdownEditor
          text='Modern React component module'
          placeholder={'Write something ...'}
          value={this.state.value}
          onChange={({ target: { value } }) => this.setState({ value })}
        />
      </div>
    )
  }
}
