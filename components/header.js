import React from 'react'
import Link from 'next/link'
// import styled, { css } from 'react-emotion'

import Logo from '../assets/svg/logo.svg'

const Header = () => (
  <div className='absolute top-0 left-0 right-0 z-2 bg-black flex flex-auto items-center justify-between shadow-3'>
    <div className='pa2 ml2'>
      <Logo width='56' height='56' />
    </div>
    <div className='mr2 tracked'>
      <Link href='/redraw'>
        <a className='link white ph4 pv2'>Redraw</a>
      </Link>
      <Link href='/transfer'>
        <a className='link white ph4 pv2'>Transfer</a>
      </Link>
    </div>
  </div>
)

export default Header
