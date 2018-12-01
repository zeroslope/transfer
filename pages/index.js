import React, { Component } from 'react'
import Link from 'next/link'
import styled, { hydrate, css, cx } from 'react-emotion'  // eslint-disable-line

import Layout from '../components/layout'
import Redraw from '../components/redraw'
import Transfer from '../components/transfer'

import { SmallSpace, MediumSpace } from '../components/styledComponent'

import Logo from '../assets/svg/transfer.svg'
import Arrow from '../assets/svg/arrow.svg'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

const IntroItem = ({ name, description, href }) => {
  return (
    <div className='flex flex-column justify-between ba br2 pa2'
      css={`
        @media (max-width: 768px) {
          flex: 1 100%;
          margin: auto;
          margin-bottom: 20px;
          max-width: 600px;
        }
        @media (min-width: 769px) {
          flex: 0 0 calc((100% - 80px) / 4);
          min-width: 19rem;
        }
      `}
    >
      <h2 className='tc f2 mb0'>{name}</h2>
      <p className='f5 pa2'>{description}</p>
      <Link href={href}>
        <div className='tc pa2'>
          <a className='ph4 pv2 link f4 white'>Start</a>
          <Arrow />
        </div>
      </Link>
    </div>
  )
}

export default class Index extends Component {
  constructor () {
    super()
    this.state = {
      height: 1,
      scroll: 0,
      scrollFixed: 0
    }
    this.onScroll = this.onScroll.bind(this)
  }
  onScroll ({ offset }) {
    this.setState({
      scroll: offset
    })
  }
  componentDidMount () {
    const height = typeof window !== 'undefined' ? window.innerHeight : 1
    this.setState({
      height
    })
  }
  render () {
    return (
      <Layout onScroll={this.onScroll}>
        <section className='relative vh-100 pa1' css={{
          paddingTop: '76px',
          minHeight: '40rem',
          maxHeight: '64rem'
        }}>
          <div className='h-100 flex flex-auto'>
            <div className='relative w-70 h-100 bg-yellow flex flex-auto flex-column items-center justify-center'>
              <div className='tc'>
                <Logo width='288' height='320' />
              </div>
              <div className='center f3 lh-solid black b tracked' css={{
                width: 'max-content'
              }}>
                <p>Choose your content and style.</p>
                <p>Upload them, wait a minute.</p>
                <p>Enjoy your creation!</p>
              </div>
            </div>
            <div className='relative w-30 h-100 bg-near-black'>
              <div className='absolute lh-title tracked' css={{
                fontFamily: 'Jenna',
                color: '#E7040F',
                marginLeft: '-5rem',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                textStroke: '1px black',
                top: '45%'
              }}>
                <p className='f-headline ma0'>Image</p>
                <p className='f-headline ma0'>Style Transfer</p>
              </div>
            </div>
          </div>
        </section>

        <section className='relative pa1' css={{
          minHeight: '40rem'
        }}>
          <div className='center mw9 w-90 h-100'>
            <SmallSpace />
            <h1 className='tc f1'>What can you do with Transfer?</h1>
            <SmallSpace />
            <div className='mb4 flex items-center justify-around items-center flex-wrap'>
              <IntroItem
                name='Redraw'
                description='Let famous artist redraw your photos. '
                href='/redraw'
              />
              <IntroItem
                name='Transfer'
                description='Transfer the style of one photo to another.'
                href='/transfer'
              />
            </div>
            <MediumSpace />
          </div>
        </section>

        <Redraw scroll={this.state.scroll} height={this.state.height} />

        <Transfer scroll={this.state.scroll} height={this.state.height} />

      </Layout>
    )
  }
}
