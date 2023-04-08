import React from 'react'
import { useState,useEffect, useContext} from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { Context } from '../context/StateContext';
import { runFireWorks } from '../library/utils';
const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQty} = useContext(Context)

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQty(0);
        runFireWorks()
    }, [])
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your Order!</h2>
            <p className='email-msg'>Check your email for the your receipt.</p>
            <p className='description'>
                If you have any question, please email 
                <a className='email' href='mailto:nnamanipeter58@gmail.com'>
                    nnamanipeter58@gmail.com
                </a>
            </p>
            <Link href='/'>
                <button type='button' width='10px' className='btn'>
                    Continue Shopping
                </button>
            </Link>
        </div>
      
    </div>
  )
}

export default Success;
