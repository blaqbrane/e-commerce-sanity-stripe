import React from 'react'
import { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus,AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline} from 'react-icons/ti';
import { BsCart4 } from 'react-icons/bs'
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { Context } from '../context/StateContext';
import { urlFor } from '../pages';
import getStripe from '../library/getStripe';
const Cart = () => {
  const cartRef = useRef()
  const{cartItems, setShowCart,totalPrice, totalQty, toggleDecreaseItem,toggleIcreaseItem,removeCartItem} = useContext(Context)

  const handlePayment = async() =>{
    const stripe = await getStripe();
       // we want to make a post request to (/api/stripe) and then pass the cartItems(items in the cart)
    const response = await fetch('/api/stripe',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(cartItems)
    })
    if(response.statusCode === 500) return;
    const data = await response.json();
    toast.loading('Redirecting...');
    stripe.redirectToCheckout({ sessionId: data.id});
  }
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQty} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <BsCart4 size={150}/>
            <h3>Your Shopping Cart is Empty</h3>
            <Link href='/'>
                <button type='button' onClick={() => setShowCart(false)} className='btn'>
                  Add Items
                </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) =>(
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} alt='cart-img' className='cart-product-image'/>
              <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>{item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleDecreaseItem(item._id)}><AiOutlineMinus/></span>
                      <span className='num' >{item.quantity}</span>
                      <span className='plus' onClick={() => toggleIcreaseItem(item._id)}><AiOutlinePlus/></span>
                    </p>
                    </div>
                    <button type='button' className='remove-item' onClick={() => removeCartItem(item._id)}>
                      <TiDeleteOutline/>
                    </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>SubTotal:</h3>
              <h3>${totalPrice}</h3>

            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handlePayment}>
                Pay with Stripe
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
