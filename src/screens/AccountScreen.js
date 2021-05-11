import React, {useContext} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {SafeAreaView} from "react-navigation";
import {Button, Text} from "react-native-elements";
import {Context as AuthContext} from "../context/AuthContext";
import Header from "../components/Header";
import BookingHistory from "./booking/BookingHistory";

const AccountScreen = ({navigation}) => {
    const {signout, state} = useContext(AuthContext);
    return (<SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
        <Header text="Vibo"/>
        <Text h3> Hi {state.user.fullName ? state.user.fullName : null}</Text>
        {/*<Text>{state.user.email}</Text>*/}
        {/*<Text>{state.user.city}</Text>*/}
        {/*<Text>{state.user.address}</Text>*/}
        {/*<Text>{state.user.phoneNumber}</Text>*/}
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('BookingHistory')
                }}>
                <Text style={styles.buttonText}>Booking History</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    signout()
                }}>
                <Text style={styles.buttonText}>Signout</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>)
}

AccountScreen.navigationOptions = () => {
    return {
        headerShown: false,
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
        backgroundColor: '#e1eef6',
        flex:1
    },
    button: {
        fontSize: 20,
        width: 185,
        height: 50,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#30A9DE'
    },
    buttonContainer: {
        flexDirection: 'row',
        // justifyContent: 'between'
        marginTop: 15,
    },
    buttonText: {
        color: 'white'
    }
});
export default AccountScreen;