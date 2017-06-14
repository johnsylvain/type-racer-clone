// @flow

import React from 'react'

type Props = {
  title: string,
  tagline: string,
}

const Header = ({ title, tagline }: Props) =>
  <header>
    <div className="container">
      <h1>{title}</h1>
      <p className="tagline">{tagline}</p>
    </div>
  </header>

export default Header
