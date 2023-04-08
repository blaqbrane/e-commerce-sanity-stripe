import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'
import { Navbar,HeroBanner,Product,Footer,FooterBanner,Cart,Layout } from '../components'
export const client = createClient({
  projectId:"uzxvk588",
  dataset: "production",
  apiVersion: "2023-04-07",
  useCdn:false
});
const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
  return(
    builder.image(source)
  )
}

const Home = ({products,bannerData}) => {

  return (
    <>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
    <div className="products-heading">
      <h2>Best selling Products</h2>
      <p>Speaaker of Different variation</p>
    </div>
    <div className="products-container">
      {products?.map((product) => (
        <Product key={product._id} product={product}/>
      ))}
    </div>
    <FooterBanner footerBanner={bannerData.length && bannerData[0]}/>
    </>
  )
}
export default Home;

export const getServerSideProps = async() => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery)
  return {
    props: {products, bannerData}
  }
}
