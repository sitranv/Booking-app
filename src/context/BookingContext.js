import createDataContext from './createDataContext';
import booking from "../api/booking";
import {AsyncStorage} from "react-native";
import {navigate} from '../navigationRef';


const bookingReducer = (state, action) => {
    switch (action.type) {
        case 'get_data':
            return {...state, data: action.payload.data}
        case 'get_cities' :
            return {...state, cities: action.payload.cities}
        case 'get_hotel_by_id':
            return {...state, hotel: action.payload}
        default:
            return state;
    }
}

const getDataOrderByScore = (dispatch) => {
    return async () => {
        try {
            const response = await booking.get('/customer/locations', {
                params: {
                    limit: 20,
                    sort: 'score,DESC',
                    join: ['locationType', 'city', 'rooms'],
                }
            });
            dispatch({type: 'get_data', payload: response.data})
        } catch (e) {
            console.log(e.message);
        }
    }
}

const getCities = (dispatch) => {
    return async () => {
        try {
            const response = await booking.get('/app/config');
            dispatch({type: 'get_cities', payload: response.data})
            // console.log(response.data);
        } catch (e) {
            console.log(e.message);
        }
    }
}


export const {Provider, Context} = createDataContext(
    bookingReducer,
    {getDataOrderByScore, getCities},
    {}
)