import createDataContext from './createDataContext';
import booking from "../api/booking";
import {AsyncStorage} from "react-native";
import {navigate} from '../navigationRef';


const bookingReducer = (state, action) => {
    switch (action.type) {
        case 'get_data':
            return {...state, data : action.payload}
        default:
            return state;
    }
}

const getData = (dispatch) => {
    return async () => {
        try {
            const response = await booking.get('/customer/locations');
            dispatch({type: 'get_data', payload: response.data})
            console.log(response.data);
        } catch (e) {
            console.log(e.message);
        }
    }
}
export const {Provider, Context} = createDataContext(
    bookingReducer,
    {getData},
    {}
)