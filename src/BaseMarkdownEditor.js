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
    <div style={{lineHeight: '14px', margin: 0, padding: 12, fontSize: 14, fontWeight: 'bold'}}>
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
      previewClass,
    } = this.props

    return (
      <div className={styles.wrapper}>
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
          <div className={classes.content}>
            {preview
              ?
              <div
                className={classes.previewWrapper}
              >
                {!this.state.value.trim()
                  ?
                  <article>Nothing to preview</article>
                  :
                  <article
                    className={previewClass}
                    dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.state.value) }}></article>
                }
              </div>
              :
                <ReactTextareaAutocomplete
                  loadingComponent={Loading}
                  className={styles.textarea}
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
              }
          </div>

        </div>
      </div>
    )
  }
}

MarkdownEditor.defaultProps = {
  classes: styles,
  preview: false,
  previewClass: GithubMarkdown[ 'markdown-body' ],
}

export default MarkdownEditor
