import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';
import fetch from 'cross-fetch';


export const addComment = (comment) => {
    return({
        type: ActionTypes.ADD_COMMENT,
        payload: comment
    });
}

export const postComment = (dishId, rating, author, comment) => (dispatch) =>
{
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseURL + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else {
            var error = new Error( `Error ${response.status} : ${response.statusText}`);
            error.response = response;
            throw error;
        }},
        error => {throw error;})
    .then(data => data.json())
    .then(data => dispatch(addComment(data)))
    .catch( error => {
        console.log(`Error: ${error}`);
        alert(`Your Comment Wasn't Post - Error: ${error}`);
    });
}

// Dishes
export const fetchDishes = () => (dispatch) => {
    //Thunk function
    console.log("fetch dishes");
    dispatch(dishesLoading(true));
    fetch(baseURL + 'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                
                var error = new Error(`Error ${response.status} : ${response.statusText}`);
                error.response = response;
                throw error;
            }
        })
        .then(result => result.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch( error => {console.log("error");
        dispatch(failedDishes(error.message))});
    
}

export const dishesLoading = ()  => {
    return({
        type:ActionTypes.DISHES_LOADING
    })
}

export const addDishes = (dishes)  => {
    return({
        type:ActionTypes.ADD_DISHES,
        payload: dishes
    })
}

export const failedDishes = (errmess) => {
    return({
        type: ActionTypes.DISHES_FAILED,
        payload: errmess 
    })
}

//Comments
export const fetchComments = () => (dispatch) => {
    //Thunk
    fetch(baseURL + 'comments')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error(`Error ${response.status} : ${response.statusText}`);
                error.response = response;
                throw error;
            }
        })
        .then(result => result.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(failedComments(error.message)));
    
}

export const addComments = (comments)  => {
    return({
        type:ActionTypes.ADD_COMMENTS,
        payload: comments
    })
}

export const failedComments = (errmess) => {
    return({
        type: ActionTypes.FAILED_COMMENTS,
        payload: errmess 
    })
}

// Promos
export const fetchPromos = () => (dispatch) => {
    //Thunk function
    dispatch(promosLoading(true));
    fetch(baseURL + 'promotions')
        .then(response => {
                if(response.ok){
                    return response;
                }
                else{
                    var error = new Error(`Error ${response.status} : ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            })
        .then(result => result.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(failedPromos(error.message)));
    
}

export const promosLoading = ()  => {
    return({
        type:ActionTypes.PROMOS_LOADING
    })
}

export const addPromos = (promos)  => {
    return({
        type:ActionTypes.ADD_PROMOS,
        payload: promos
    })
}

export const failedPromos = (errmess) => {
    return({
        type: ActionTypes.PROMOS_FAILED,
        payload: errmess 
    })
}