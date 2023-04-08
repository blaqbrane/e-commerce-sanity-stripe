import React from "react";
import { createContext,useContext,useState,useEffect } from "react";
import { toast } from "react-hot-toast";
import product from "../snow-seahorse/schemas/product";

export const Context = createContext();

export const StateContext = ({ children }) => {

    const[showCart, setShowCart] = useState(false);
    const[cartItems, setCartItems] = useState([])
    const[totalPrice, setTotalPrice] = useState(0);
    const[totalQty, setTotalQty] = useState(0);
    const[qty, setQty] = useState(1);
    let foundProduct;
    let index;

    const AddToCart = (product, quantity) =>{
        // if(cartItems.indexOf(product) !== -1) return;
        // return setCartItems([...cartItems,product])

        
        const checkInCart = cartItems.find((item) => item.details === product.details);
        setTotalPrice(prevTprice => prevTprice + (product.price * quantity));
        setTotalQty(prevTotalQty => prevTotalQty + quantity)
        //For item that already exist in the cart 
        if(checkInCart){
            
            const updatedCartItems = cartItems.map((cartProduct) =>{
                if(cartProduct._id === product._id) return{

                    ...cartProduct , quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems)
            toast.success(`${qty} ${product.name} already added to the cart.`)
        }
        //For item that is not in the cart 
        else{
           product.quantity = quantity
           setCartItems([...cartItems, {...product}]) 
           toast.success(`${qty} ${product.name} added to the cart.`)
        }return
       

    }
    
    const toggleIcreaseItem =(id)=>{
        foundProduct = cartItems.find((item) => item._id === id);
        setCartItems((prevstate) =>{
            return prevstate.map((item) => {
                return item._id === id ? {...item, quantity:item.quantity + 1} : item
            })
        })
        setTotalPrice(prevTprice => prevTprice + foundProduct.price);
        setTotalQty(prevTqty => prevTqty + 1)
    }

    const toggleDecreaseItem = (id) =>{
        foundProduct = cartItems.find((item) => item._id === id);
        if(foundProduct.quantity > 1){
            setCartItems((prevstate) =>{
                return prevstate.map((item) => {
                    return item._id === id ? {...item, quantity:item.quantity - 1} : item
                })
            })
            setTotalPrice(prevTprice => prevTprice - foundProduct.price);
            setTotalQty(prevTqty => prevTqty - 1)
        }else{
            removeCartItem(id)
        }
    }

    const removeCartItem =(id)=>{
        foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(newCartItems) 
        setTotalPrice((prevTprice) => prevTprice - (foundProduct.price * foundProduct.quantity)) 
        setTotalQty((prevTqty) => prevTqty - foundProduct.quantity)
    }
  
    const IncreaseQty = () =>{
        setQty(prevqty => prevqty + 1)
    }
    const DecreaseQty = () =>{
        setQty(prevqty => {
           if(prevqty - 1 < 1) return 1;
           return prevqty - 1
        })
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])
    return(
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQty,
            qty,
            setShowCart,
            setCartItems,
            setTotalPrice,
            setTotalQty,
            IncreaseQty,
            DecreaseQty,
            AddToCart,
            toggleDecreaseItem,
            toggleIcreaseItem,
            removeCartItem,
        }}>
            {children}
        </Context.Provider>
    )
}