import React from 'react'
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs()
import ResolveAuthScreen from './src/screens/auth/ResolveAuthScreen'
import {setNavigator} from './src/navigationRef';
import SignupScreen from "./src/screens/auth/SignupScreen";
import SigninScreen from "./src/screens/auth/SigninScreen";
import HomeScreen from "./src/screens/booking/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import HotelDetail from './src/screens/booking/HotelDetail'

import {Provider as AuthProvider} from './src/context/AuthContext'
import {Provider as BookingProvider} from './src/context/BookingContext'
import Hotel from "./src/components/Hotel";

console.disableYellowBox = true
const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    HotelComponent: Hotel,
    loginFlow: createStackNavigator({
        SignupScreen: SignupScreen,
        SigninScreen: SigninScreen
    }),
    mainFlow: createBottomTabNavigator({
        Home: createStackNavigator({
            HomeScreen: HomeScreen,
            HotelDetail: HotelDetail,
        }),
        AccountScreen: AccountScreen
    }),
})

const App = createAppContainer(switchNavigator)

export default () => {
    return (
        <BookingProvider>
            <AuthProvider>
                <App ref={(navigator) => {
                    setNavigator(navigator)
                }}/>
            </AuthProvider>
        </BookingProvider>
    )
}