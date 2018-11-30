import React, { Component } from 'react'
import 'tachyons/css/tachyons.css'
import '../assets/css/style.css'
import { hydrate } from 'react-emotion'
// import debounce from 'lodash.debounce'

import Header from './header'

if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

class Layout extends Component {
  constructor () {
    super()
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll (e) {
    this.props.onScroll({
      offset: e.target.scrollTop
    })
  }
  render () {
    let { children } = this.props
    return (
      <div
        className='relative vh-100 overflow-scroll bg-near-black avenir'
        onScroll={this.handleScroll}
      >
        <Header />
        { children }
      </div>
    )
  }
}

export default Layout
