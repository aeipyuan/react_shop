import { createStore, combineReducers } from 'redux'
import notice from './reducers/notice'
let reducers = combineReducers({ notice })
export default createStore(reducers)