import createDataContext from './createDataContext';
import booking from "../api/booking";
import {AsyncStorage} from "react-native";
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return {errorMessage: '', token: action.payload.token, user: action.payload.user}
        case 'add_err':
            return {...state, errorMessage: action.payload}
        case 'clear_error':
            return {...state, errorMessage: ''}
        case 'signout':
            return {token: null, errorMessage: '', user: null}
        case 'uploadImage':
            return {...state, fileUrl: action.payload}
        default:
            return state;
    }
}

const signup = (dispatch) => {
    return async (user) => {
        try {
            const response = await booking.post('/customer/auth/sign-up', user);
            await AsyncStorage.setItem('token', response.data.accessToken);
            console.log(response);
            dispatch({
                type: 'signin', payload: {
                    token: response.data.accessToken,
                    user: response.data.user
                }
            })
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

            console.log(response);
            dispatch({
                type: 'signin', payload: {
                    token: response.data.accessToken,
                    user: response.data.user
                }
            })
            navigate('HomeScreen')
            console.log(response);
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
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            if (token) {
                const response = await booking.get('/customer/users/me', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                });
                dispatch({type: 'signin', payload: {token: token, user: response.data}});
                navigate('Home');
            } else {
                navigate('SigninScreen')
            }
        } catch (e) {
            console.log(e.message);
        }

    }
}

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'signout'});
        navigate('SignupScreen');
    }
}

const updateProfile = (dispatch) => {
    return async (user) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const response = await booking.put('/customer/users/me', user, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                });

                dispatch({type: 'signin', payload: {token: token, user: response.data}});
                navigate('Home');
            } else {
                // navigate('SigninScreen')
            }
        } catch (e) {
            console.log(e.response.data);
        }

    }
}

const uploadAvatar = (dispatch) => {
    return async (file, image) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const response = await booking.post('/signed-url-s3',
                    file,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        },
                    });
                const fileUrl = response.data.fileUrl;
                console.log("fileUrl", fileUrl);

                const imagePath = image.uri;
                const imageExt = image.uri.split('.').pop();
                const imageMime = `image/${imageExt}`;
                let picture = await fetch(imagePath);
                picture = await picture.blob();
                const imageData = new File([picture], `photo.${imageExt}`);
                await fetch(response.data.uploadUrl, {
                    method: 'PUT',
                    body: imageData,
                    headers: {
                        'Content-Type': imageMime
                    },
                }).then(response => console.log(response.json()))
                    .catch(e => {
                        console.log(e.response.data)
                    });

                dispatch({type: 'uploadImage', payload: fileUrl})
            } else {
                // navigate('SigninScreen')
            }
        } catch (e) {
            console.log(e.response.data);
        }

    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {signup, signin, clearErrorMessage, tryLocalSignin, signout, updateProfile, uploadAvatar},
    {token: null, errorExistEmail: '', user: null}
)