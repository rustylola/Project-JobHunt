import React, { useState } from 'react'
import logo from '../assets/images/logo1.svg';
import logolight from '../assets/images/logo1.svg';
import { checkDefaultTheme } from '../App'

const Logo = () => {
  return <img src={logo} alt='jobhunt' className='logo' />
}

export default Logo
