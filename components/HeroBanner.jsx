import React from 'react'
import Link from 'next/link'
import { urlFor } from '../pages'
const HeroBanner = ({heroBanner:{smallText,midText,largeText1,image,buttonText,product,desc}}) => {
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'> {smallText}</p>
            <h3>{midText}</h3>
            <h1>{largeText1}</h1>
            <img src={urlFor(image && image)} className='hero-banner-image' alt='logo'/>
        </div>
        <div>
            <Link href={`/product/${product}`}>
                <button type='button'>{buttonText}</button>
            </Link>
        </div>
        <div className='desc'>
            <h5>Description</h5>
            <p>{desc}</p>
        </div>
    </div>
  )
}

export default HeroBanner
