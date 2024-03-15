import React from 'react';
import { Link, useParams } from 'react-router-dom';
import data from './../assets/data.json'
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../features/cart/cartSlice"

const PizzaDetails = () => {

    const {id} = useParams()
    const dispatch = useDispatch()

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }) 
    }

    return (
        <div className='pt-[70px] h-screen bg-[#eeebeb] flex flex-col gap-10 justify-center items-center'>
            <Link onClick={()=> scrollToTop()} to={`/Home`} className='bg-yellow-300 top-[100px] left-[30px] fixed px-6 py-2 font-bold rounded-md'>Close</Link>
            <div className='relative w-[60%] h-[50%] border-[1px] border-[#0000001c] rounded-full p-5 group'>
                <div className='w-full h-full flex items-center gap-[50px]'>
                    <img src={new URL(`../assets/img/${data[0][id].image}`, import.meta.url).href} className='h-full relative aspect-square rounded-full animate-[spin_100s_linear_infinite]'></img>
                    <div className='flex flex-col gap-6'>
                        <div className='font-bold text-[30px]'>{data[0][id].pizzaName}</div>
                        <div className='text-[18px]'><span className='font-bold'>Ingredients:</span> <br /> {data[0][id].ingredients.join(", ")}</div>
                        <div className='flex flex-col gap-4'>
                            <div className='text-[18px] font-bold rounded-md'>£{data[0][id].price}</div>
                            <button className=' font-bold bg-yellow-300 text-black py-2 w-[140px] text-center rounded-md' onClick={()=> dispatch(addToCart({pizzaName: data[0][id].pizzaName, price: data[0][id].price}))}>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PizzaDetails;