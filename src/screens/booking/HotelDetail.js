import React, {useContext, useEffect} from "react";
import {View, Text, StyleSheet, Image} from 'react-native'
import {Context as BookingContext} from '../../context/BookingContext';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import {SafeAreaView} from "react-navigation";

const HotelDetail = ({ navigation }) => {
    const {state, getHotelById} = useContext(BookingContext);
    let hotel_id = navigation.state.params.id;
    useEffect(() => {
        getHotelById(hotel_id);
    }, [])
    var hotel = state.hotel;
    return(
        <SafeAreaView forceInset={{top: 'always'}}>
            <Text>{hotel.name}</Text>
            <SwiperFlatList
                index={0}
                showPagination
                data={hotel.images}
                renderItem={({ item }) => {
                    console.log(item)
                    return(
                        <Image source={{uri: item}} style={{width :190, height:200}}/>
                    )
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default HotelDetail;