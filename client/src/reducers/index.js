import { combineReducers } from "redux";
import posts from './posts'
import auth from './auth'


//here are all global states
export default combineReducers({ 
    posts, 
    auth
});