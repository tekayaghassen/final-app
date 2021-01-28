import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    ACCOUNT_DELETED,
    CLEAR_PROFILE
} from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
       dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.satus}
    });
}}


export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});
    try {
        const res = await axios.get('/api/profile/');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
       dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.satus}
    });
}}



export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get('/api/profile/user/${userId}');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
       dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.satus}
    });
}}





export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit? 'Profile Updated' : 'Profile Created'));

        if(!edit){history.push('/dashboard')
      }
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
          errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.satus}
        });
    }
}


export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure ?'))
    try {

        
        await axios.delete('/api/profile');
        dispatch({type: CLEAR_PROFILE});
        dispatch({type: ACCOUNT_DELETED});

        dispatch(setAlert('Your account has been permanantly deleted'));

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.satus}
        });
    }
}