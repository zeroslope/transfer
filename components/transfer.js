import React, { Component } from 'react'
import Link from 'next/link'
import { css } from 'react-emotion' // eslint-disable-line
import { Motion, spring, presets } from 'react-motion'
import { getElementOffset } from '../utils/utils.js'

import { SmallSpace, MediumSpace } from '../components/styledComponent'

import First from '../assets/svg/first.svg'
import Second from '../assets/svg/second.svg'
import Third from '../assets/svg/third.svg'

class Transfer extends Component {
  constructor () {
    super()
    this.r3 = null
    this.data = {
      top: 0
    }
  }
  componentDidMount () {
    let top = getElementOffset(this.r3).top
    this.data = {
      top
    }
  }
  getWidth () {
    let { scroll, height } = this.props
    let { top } = this.data
    if (scroll > top) {
      if (scroll > top + height) {
        return 1
      } else {
        return (scroll - top) / height
      }
    } else {
      return 0
    }
  }
  render () {
    let width = this.getWidth() * 100
    return (
      <section className='relative pa1'>
        <div className='center mw9 w-90'>
          <div className='pb2'>
            <h1 className='tc f1 fw7'>Transfer</h1>
            <h2 className='tc f3 fw4'>Transfer the style of one photo to another.</h2>
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
                <span className='f4'>Upload your content photo.</span>
              </div>
              <div className='absolute' css={{
                top: '50%',
                right: '4rem',
                transform: 'translateY(-50%)'
              }}>
                <div css={{
                  width: '20rem',
                  height: '15rem',
                  backgroundImage: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)'
                }} />
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
                <span className='f4'>Upload your style photo.</span>
              </div>
              <div className='absolute' css={{
                top: '50%',
                right: '4rem',
                transform: 'translateY(-50%)'
              }}>
                <div css={{
                  width: '20rem',
                  height: '15rem',
                  backgroundImage: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)'
                }} />
              </div>
            </div>
          </div>
        </div>
        <Motion defaultStyle={{ s: 0 }} style={{ s: spring(width, { ...presets.stiff }) }}>
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
                      right: '64px',
                      transform: 'translateY(-50%)'
                    }}>
                      <div css={{
                        width: '24rem',
                        height: '18rem',
                        backgroundImage: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)'
                      }}>
                        <div style={{
                          width: `${style.s}%`,
                          height: '100%',
                          backgroundImage: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)'
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='vh-100' />
              </div>
              <div className='pa3 tc'>
                <SmallSpace />
                <Link href='/transfer'>
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

export default Transfer
