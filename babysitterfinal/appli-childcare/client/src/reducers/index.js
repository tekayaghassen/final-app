import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import profile from './profile';
import alert from './alert';
import post from './post';



export default combineReducers ({
    alert,
  /*   error: errorReducer, */
    auth: authReducer,
    profile,
    post
});

