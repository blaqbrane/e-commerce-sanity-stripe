import React, { useState } from 'react'
import { urlFor} from '..';
import { createClient } from 'next-sanity';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar,AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components'
import { useContext } from 'react';
import { Context } from '../../context/StateContext'

const client = createClient({
    projectId:"uzxvk588",
    dataset: "production",
    apiVersion: "2023-04-07",
    useCdn:true
  });
  

const ProductDetails= ({product,products}) => {
    const { image,details,name,price} = product
    const[currentIndex, setCurrentIndex] = useState(0);

    const{IncreaseQty,DecreaseQty,qty, AddToCart,setShowCart} = useContext(Context)

    const buyNow = () =>{
      AddToCart(product,qty)
      setShowCart(true)
    }
  return (
    <div style={{marginTop:"65px"}}>
      <div className='product-detail-container'>
        <div>
            <div className='image-container'>
                <img src={urlFor(image && image[currentIndex])} alt='product' className='product-detail-image'/>
            </div>
            <div className='small-images-container'>
              {image?.map((item,index) =>(
                <img key={index} src={urlFor(item) } alt="imagess" onMouseEnter={() => setCurrentIndex(index)} className={index === currentIndex ? "small-image selected-image":"small-image"}/>
              ))}
            </div>

        </div>
        <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
                <div>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiFillStar/>
                  <AiOutlineStar/>
                </div>
                <p>(24)</p>
            </div>
            <h4>Details: </h4>
            <p>{details}</p>
            <p className='price'>${price}</p>
            <div className='quantity'>
              <h3>Quantity:</h3>
              <p className='quantity-desc'>
                <span className='minus' onClick={DecreaseQty}><AiOutlineMinus/></span>
                <span className='num' >{qty}</span>
                <span className='plus' onClick={IncreaseQty}><AiOutlinePlus/></span>
              </p>
            </div>
            <div  className='buttons'>
              <button type='button' className='add-to-cart' onClick={() => AddToCart(product,qty)}>Add To Cart</button>
              <button type='button' className='buy-now' onClick={buyNow}>Buy Now</button>
            </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee '>
              <div className='maylike-products-container track'>
                  {products.map((item) =>(
                    <Product key={item._id} product={item}/>
                  ))}
              </div>
            </div>
      </div>
    </div>
  )
}
 export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug{
            current
        }
    }`
    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback:"blocking"
    }
 }

 export const getStaticProps = async({params:{slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`
    //For similar product
    const productQuery = '*[_type == "product"]'
    //Fetching individual product
    const product = await client.fetch(query)
    const products = await client.fetch(productQuery)

    //Fetching for related products

  
    
    return {
      props: {product, products}
    }
  }

export default ProductDetails;

