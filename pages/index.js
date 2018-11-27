import React from 'react'
import { hydrate } from 'react-emotion'

import Layout from '../components/layout'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

export default () => {
  return (
    <Layout>
      <div>Hello World!</div>
    </Layout>
  )
}
