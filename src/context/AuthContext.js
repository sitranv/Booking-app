import createDataContext from './createDataContext';
import booking from "../api/booking";
import {AsyncStorage} from "react-native";
import {navigate} from '../navigationRef';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return {errorMessage:'', token: action.payload}
        case 'add_err':
            return {...state, errorMessage: action.payload}
        case 'clear_error':
            return {...state, errorMessage:''}
        case 'signout':
            return {token: null, errorMessage:''}
        default:
            return state;
    }
}

const signup = (dispatch) => {
    return async (user) => {
        try {
            const response = await booking.post('/customer/auth/sign-up', user);
            await AsyncStorage.setItem('token', response.data.accessToken);
            dispatch({type: 'signin', payload: response.data.accessToken})
            navigate('HomeScreen')
        } catch (err) {
            console.log(err)
            dispatch({type: 'add_err', payload: 'Something went wrong with sign up'})
            console.log(err.response.data);
        }
    }
}

const signin = (dispatch) => {
    return async (user) => {
        try {
            const response = await booking.post('/customer/auth/sign-in', user);
            await AsyncStorage.setItem('token', response.data.accessToken);
            dispatch({type: 'signin', payload: response.data.accessToken})
            navigate('HomeScreen')
        } catch (err) {
            dispatch({type: 'add_err', payload: 'Wrong email or password'})
            console.log(err.response.data);
        }
    }
}

const clearErrorMessage = (dispatch) => {
    return () => dispatch({type: 'clear_error', payload: ""});
}

const tryLocalSignin = (dispatch) => {
    return async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            dispatch({type: 'signin', payload: token});
            navigate('Home');
            // navigate('Room');
        } else {
            navigate('SignupScreen')
        }
    }
}

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type : 'signout'});
        navigate('SignupScreen');
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {signup, signin, clearErrorMessage, tryLocalSignin, signout},
    {token : null, errorExistEmail : ''}
)