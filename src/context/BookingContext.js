import createDataContext from './createDataContext';
import booking from "../api/booking";
import {AsyncStorage} from "react-native";
import {navigate} from '../navigationRef';


const bookingReducer = (state, action) => {
    switch (action.type) {
        case 'get_data':
            let searchField = action.name ? action.name : 'Featured hotels'
            return {...state, data: action.payload.data, searchField}
        case 'get_cities' :
            return {...state, cities: action.payload.cities}
        case 'get_hotel_by_id':
            return {...state, hotel: action.payload}
        case 'get_rooms' :
            return {...state, availableRooms: action.payload}
        case 'get_histories' :
            return {...state, histories: action.payload}
        case 'paypal_link':
            return {...state, paypal_link: action.payload.link.href, bookingDetails: action.payload}
        case 'reset_booking_details':
            return {...state, bookingDetails : action.payload}
        default:
            return state;
    }
}

const getDataOrderByScore = (dispatch) => {
    return async (search) => {
        try {
            let params = null;
            if (search.trim() !== '') {
                params = {
                    s: `{"name": {"$cont": "${search}"}}`
                }
            }
            const response = await booking.get('/customer/locations', {
                params : {
                    ...params,
                    limit: 70,
                    sort: 'score,DESC',
                    join: ['locationType', 'city', 'rooms', 'serviceTypes'],
                    filter: 'cityId||$notnull',
                }
            });
            console.log(response);
            dispatch({type: 'get_data', payload: response.data})
        } catch (e) {
            console.log(e);
        }
    }
}

const getCities = (dispatch) => {
    return async () => {
        try {
            const response = await booking.get('/app/config');
            dispatch({type: 'get_cities', payload: response.data})
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
                    limit: 100,
                    sort: 'score,DESC',
                    join: ['locationType', 'city', 'rooms', 'serviceTypes'],
                    filter: `cityId||$eq||${cityId}`
                }
            });
            // console.log(cityId);
            dispatch({type: 'get_data', payload: response.data, name: cityName})
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
                    startTime: checkin,
                    endTime: checkout
                }
            })
            dispatch({type: 'get_rooms', payload: response.data})
        } catch (e) {
            console.log(e.messages)
        }
    }
}

const book = (dispatch) => {
    return async (locationId, roomId, startTime, endTime) => {
        console.log(locationId, roomId, startTime, endTime);
        try {

            const response = await booking.post(`/customer/locations/${locationId}/book`, {
                roomId: roomId,
                startTime: startTime,
                endTime: endTime,
                cancelUrl: "http://localhost:19000/PAYMENT_CANCELED",
                returnUrl: "http://localhost:19000/PAYMENT_SUCCESS"
            });
            // console.log(response)
            dispatch({type: 'paypal_link', payload: response.data})
            // if (response !== undefined && response.status === 201) {
            //     return response.data.link.href;
            // }
        } catch (e) {
            console.log(e);
            dispatch({type: 'paypal_link', payload: ''})
        }
    }
}

const getBookingHistory = (dispatch) => {
    return async () => {
        try {
            const response = await booking.get('/customer/booking-histories', {
                params: {
                    take: 100,
                    order: '-createdAt',
                }
            });
            dispatch({type: 'get_histories', payload: response.data.results})
        } catch (e) {
            console.log(e)
        }
    }
}

const getSearchLocation = (dispatch) => {
    return async (name) => {
        try {
            const response = await booking.get('/customer/locations', {
                params: {
                    s: {"name": {"$cont": name}}
                }
            })
            // console.log(response.data)
            dispatch({type: 'get_location_search', payload: response.data});
        } catch (e) {
            console.log(e);
        }
    }
}

const capturePayment = (dispatch) => {
    return async (locationId, bookingId) => {
        try {
            const response = await booking.post(`/customer/locations/${locationId}/bookings/${bookingId}/capture-payment`);
            console.log(response);
            dispatch({type: 'reset_booking_details', payload: {}});
        } catch (e) {
            console.log(e)
        }
    }
}

export const {Provider, Context} = createDataContext(
    bookingReducer,
    {getDataOrderByScore, getCities, getHotelByCity, getRoomAvailable, book, getBookingHistory, getSearchLocation, capturePayment},
    {}
)