import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import cartItems from './Reducers/cartItem'
import userProfile from './Reducers/userProfile';

const reducers = combineReducers({
    cartItems: cartItems,
    userProfile: userProfile
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;