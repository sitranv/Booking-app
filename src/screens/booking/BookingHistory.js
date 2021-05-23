import React, {useContext, useEffect, useState} from "react";
import {FlatList, Image, StyleSheet, View, TouchableOpacity, Alert, Modal} from 'react-native'
import {Text, ListItem} from "react-native-elements";
import {Context as BookingContext} from '../../context/BookingContext';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {SafeAreaView} from "react-navigation";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import DatePicker from 'react-native-datepicker'
import Hotel from "../../components/Hotel";
import History from "../../components/History";

const BookingHistory = ({navigation}) => {
    const {state, getBookingHistory} = useContext(BookingContext);

    useEffect(() => {
        getBookingHistory()
    }, []);

    let histories = state.histories;
    console.log(histories);
    return (
        <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
            <Text h3 style={{marginLeft: 10}}>Booking History ({histories ? histories.length : 0})</Text>
            <FlatList
                style={{marginTop: 5}}
                data={histories}
                keyExtractor={(item, index) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                    return (
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <History
                                location={item.location}
                                startTime={item.startTime}
                                endTime={item.endTime}
                                status={item.status}
                                room={item.room}
                            />
                        </View>)
                }}
            />
        </SafeAreaView>
    )
}

BookingHistory.navigationOptions = () => {
    return {
        headerShown: false,
    }
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor: '#e1eef6',
    }
})

export default BookingHistory;