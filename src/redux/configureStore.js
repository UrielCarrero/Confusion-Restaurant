import {createStore, combineReducers} from 'redux';
import { Promotions } from './promotions';
import { Comments } from './comments';
import { Dishes } from './dishes';
import { Leaders } from './leaders';

export const ConfigureStore = () => {
    const store = createStore(combineReducers(
        {
            promotions: Promotions,
            comments: Comments,
            dishes: Dishes,
            leaders: Leaders
        }
    ));

    return store;
}
