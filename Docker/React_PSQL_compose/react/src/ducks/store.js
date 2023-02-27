import {createStore,combineReducers,applyMiddleware,compose} from "redux";
import {personsReducer} from './persons/reducers'
import {moviesReducer} from './movies/reducers'
import thunk from "redux-thunk";
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers=combineReducers({
    persons:personsReducer,
    movies:moviesReducer
})

const store = createStore(combinedReducers,composeEnhancers(applyMiddleware(thunk,logger)))


export default store