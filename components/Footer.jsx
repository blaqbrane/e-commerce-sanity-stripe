import React from 'react'
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook } from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='footer-container'>
      <p>@2023 Bumia Stores All rights reserved</p>
      <p className='icons'>
        <AiOutlineTwitter/>
        <AiFillInstagram/>
        <AiFillFacebook/>
      </p>
    </div>
  )
}

export default Footer
