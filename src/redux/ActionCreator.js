import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => {
    return({
        type: ActionTypes.ADD_COMMENT,
        payload: {dishId, rating, author, comment}
    });
}

//Thunk
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
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