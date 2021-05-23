import React from "react";
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from "react-native-elements";
import helper from "../helpers/helper";

const History = ({location, endTime, room, startTime, status}) => {
    let startTime1 = helper().formatDate(startTime);
    let endTime1 = helper().formatDate(endTime);

    const date1 = new Date(endTime);
    const date2 = new Date(startTime);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    let price = Math.floor(room.price);
    let priceString= helper().formatPrice(price);
    let priceArray = priceString.split('.');
    price = 0;
    for (let i = 0; i < priceArray.length; i++) {
        price = price * 1000 + parseInt(priceArray[i]);
    }

    price *= diffDays;

    priceString = helper().formatPrice(price);
    let color = '';
    switch (status) {
        case "PENDING":
            color = '#E53A40';
            break;
        case "ACCEPTED":
            color = '#3ac569'
            break;
        case "DONE":
            color = 'blue'
            break;
        case "DECLINE":
            color = 'blue'
            break;
        default:
            color = 'black';
    }
    return (
        <View style={styles.container}>
            <View style={styles.hotelStyle}>
                <View>
                    <Image source={{uri: location.images[0]}} style={styles.image}/>
                </View>
                <View style={styles.hotelDetail}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}} numberOfLines={1}>{location.name}</Text>
                    <Text style={{fontSize: 16}} numberOfLines={3}>{room.name}</Text>
                    <Text>Status : <Text style={{color: color}}>{status}</Text></Text>
                </View>
            </View>
            <View style={styles.bookingInfo}>
                <View style={styles.infoContent}>
                    <Text style={{fontSize: 16}}>Check-in:</Text>
                    <Text style={{fontSize: 16}}>{startTime1}</Text>
                </View>
                <View style={styles.infoContent}>
                    <Text style={{fontSize: 16}}>Check-out:</Text>
                    <Text style={{fontSize: 16}}>{endTime1}</Text>
                </View>
                <View style={styles.infoContent}>
                    <Text style={{color: 'red', fontSize: 16}}>Total price:</Text>
                    <Text style={{color: 'red', fontSize: 16}}>VND {priceString}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        flex : 1,
        marginVertical: 5,
        justifyContent: 'space-between',
        // flexDirection: 'row',
        width: 400,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    hotelStyle: {
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    hotelDetail: {
        marginLeft: 5,
    },
    image: {
        width: 80,
        height: 80,
    },
    bookingInfo: {
        marginTop :5
    },
    infoContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        borderTopWidth: 1,
        borderColor: 'black',
        marginVertical: 5
    }
})

export default History;