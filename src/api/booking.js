import axios from 'axios';
import {AsyncStorage} from "react-native";

const instance =  axios.create({
    baseURL : 'https://booking-nestjs.herokuapp.com/'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

export default instance;