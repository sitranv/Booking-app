import createDataContext from './createDataContext';
import booking from "../api/booking";
import {AsyncStorage} from "react-native";
import {navigate} from '../navigationRef';


const bookingReducer = (state, action) => {
    switch (action.type) {
        case 'get_data':
            let searchField = action.name ? action.name : 'Featured hotels'
            return {...state, data: action.payload.data , searchField}
        case 'get_cities' :
            return {...state, cities: action.payload.cities}
        case 'get_hotel_by_id':
            return {...state, hotel: action.payload}
        case 'get_rooms' :
            return {...state, availableRooms: action.payload}
        default:
            return state;
    }
}

const getDataOrderByScore = (dispatch) => {
    return async () => {
        try {
            const response = await booking.get('/customer/locations', {
                params: {
                    limit: 10,
                    sort: 'score,DESC',
                    join: ['locationType', 'city', 'rooms', 'serviceTypes'],
                }
            });
            dispatch({type: 'get_data', payload: response.data})
            console.log(response.data.data);
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

const getHotelByCity = (dispatch) => {
    return async (cityId, cityName) => {
        try {
            const response = await booking.get('/customer/locations', {
                params: {
                    limit: 10,
                    sort: 'score,DESC',
                    join: ['locationType', 'city', 'rooms', 'serviceTypes'],
                    filter: `cityId||$eq||${cityId}`
                }
            });
            // console.log(cityId);
            dispatch({type: 'get_data', payload: response.data, name : cityName})
            // console.log(response.data)
        } catch (e) {
            console.log(e.message)
        }
    }
}

const getRoomAvailable = (dispatch) => {
    return async (locationId, checkin, checkout) => {
        try {
            const response = await booking.get(`/customer/locations/${locationId}/bookings`, {
                params: {
                    startTime : checkin,
                    endTime : checkout
                }
            })
            console.log(response);
            dispatch({type: 'get_rooms', payload: response.data})
        } catch (e) {

        }
    }
}
export const {Provider, Context} = createDataContext(
    bookingReducer,
    {getDataOrderByScore, getCities, getHotelByCity, getRoomAvailable},
    {}
)