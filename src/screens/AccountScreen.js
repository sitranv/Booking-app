import React, {useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {SafeAreaView} from "react-navigation";
import {Button} from "react-native-elements";
import {Context as AuthContext} from "../context/AuthContext";

const AccountScreen = () => {
    const {signout} = useContext(AuthContext);
    return (<SafeAreaView style={styles.container} forceInset={{top:'always'}}>
        <Button style={styles.button} title="Sign out" onPress={signout}/>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        marginTop: 250
    },
    button : {
        fontSize :20,
    }
});
export default AccountScreen;