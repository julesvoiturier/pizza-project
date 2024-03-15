import React, {useState, useRef} from 'react';
import data from './../assets/data.json'
import { Link } from 'react-router-dom';
import DIYSelector from './DIYSelector';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteLast } from "../features/cart/cartSlice"

const DIY = () => {

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cartContent)

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }) 
    }

    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [customPrice, setCustomPrice] = useState(4)
    const [diyPizzaName, setDiyPizzaName] = useState("")
    const [validDiy, setValidDiy] = useState(true)

    const  logTest = () => {
        console.log(selectedIngredients);
        console.log(customPrice);
    }

    const resetCustom = () => {
        setSelectedIngredients([])
        setCustomPrice(4)
        setDiyPizzaName("")
    }

    const inputRef = useRef(null)
    const sendCustomPizza = () => {
        if (diyPizzaName != "") {
            setValidDiy(true)
            inputRef.current.value = ""
            if (cart.length == 0) {
                if (selectedIngredients.length == 0) {
                    dispatch(addToCart({pizzaName: diyPizzaName, quantity: 1, ingredients: ["Dough only"], price: customPrice}))
                } else {
                    dispatch(addToCart({pizzaName: diyPizzaName, quantity: 1, ingredients: selectedIngredients, price: customPrice}))
                }
            } else {
                cart.map((element, key)=> {
                    element.pizzaName == diyPizzaName ? null : dispatch(addToCart({pizzaName: diyPizzaName, quantity: 1, ingredients: selectedIngredients, price: customPrice}))
                })
            }
        } else {
            setValidDiy(false)
        }
    }

    return (
        <div className='pt-[70px] h-screen bg-[#eeebeb] flex flex-col gap-10 justify-center items-center'>
            <Link onClick={()=> scrollToTop()} to={`/Home`} className='bg-yellow-300 top-[100px] left-[30px] fixed px-6 py-2 font-bold rounded-md'>Close</Link>
            <div className='flex flex-col items-center'>
                <div className=' px-4 py-2 font-bold w-fit text-[#ff6146] text-[40px]'>Make your own pizza!</div>
                <div className='font-bold mt-2 w-fit text-[18px]'>Select toppings:</div>
            </div>
            <div className='relative w-[60%] h-[50%] border-[1px] border-[#0000001c] rounded-md p-10 flex flex-nowrap gap-4'>
                {
                    data[1].map((element, key)=> {
                        return(
                            <DIYSelector 
                            ingredientsData={element} 
                            setIngredients={setSelectedIngredients} 
                            ingredients={selectedIngredients} 
                            setPrice={setCustomPrice}
                            price={customPrice}
                            />
                        )
                    })
                }
            </div>
            <div className='flex gap-5'>
                <input ref={inputRef} onChange={(e)=> setDiyPizzaName(e.target.value)} 
                className={`${validDiy == true ? '' : 'border-2 border-[#ff6146] animate-[pulse_0.2s_ease-in-out_2] '} px-4 rounded-md outline-[#3f10082e] w-[300px]`} type="text" placeholder="Name your pizza" />
                <div className='flex justify-center items-center gap-3 bg-[#0000001c] p-2 rounded-md'>
                        <div className='px-4 font-bold text-[20px]'>£{customPrice}</div>
                        <button onClick={()=> {
                        sendCustomPizza()
                        resetCustom()
                        }} className='bg-yellow-300 px-4 py-2 rounded-md font-bold'>Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default DIY;
