import * as React from 'react'
import BaseMarkdownEditor from './BaseMarkdownEditor'

export default class MarkdownEditor extends React.Component {
  state = {
    preview: false,
  }

  onSetPreview = (preview) => {
    this.setState({ preview })
  }

  render() {
    return (
      <BaseMarkdownEditor
        preview={this.state.preview}
        onSetPreview={this.onSetPreview}
      />
    )
  }
}
