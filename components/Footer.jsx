import React from 'react'
import { AiFillInstagram, AiOutlineTwitter, AiFillFacebook,AiFillLinkedin } from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='footer-container'>
      <p>@2023 Bumia Stores All rights reserved</p>
      <p className='icons'>
        <a href='https://mobile.twitter.com/Blaqbranne' target='blank'>
        <AiOutlineTwitter/>
        </a>
        <a href='https://www.linkedin.com/mwlite/in/peter-ebube-nnamani' target='blank'>
        <AiFillLinkedin/>
        </a>
      
      </p>
    </div>
  )
}

export default Footer
