import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/baseURL';
import fetch from 'cross-fetch';


export const addComment = (dishId, rating, author, comment) => {
    return({
        type: ActionTypes.ADD_COMMENT,
        payload: {dishId, rating, author, comment}
    });
}

// Dishes
export const fetchDishes = () => (dispatch) => {
    //Thunk function
    dispatch(dishesLoading(true));
    fetch(baseURL + 'dishes')
        .then(result => result.json())
        .then(dishes => dispatch(addDishes(dishes)));
    
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
        .then(result => result.json())
        .then(comments => dispatch(addComments(comments)));
    
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
        .then(result => result.json())
        .then(promos => dispatch(addPromos(promos)));
    
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