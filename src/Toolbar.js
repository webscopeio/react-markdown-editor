// @flow
import React, { Component } from 'react'
import { insertSymbol, wrapSelectedRangeWithSymbols } from './helpers'
import styles from './Toolbar.module.css'

// get SVG icons https://zurb.com/playground/foundation-icon-fonts-3
import bold from './icons/fi-bold.svg'
import italics from './icons/fi-italic.svg'
import type { MarkdownAction, Range } from './types'

type ToolbarProps = {
  setSelectionRange: Range => void,
  getSelectedRange: () => Range,
  setCaretPosition: (number) => void,
  onChange: any,
  value: string,
}

class Toolbar extends Component<ToolbarProps> {
  insertSymbols = (action: MarkdownAction) => {
    const { prefix, suffix } = action

    const {
      value,
      onChange,
      setCaretPosition,
      getSelectedRange,
      setSelectionRange,
    } = this.props

    const range = getSelectedRange()
    const { start, end } = range

    if (start === end) {
      const caretPosition = start
      const [newValue, inserted] = insertSymbol(value, caretPosition, [prefix, suffix])
      onChange({ target: { value: newValue } })
      setTimeout(() => {
        const newPosition = inserted ? caretPosition + 2 : caretPosition - 2
        setCaretPosition(newPosition)
      })
    } else {
      const [newValue, inserted] = wrapSelectedRangeWithSymbols(value, range, { prefix, suffix })
      onChange({ target: { value: newValue } })
      setTimeout(() => {
        const newStart = inserted ? start + 2 : start - 2
        const newEnd = inserted ? end + 2 : end - 2
        setSelectionRange({ start: newStart, end: newEnd })
      })
    }
  }

  insertBold = () => {
    this.insertSymbols({ prefix: '**', suffix: '**' })
  }

  insertItalics = () => {
    this.insertSymbols({ prefix: '_', suffix: '_' })
  }

  render() {
    return (
      <div>
        <button onClick={this.insertBold} className={styles.button}>
          <img src={bold} alt="Bold" />
        </button>
        <button onClick={this.insertItalics} className={styles.button}>
          <img src={italics} alt="Italics" />
        </button>
      </div>
    )
  }
}

export default Toolbar
