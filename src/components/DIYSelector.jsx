import React from 'react';

const DIYSelector = (props) => {
    return (
        <div className='w-[25%] rounded-lg h-full bg-[#2d100b] p-2 flex flex-col gap-2'>
            {
                props.ingredientsData.map((ingredient, key)=> {
                    return(
                        <button onClick={()=> {
                            props.setIngredients(prevIngredients => [...prevIngredients, ingredient.ingredientName])
                            props.setPrice(props.price + ingredient.price)
                        }} 
                        className='w-full py-2 px-3 bg-[#fffefe22] text-white text-left rounded-md flex justify-between'>
                            <div className=''>{ingredient.ingredientName}</div>
                            {ingredient.price != 0 ? <div className=''>£{ingredient.price}</div> : null}
                        </button>
                    )
                })
            }
        </div>
    );
}

export default DIYSelector;
