import React from 'react'
import 'tachyons/css/tachyons.css'
import '../assets/css/style.css'
import { hydrate } from 'react-emotion'

import Header from './header'

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

const Layout = ({ children }) => (
  <div className='relative min-vh-100 bg-near-black avenir'>
    <Header />
    {children}
  </div>
)

export default Layout
