import React from 'react'
import { hydrate, css } from 'react-emotion'

import Transfer from '../assets/svg/transfer.svg'
import Layout from '../components/layout'

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

export default () => {
  return (
    <Layout>
      <section className='min-vh-100 vh-100 overflow-hidden' css={{
        paddingTop: '76px',
        minHeight: '40rem'
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
    </Layout>
  )
}
