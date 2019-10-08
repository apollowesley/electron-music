import React, { useState, MouseEvent } from 'react'
import classnames from 'classnames'

import styles from './style.scss'

interface Props {
  children: JSX.Element;
  placement: string; // bottomLeft, bottomCenter, bottomRight, topLeft, topCenter, topRight
  overLay: JSX.Element;
  overLayStyle?: object;
  style?: object;
  className?: string;
}

export default function Dropdown(props: Props): JSX.Element {
  const [showOverLay, setShowOverLay] = useState(false)

  function handleClick(e: MouseEvent): void {
    e.stopPropagation()
    setShowOverLay(true)
  }

  function handleBlur(): void {
    setShowOverLay(false)
  }

  function handleDropdownClick(e: MouseEvent): void {
    e.stopPropagation()
    setShowOverLay(false)
  }

  const dropDownClassName = classnames([
    styles.overLay,
    { [styles.show]: showOverLay },
    { [styles.hidden]: !showOverLay },
    styles[props.placement],
  ])

  return (
    <div
      className={props.className}
      onClick={handleClick}
      onBlur={handleBlur}
      style={props.style}
    >
      {props.children}

      <div
        className={dropDownClassName}
        onClick={handleDropdownClick}
        style={props.overLayStyle}
      >
        {props.overLay}
      </div>
    </div>
  )
}

Dropdown.defaultProps = {
  placement: 'bottomLeft'
}