// @flow

import React from 'react'
import Helmet from 'react-helmet'

const title = 'Page not found'

const NotFoundPage = () =>
  <div>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'A page to say hello' },
        { name: 'og:title', content: title },
      ]}/>
    <h1>{title}</h1>
  </div>

export default NotFoundPage
