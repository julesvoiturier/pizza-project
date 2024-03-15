import React, { useState, useEffect } from 'react';
import data from './../assets/data.json'
import PizzaCard from './PizzaCard';
import { useDispatch, useSelector } from "react-redux"
import { cartToggle } from "../features/toggle/toggleSlice"
import Filter from './Filter';
import DIY from './DIY';

const Home = () => {

    const openCart = useSelector((state) => state.toggle.cartToggle)
    const openFilter = useSelector((state) => state.toggle.filterToggle)
    const base = useSelector((state) => state.filter.base)
    const price = useSelector((state) => state.filter.price)
    const dispatch = useDispatch()

    const sortedDataLowest = [...data[0]].sort((a, b) => a.price - b.price);
    const sortedDataHighest = [...data[0]].sort((a, b) => b.price - a.price);
    const [sortedData, setSortedData] = useState(data[0])

    useEffect(() => {
        if (price == "All") {
            setSortedData(data[0])
        } else if (price == "Lowest") {
            setSortedData(sortedDataLowest)
        } else if (price == "Highest") {
            setSortedData(sortedDataHighest)
        }
    }, [price]);

    return (
        <div onClick={()=> openCart == true ? dispatch(cartToggle()) : ""} className={`${openCart == true ? `brightness-[30%]` : `brightness-[100%]`} transition-all w-full flex flex-col justify-center items-center py-[70px] bg-[#eeebeb]`}>
            <div></div>
            <div className='w-[65.5%]'>
                <Filter/>
            </div>
            <div className='pt-[35px] flex flex-wrap gap-5 w-[70%] justify-center'>
                {
                    sortedData.map((pizza, key) => {
                        const currentKey = key
                        return(
                           base == pizza.ingredients[0] || base == "All" ?
                            <PizzaCard pizzaName={pizza.pizzaName} currentKey={currentKey} price={pizza.price} image={pizza.image}/> : null
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Home;