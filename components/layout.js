import React from 'react'
import 'tachyons/css/tachyons.css'
import { injectGlobal, hydrate } from 'react-emotion'

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

injectGlobal`
  body {
    position: relative;
    height: 100%;
    font-family: 'Cerebri Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Microsoft Yahei', sans-serif;
    font-feature-settings: 'liga' 1, 'dlig' 1, 'lnum' 1, 'ordn' 1, 'halt' 1, 'kern' 1, 'kern';
    text-rendering: optimizeLegibility;
    word-break: break-word;
    word-wrap: break-word;
    -webkit-font-kerning: normal;
    font-kerning: normal;
    -moz-font-feature-settings: 'kern';
    -webkit-font-feature-settings: 'kern';
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    min-height: 100vh;
    color: white;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }
`

const Layout = ({ children }) => (
  <div className='relative min-vh-100 bg-near-black'>
    {children}
  </div>
)

export default Layout
