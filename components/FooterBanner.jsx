import Link from 'next/link'
import React from 'react'
import { urlFor } from '../pages'
const FooterBanner = ({footerBanner:{largeText2,saletime,discount,smallText,midText,largeText1,image,buttonText,product,desc}}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
            <p>{discount}</p>
            <h3>{largeText1}</h3>
            <h3>{largeText2}</h3>
            <p>{saletime}</p>
        </div>
        <div className='right'>
            <p>{smallText}</p>
            <h3>{midText}</h3>
            <p>{desc}</p>
            <Link href={`/product/`}>
                <button type='button'>
                    {buttonText}
                </button>
            </Link>

        </div>
        <img src={urlFor(image && image)} alt='footerimg' className='footer-banner-image'/>
      </div>
    </div>
  )
}

export default FooterBanner
