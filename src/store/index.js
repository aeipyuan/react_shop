import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notice from './reducers/notice'
import product from './reducers/product'
let reducers = combineReducers({ notice, product })
export default createStore(reducers, applyMiddleware(thunk))