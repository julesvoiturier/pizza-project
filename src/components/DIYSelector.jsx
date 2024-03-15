import React from 'react';

const DIYSelector = (props) => {

    const selector = (e, ingredient) => {
        e.target.classList.toggle("bg-[#ff6146]");

        if (props.ingredients.length === 0) {
            props.setIngredients(prevIngredients => [...prevIngredients, ingredient.ingredientName]);
            props.setPrice(prevPrice => prevPrice + ingredient.price);
        } else {
            if (props.ingredients.includes(ingredient.ingredientName)) {
                props.setIngredients(prevIngredients => prevIngredients.filter(item => item !== ingredient.ingredientName));
                props.setPrice(prevPrice => prevPrice - ingredient.price);
            } else {
                props.setIngredients(prevIngredients => [...prevIngredients, ingredient.ingredientName]);
                props.setPrice(prevPrice => prevPrice + ingredient.price);
            }
        }
    };

    return (
        <div className='w-[25%] rounded-lg h-full bg-[#2d100b] p-2 flex flex-col gap-2'>
            {
                props.ingredientsData.map((ingredient, key)=> {
                    return(
                        <div className='bg-[#624945] transition-all rounded-md hover:bg-[#866863]'>
                            <button onClick={(e)=> {selector(e, ingredient); props.setActive(true)}} 
                            className={`w-full py-2 px-3 text-white text-left rounded-md flex transition-all justify-between ${props.active == false ? 'bg-none':''}`}>
                            <div className='pointer-events-none'>{ingredient.ingredientName}</div>
                            {ingredient.price != 0 ? <div className='pointer-events-none'>£{ingredient.price}</div> : null}
                            </button>
                        </div>
                        
                    )
                })
            }
        </div>
    );
}

export default DIYSelector;
