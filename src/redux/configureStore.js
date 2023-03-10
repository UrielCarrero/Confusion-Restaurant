import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import { Promotions } from './promotions';
import { Comments } from './comments';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {InitialFeedback} from './form';

export const ConfigureStore = () => {
    const store = createStore(combineReducers({
        dishes: Dishes,
        comments: Comments,
        promotions: Promotions,
        leaders: Leaders,
        ...createForms({ feedback: InitialFeedback })
    }),
    applyMiddleware(thunk, logger))
    return store;
}
