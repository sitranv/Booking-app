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
import {Provider as AuthProvider} from './src/context/AuthContext'
import {Provider as BookingProvider} from './src/context/BookingContext'

const switchNavigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
        SignupScreen: SignupScreen,
        SigninScreen: SigninScreen
    }),
    mainFlow: createBottomTabNavigator({
        Home: HomeScreen
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