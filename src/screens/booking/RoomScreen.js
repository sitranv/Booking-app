import React, {useContext} from "react";
import {FlatList, Image, StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, ListItem} from "react-native-elements";
import {Context as BookingContext} from '../../context/BookingContext';
import {SafeAreaView} from "react-navigation";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import Room from "../../components/Room";
import HotelDetail from "./HotelDetail";

const RoomScreen = ({navigation}) => {
    const {state} = useContext(BookingContext);
    let rooms = state.availableRooms;
    let services_temp = navigation.getParam('services');
    let hotel = navigation.getParam('hotel');
    let dateFrom = navigation.getParam('dateFrom');
    let dateTo = navigation.getParam('dateTo');
    let stars = navigation.getParam('stars');

    let services = [];
    for (let i = 0; i < 3; i++) {
        services.push(services_temp[Math.floor(Math.random() * services_temp.length)])
    }
    // console.log(services)
    return (
        <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
            <Text h3 style={{marginLeft: 6, marginVertical: 5}}>Available Rooms ({rooms ? rooms.length : ''})</Text>
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
                            room={item}
                            hotel={hotel}
                            dateFrom={dateFrom}
                            dateTo={dateTo}
                            stars={stars}
                        />)
                }}
                />
        </SafeAreaView>
    )
}

RoomScreen.navigationOptions = () => {
    return {
        headerShown: false,
        // headersText: 'Choose Your Stay'
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