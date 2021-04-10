import React, {useContext} from "react";
import {FlatList, Image, StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, ListItem} from "react-native-elements";
import {Context as BookingContext} from '../../context/BookingContext';
import {SafeAreaView} from "react-navigation";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import Room from "../../components/Room";

const RoomScreen = ({navigation}) => {
    let rooms = navigation.getParam('rooms');
    let services_temp = navigation.getParam('services');
    let services = [];
    for (let i = 0; i < 3; i++) {
        services.push(services_temp[Math.floor(Math.random() * services_temp.length)])
    }
    console.log(services)
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={rooms}
                keyExtractor={(item, index) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                    return(
                        <Room
                            roomName={item.name}
                            price={item.price}
                            capacity={item.capacity}
                            id={item.id}
                            services={services}
                        />)
                }}
                />
        </SafeAreaView>
    )
}

RoomScreen.navigationOptions = () => {
    return {
        // headerShown: false,
        headersText: 'Choose Your Stay'
    }
}
const styles = StyleSheet.create({
    container : {
        paddingTop: 5,
        backgroundColor: '#e1eef6',
        flex : 1,
    }
})

export default RoomScreen;