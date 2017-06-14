// @flow

import React from 'react'
import Helmet from 'react-helmet'

import { APP_DESC } from '../../config'

const title = 'Race'

const RacePage = () =>
  <div>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: APP_DESC },
        { name: 'og:title', content: title },
      ]}/>
    <h1>{title}</h1>
  </div>

export default RacePage
