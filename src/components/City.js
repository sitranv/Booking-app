import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {Entypo} from "@expo/vector-icons";

const City = ({thumbnail, name, averagePrice, getHotelByCity, cityId}) => {
    return ( <TouchableOpacity
        activeOpacity={.7}
        style={styles.container}
        onPress={() => {
            getHotelByCity(cityId);
        }}
    >
        {thumbnail?<Image source={{ uri: thumbnail}} style={styles.image}/> : null}
        <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>{averagePrice} per night average</Text>
        </View>
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    container : {
        width: 190,
        marginVertical : 5,
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    image : {
        width: 190,
        height: 110,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    name : {
        fontSize : 18,
        fontWeight:'bold',
    },
    info : {
        marginLeft: 5,
        paddingBottom: 10
    },
    price: {
        fontSize: 13
    }
})

export default City;