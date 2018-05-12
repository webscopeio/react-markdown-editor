// @flow
import React, { Component } from 'react'
import { insertSymbol } from './helpers'
import styles from './Toolbar.module.css'

// get SVG icons https://zurb.com/playground/foundation-icon-fonts-3
import bold from './icons/fi-bold.svg'
import italics from './icons/fi-italic.svg'

type ToolbarProps = {
  getCaretPosition: () => number,
  setCaretPosition: (number) => void,
  onChange: any,
  value: string,
}

class Toolbar extends Component<ToolbarProps> {

  insertBold = () => {
    const { value, onChange, getCaretPosition, setCaretPosition } = this.props
    const caretPosition = getCaretPosition()
    const [ newValue, inserted ] = insertSymbol(value, caretPosition, [ '**', '**' ])
    onChange({ target: { value: newValue } })
    setTimeout(() => {
      const newPosition = inserted ? caretPosition + 2 : caretPosition - 2
      setCaretPosition(newPosition)
    })
  }

  insertItalics = () => {
    const { value, onChange, getCaretPosition, setCaretPosition } = this.props
    const caretPosition = getCaretPosition()
    const [ newValue, inserted ] = insertSymbol(value, caretPosition, [ '_', '_' ])
    onChange({ target: { value: newValue } })
    setTimeout(() => {
      const newPosition = inserted ? caretPosition + 1 : caretPosition - 1
      setCaretPosition(newPosition)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.insertBold} className={styles.button}>
          <img src={bold} />
        </button>
        <button onClick={this.insertItalics} className={styles.button}>
          <img src={italics} />
        </button>
      </div>
    )
  }
}

export default Toolbar
