import Link from 'next/link'
import React from 'react';
import { BsCart4 } from 'react-icons/bs'
import { useContext } from 'react';
import { Context } from '../context/StateContext';
import {Cart} from './'
const Navbar = () => {
  const{cartItems,showCart,setShowCart} = useContext(Context)
  return (
    <div className='navbar-fixed'>
      <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Bumia Stores</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <BsCart4 style={{color:"white"}}/>
        <span className='cart-item-qty'>{cartItems.length}</span>
      </button>
     {showCart &&  <Cart/>}
    </div>
    
    </div>
   
  )
}

export default Navbar
