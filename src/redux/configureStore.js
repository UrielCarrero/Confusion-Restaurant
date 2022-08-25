import {createStore} from 'redux';
import { Reducer, initialState } from './reducer'

export const ConfigureStore = () => {
    const store = createStore(
        Reducer, // reducer
        initialState, // our initialState
    );

    return store;
}

/*import { createStore } from 'redux';
import {Reducer, initialState} from './reducer';

export const configureStore = () => {
    const store = createStore(Reducer, initialState);
    console.log(store);
    return store;
}*/