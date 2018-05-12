// @flow
import * as React from 'react'
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'
import showdown from 'showdown'
import emoji from './emoji-search'
import './style.css'
import styles from './BaseMarkdownEditor.module.css'
import classNames from 'classnames'
// eslint-disable-next-line import/extensions
import GithubMarkdown from 'github-markdown-css'
import AutocompleteItem from './AutocompleteItem'
import Toolbar from './Toolbar'

const Loading = () => <div>Loading</div>

type MarkdownEditorProps = {
  placeholder: ?string,
  value: string,
  noPreviewMessage?: string,
  onChange: any,
  textAreaProperties?: any, // TODO somehow import this from RTA?
  previewClass: string,
  preview: boolean,
  classes: { [key: string]: string },
  onSetPreview: ?boolean => void,
}


class MarkdownEditor extends React.Component<MarkdownEditorProps> {
  static defaultProps = {
    value: '',
    classes: styles,
    preview: false,
    previewClass: GithubMarkdown['markdown-body'],
    textAreaProperties: {},
    noPreviewMessage: 'Nothing to preview',
  }

  constructor() {
    super()
    this.converter = new showdown.Converter()
  }

  onSetPreviewFalse = () => {
    this.props.onSetPreview(false)
  }

  onSetPreviewTrue = () => {
    this.props.onSetPreview(true)
  }

  setCaretPosition = (position: number) => this.rtaRef.setCaretPosition(position)

  getCaretPosition = (): number => this.rtaRef.getCaretPosition()

  // TODO - types
  rtaRef: any = null
  converter: any = null

  render() {
    const {
      classes,
      preview,
      previewClass,
      textAreaProperties,
      noPreviewMessage,
      value,
      onChange,
    } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={classes.header}>
          <nav>
            <button
              onClick={this.onSetPreviewFalse}
              className={classNames(classes.navButton,
                { [classes.selected]: !preview })}
            >Write
            </button>
            <button
              onClick={this.onSetPreviewTrue}
              className={classNames(classes.navButton,
                { [classes.selected]: !!preview })}
            >Preview
            </button>
          </nav>
          <Toolbar
            getCaretPosition={this.getCaretPosition}
            setCaretPosition={this.setCaretPosition}
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={classes.content}>
          {preview
            ?
              <div
                className={classes.previewWrapper}
              >
                {!this.props.value.trim()
                ?
                  <article>{noPreviewMessage}</article>
                :
                  <article
                    className={previewClass}
                  // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                    __html: this.converter.makeHtml(this.props.value),
                  }}
                  />
              }
              </div>
            :
              <ReactTextareaAutocomplete
                loadingComponent={Loading}
                className={styles.textarea}
                ref={(ref) => {
                  this.rtaRef = ref
                }}
                trigger={{
                ':': {
                  dataProvider: token => emoji(token)
                    .slice(0, 10)
                    .map(({ name, char, keywords }) => ({ name, char, keywords })),
                  component: AutocompleteItem,
                  output: item => ({ text: item.char, caretPosition: 'next' }),
                },
              }}
                {...textAreaProperties}
                placeholder={this.props.placeholder}
                value={this.props.value}
                onChange={this.props.onChange}
              />
          }
        </div>
      </div>
    )
  }
}

export default MarkdownEditor
