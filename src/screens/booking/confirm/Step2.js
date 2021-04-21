import React, {useContext, useState} from "react";
import {FlatList, Image, StyleSheet, View, TouchableOpacity, Button, ActivityIndicator} from 'react-native'
import {Text, ListItem, Input} from "react-native-elements";
import {SafeAreaView} from "react-navigation";
import {Entypo, FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons";

const Step2 = ({navigation}) => {
    let room = navigation.getParam('room');

    return (
        <SafeAreaView style={[styles.container, styles.horizontal]} forceInset={{top: 'always'}}>
            <ActivityIndicator size={40} color="black" />
        </SafeAreaView>
    )
}

Step2.navigationOptions = () => {
    return {
        // headerShown: false,
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default Step2;