import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';
import fetch from 'cross-fetch';
import {DISHES} from '../shared/dishes'
import {LEADERS} from '../shared/leaders'
import {COMMENTS} from '../shared/comments'
import {PROMOTIONS} from '../shared/promotions'


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
    
    dispatch(addComment(newComment))

    /*return fetch(baseURL + 'comments', {
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
    });*/
}

export const addFeedback = (feedback) => {
    return({
        type: ActionTypes.ADD_FEEDBACK,
        payload: feedback
    })
} 

export const postFeedback = (feedback) => (dispatch) => {

    
    var date = new Date().toISOString();
    var newFeedback = {...feedback, date: date};
    alert("Succesfully Submited");

    dispatch(addFeedback(newFeedback))

    /*return fetch(baseURL + 'feedback', 
                {method: "POST",
                body: JSON.stringify(newFeedback),
                headers: {"Content-Type" : "application/json"},
                credentials: "same-origin"
                })
                .then(response => {
                    if(response.ok){
                        return response
                    }
                    else {
                        var error = new Error(`Error ${response.status} : ${response.statusText}`)
                        error.response = response;
                        throw error;
                    }
                    },
                    error=>{throw error})
                .then(response => response.json())
                .then(dispatch(addFeedback(feedback)))
                .then(result => {alert(JSON.stringify(result))})
                .catch(error => {console.log(`Error : ${error}`)
                                alert(`Your Feedback Couldn't be Saved`)})*/
}

// Dishes
export const fetchDishes = () => (dispatch) => {
    //Thunk function
    dispatch(dishesLoading(true));
    setTimeout(()=>{dispatch(addDishes(DISHES))},1200)
    /*fetch(baseURL + 'dishes')
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
        dispatch(failedDishes(error.message))});*/

    
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
    setTimeout(()=>{dispatch(addComment(COMMENTS))},1200)
    /*fetch(baseURL + 'comments')
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
        .catch(error => dispatch(failedComments(error.message)));*/
    
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
    setTimeout(()=>{dispatch(addPromos(PROMOTIONS))},1200)
    /*fetch(baseURL + 'promotions')
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
        .catch(error => dispatch(failedPromos(error.message)));*/
        
    
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

//Leaders

export const fetchLeaders = () => (dispatch) => {
    //thunk
    dispatch(loadingLeaders(true));
    setTimeout(()=>{dispatch(addLeaders(LEADERS))},1200)
    /*return fetch(baseURL + 'leaders')
            .then(response => {
                if(response.ok)
                {
                 return response;   
                }
                else 
                {
                    var error = new Error(`Error ${response.status} : ${response.statusText} `)
                    error.response = response;
                    throw error;
                }
            },
            error => {throw error})
            .then(response => response.json())
            .then(response => dispatch(addLeaders(response)))
            .catch(error => dispatch(failedLeaders(error)))*/
}

export const addLeaders = (leaders) => {
    return({
        type: ActionTypes.ADD_LEADERS,
        payload: leaders
    })
}

export const failedLeaders = (errMess) => {
    return({
        type: ActionTypes.LEADERS_FAILED,
        payload: errMess
    })
}
export const loadingLeaders = () => {
    return({
        type: ActionTypes.LEADERS_LOADING
    })
}