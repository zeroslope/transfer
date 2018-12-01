import React, { Component } from 'react'
import Link from 'next/link'
import { css } from 'react-emotion' // eslint-disable-line
import { Motion, spring, presets } from 'react-motion'
import { getElementOffset } from '../utils/utils.js'

import { SmallSpace, MediumSpace } from '../components/styledComponent'

import R1 from '../assets/svg/R1.svg'
import R2 from '../assets/svg/R2.svg'

import First from '../assets/svg/first.svg'
import Second from '../assets/svg/second.svg'
import Third from '../assets/svg/third.svg'

class Redraw extends Component {
  constructor () {
    super()
    this.r3 = null
    this.data = {
      top: 0,
      width: 0
    }
  }
  componentDidMount () {
    let top = getElementOffset(this.r3).top
    let { width } = this.r3.getBoundingClientRect()
    this.data = {
      width: Math.floor(width * 0.9),
      top
    }
  }
  getLeft () {
    let { scroll, height } = this.props
    let { top, width } = this.data
    if (scroll > top) {
      if (scroll > top + height) {
        return (width - 128 - 240) * 0.5
      } else {
        return (scroll - top) / height * (width - 128 - 240) * 0.5
      }
    } else {
      return 0
    }
  }
  render () {
    let divLeft = this.getLeft()
    return (
      <section className='relative pa1'>
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
        <Motion defaultStyle={{ s: 0 }} style={{ s: spring(divLeft, { ...presets.stiff }) }}>
          { style => (
            <div className='relative center mw9 w-90'>
              <div>
                <div className='flex flex-auto vh-100'
                  ref={div => { this.r3 = div }}
                  css={{
                    minHeight: '48rem',
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
                <div className='vh-100' />
              </div>
              <div className='pa3 tc'>
                <SmallSpace />
                <Link href='/redraw'>
                  <a className='ba pv2 ph4 f6 white link bg-animate hover-black hover-bg-white b'>Try it now</a>
                </Link>
                <MediumSpace />
              </div>
            </div>
          )}
        </Motion>
      </section>
    )
  }
}

export default Redraw
