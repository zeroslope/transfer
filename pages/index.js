import React, { Component } from 'react'
import Link from 'next/link'
import styled, { hydrate, css, cx } from 'react-emotion'
import { Motion, spring } from 'react-motion'

import Layout from '../components/layout'

import Transfer from '../assets/svg/transfer.svg'
import Arrow from '../assets/svg/arrow.svg'

import First from '../assets/svg/first.svg'
import Second from '../assets/svg/second.svg'
import Third from '../assets/svg/third.svg'

import R1 from '../assets/svg/R1.svg'
import R2 from '../assets/svg/R2.svg'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

const SmallSpace = styled.div`
  height: 3rem;
  width: 100%;
`

const MediumSpace = styled.div`
  height: 8rem;
  width: 100%;
`

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

function getElementOffset (el) {
  let top = 0
  let left = 0

  // grab the offset of the element relative to it's parent,
  // then repeat with the parent relative to it's parent,
  // ... until we reach an element without parents.
  do {
    top += el.offsetTop
    left += el.offsetLeft
    el = el.offsetParent
  } while (el)

  return { top, left }
}

class Redraw extends Component {
  constructor () {
    super()
    this.r3 = null
    this.data = {
      top: 0,
      height: 0,
      width: 0
    }
  }
  componentDidMount () {
    let top = getElementOffset(this.r3).top
    this.data = {
      height: this.r3.offsetHeight,
      width: this.r3.offsetWidth,
      top
    }
  }
  getLeft () {
    let scroll = this.props.scroll
    let { top, height, width } = this.data
    width = width * 0.9
    if (scroll > top) {
      if (scroll > top + height) {
        return (width - 128) * 0.25
      } else {
        return (scroll - top) / height * (width - 128) * 0.25
      }
    } else {
      return 0
    }
  }
  render () {
    let divLeft = this.getLeft()
    // console.log(this.props)
    return (
      <Motion defaultStyle={{ s: 0 }} style={{ s: spring(divLeft) }}>
        { style => (
          <div className='relative'>
            <div className='center mw9 w-90'>
              <div className='flex flex-auto vh-100'
                ref={div => { this.r3 = div }}
                css={{
                  minHeight: '48rem'
                }}
                style={{
                  position: 'sticky',
                  top: '0px'
                }}
              >
                <div className='relative w-10 h-100 br'>
                  <Third width='48' height='48' className='absolute right-0' css={{
                    top: '25%',
                    transform: 'translateY(-50%)'
                  }} />
                </div>
                <div className='relative w-90 h-100'>
                  <div className='absolute left-0 ml3' css={{
                    top: '25%',
                    transform: 'translateY(-50%)'
                  }}>
                    <span className='f4'>Enjoy!</span>
                  </div>
                  <div className='absolute' style={{
                    top: `50%`,
                    right: `${64 + style.s}px`,
                    transform: 'translateY(-50%)',
                    willChange: 'right'
                  }}>
                    <R2 width='240' />
                  </div>
                  <div className='absolute' style={{
                    top: `50%`,
                    left: `${64 + style.s}px`,
                    transform: 'translateY(-50%)',
                    willChange: 'transform'
                  }}>
                    <R2 width='240' />
                  </div>
                </div>
              </div>
              <div className='vh-100 tr' />

            </div>
          </div>)
        }
      </Motion>
    )
  }
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
          <div className='center mw9 h-100 flex flex-auto'>
            <div className='relative w-70 h-100 bg-yellow flex flex-auto flex-column items-center justify-center'>
              <div className='tc'>
                <Transfer width='288' height='320' />
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

        <section className='relative overflow-hidden'>
          <div className='center mw9 w-90'>
            <div className='pb2'>
              <h1 className='tc f1 fw7'>Redraw</h1>
              <h2 className='tc f3 fw4'>Let famous artist redraw your photos.</h2>
            </div>
            <div className='flex vh-50' css={{
              minHeight: '40rem'
            }}>
              <div className='relative w-10 h-100 br'>
                <First width='48' height='48' className='absolute right-0' css={{
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
              </div>
              <div className='relative w-90 h-100'>
                <div className='absolute left-0 ml3' css={{
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}>
                  <span className='f4'>Pick your favorite style.</span>
                </div>
                <div className='absolute' css={{
                  top: '50%',
                  right: '4rem',
                  transform: 'translateY(-50%)'
                }}>
                  <R1 width='320' />
                </div>
              </div>
            </div>

            <div className='flex vh-50' css={{
              minHeight: '40rem'
            }}>
              <div className='relative w-10 h-100 br'>
                <Second width='48' height='48' className='absolute right-0' css={{
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
              </div>
              <div className='relative w-90 h-100'>
                <div className='absolute left-0 ml3' css={{
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}>
                  <span className='f4'>Upload your photo.</span>
                </div>
                <div className='absolute' css={{
                  top: '50%',
                  right: '4rem',
                  transform: 'translateY(-50%)'
                }}>
                  <R2 width='240' />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Redraw scroll={this.state.scroll} />

        <section className='vh-100' />
        <section className='vh-100' />
      </Layout>
    )
  }
}
