import React from 'react'
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {LogBox} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs()
import ResolveAuthScreen from './src/screens/auth/ResolveAuthScreen'
import {setNavigator} from './src/navigationRef';
import SignupScreen from "./src/screens/auth/SignupScreen";
import SigninScreen from "./src/screens/auth/SigninScreen";
import HomeScreen from "./src/screens/booking/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import HotelDetail from './src/screens/booking/HotelDetail'
import RoomScreen from "./src/screens/booking/RoomScreen";
import Step1 from './src/screens/booking/confirm/Step1'
import Step2 from './src/screens/booking/confirm/Step2'
import {Provider as AuthProvider} from './src/context/AuthContext'
import {Provider as BookingProvider} from './src/context/BookingContext'
import Hotel from "./src/components/Hotel";
import BookingHistory from "./src/screens/booking/BookingHistory";
import UpdateAccountScreen from "./src/screens/UpdateAccountScreen";

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
            RoomScreen: RoomScreen,
            Step1: Step1,
            Step2: Step2,
        }, {
            navigationOptions : {
                tabBarLabel: "Vibo",
                tabBarIcon: () => {
                    return (
                        <AntDesign name="home" size={20} color="black" />
                    )
                }
            }
        }),
        AccountScreen: createStackNavigator({
            AccountScreen : AccountScreen,
            BookingHistory : BookingHistory,
            UpdateAccountScreen: UpdateAccountScreen,
            },{
            navigationOptions :{
                tabBarLabel: "Account",
                tabBarIcon : () => {
                    return (
                        <AntDesign name="user" size={20} color="black" />
                    );
                }
            }
        })
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