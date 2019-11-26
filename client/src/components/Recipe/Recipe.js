import React from 'react';

const Recipe = (props) => {
    let recipe = JSON.parse(props.location.singleRecipe);
    console.log('Single recipe', props.location.singleRecipe);
    console.log(props);
    return (
        <div>
            {/* <h1>{ recipe.title }</h1> */}
            <h2>{ recipe.title }</h2>
        </div>
    );
};

export default Recipe;