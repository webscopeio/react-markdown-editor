import * as React from "react"
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete"
import showdown from "showdown"
import emoji from "./emoji-search"
import './style.css'
import styles from './BaseMarkdownEditor.module.css'
import classNames from 'classnames'
import GithubMarkdown from 'github-markdown-css'


const Item = ({ entity: { char, keywords } }) => {
  const [ firstKeyword ] = keywords
  return (
    <div>
      <span style={{ padding: 5 }}>{char}</span>
      <span style={{ padding: 5 }}>{firstKeyword}</span>
    </div>
  )
}
const Loading = ({ data }) => <div>Loading</div>

const converter = new showdown.Converter()

class MarkdownEditor extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  onSetPreviewFalse = () => {
    this.props.onSetPreview(false)
  }

  onSetPreviewTrue = () => {
    this.props.onSetPreview(true)
  }

  render() {
    const {
      classes,
      preview,
    } = this.props

    return (
      <div style={{ width: 400, textAlign: 'left' }}>
        <div>
          <div className={classes.header}>
            <nav>
              <button
                onClick={this.onSetPreviewFalse}
                className={classNames(classes.navButton,
                  { [ classes.selected ]: !preview })}
              >Write
              </button>
              <button
                onClick={this.onSetPreviewTrue}
                className={classNames(classes.navButton,
                  { [ classes.selected ]: !!preview })}
              >Preview
              </button>
            </nav>
          </div>
          {preview
            ?
            <div>
              <article
                className={GithubMarkdown[ 'markdown-body' ]}
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.state.value) }}></article>
            </div>
            :
            <div>
              <ReactTextareaAutocomplete
                loadingComponent={Loading}
                style={{
                  width: '100%',
                  minHeight: 200,
                  resize: 'none',
                  padding: 8,
                  border: 1,
                  lineHeight: '22.4px',
                  fontSize: 14,
                }}
                placeholder={'Write some markdown'}
                value={this.state.value}
                onChange={({ target: { value } }) => this.setState({ value })}
                trigger={{
                  ":": {
                    dataProvider: token => {
                      return emoji(token)
                        .slice(0, 10)
                        .map(({ name, char, keywords }) => ({ name, char, keywords }))
                    },
                    component: Item,
                    // TODO - after new version of RTA is deployed, caretPosition: next will be a default and
                    // we can just return a string
                    output: (item, trigger) => ({ text: item.char, caretPosition: 'next' }),
                  }
                }}
              />
            </div>}

        </div>
      </div>
    )
  }
}

MarkdownEditor.defaultProps = {
  classes: styles,
  preview: false,
}

export default MarkdownEditor
