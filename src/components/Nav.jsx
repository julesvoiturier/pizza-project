import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { cartToggle } from "../features/toggle/toggleSlice"
import { Link } from 'react-router-dom';

const Nav = () => {

    const dispatch = useDispatch()
    const lastAdded = useSelector((state) => state.cart.lastTwoAdded)
    const openCart = useSelector((state) => state.toggle.cartToggle)
    const counter = useSelector((state) => state.cart.counter)
    const cart = useSelector((state) => state.cart.cartContent)

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }) 
    }


    return (
        <div className='w-full h-[70px] bg-[#ff6146] fixed flex justify-between px-8 z-20'>
            <div className='h-full flex items-center'>
                <Link to={`/Home`} onClick={()=> scrollToTop()} className='text-white font-bold text-[20px]'>Pizza di Mama</Link>
            </div>
            <div className='flex items-center gap-2 group'>
                <Link to={`/Home/MakeYourPizza`} onClick={()=> scrollToTop()} className='bg-yellow-300 font-bold px-6 py-2 rounded-md'>Custom pizza</Link>
                <button onClick={()=> dispatch(cartToggle())} className='group bg-white px-6 py-2 rounded-md font-bold relative'>Cart
                    <div className={`${counter < 1 ? 'hidden':'visible'} absolute text-[12px] flex justify-center items-center size-[25px] bg-yellow-300 font-medium rounded-full top-[-10px] right-[-10px]`}>{counter}</div>
                </button>
                <div className={`${openCart == true ? 'hidden':''} absolute right-[30px] top-[100px] rounded-md bg-[#2d100b] text-white w-[200px] h-auto transition-all opacity-0 lg:group-hover:opacity-100 p-4 flex flex-col`}>
                    <div className='font-bold'>Last adds:</div>

                    {
                        lastAdded.length > 0 ? 
                        <div className='w-full flex flex-col'>
                            {
                                cart.map((element, key)=> {
                                    let value 
                                    element.pizzaName == lastAdded[lastAdded.length-2] ? value = 2 : null
                                    element.pizzaName == lastAdded[lastAdded.length-1] ? value = 1 : null
                                    return(
                                        element.pizzaName == lastAdded[lastAdded.length-value] ? <div>{lastAdded[lastAdded.length-value]}</div>: null
                                    )
                                })
                            }
                        </div> : null
                    }

                </div>
            </div>
        </div>
    );
}
export default Nav;