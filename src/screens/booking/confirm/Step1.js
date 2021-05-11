import React, {useContext, useState} from "react";
import {FlatList, Image, StyleSheet, View, TouchableOpacity, Button} from 'react-native'
import {Text, Input} from "react-native-elements";
import {SafeAreaView} from "react-navigation";
import { FontAwesome5, Ionicons} from "@expo/vector-icons";
import {Context as AuthContext} from "../../../context/AuthContext";
import helper from "../../../helpers/helper";
const Step1 = ({navigation}) => {
    const {state} = useContext(AuthContext);
    let room = navigation.getParam('room');
    let hotel = navigation.getParam('hotel');
    let dateFrom = navigation.getParam('dateFrom');
    let dateTo = navigation.getParam('dateTo');
    let stars = navigation.getParam('stars');
    let servicesView = navigation.getParam('servicesView');

    let price = Math.floor(room.price);
    let priceString = helper().formatPrice(price);
    return (
        <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
            <View style={{ marginHorizontal: 5}}>
                <Text style={{marginLeft: 6, marginVertical: 5}}>Your full name</Text>
                <Input
                    editable={false}
                    value={state.user.fullName}
                />
                <Text style={{marginLeft: 6, marginVertical: 5}}>Your email</Text>
                <Input
                    editable={false}
                    value={state.user.email}
                />
                <Text style={{marginLeft: 6, marginVertical: 5}}>Your phone number</Text>
                <Input
                    editable={false}
                    value={state.user.phoneNumber}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{fontSize: 16, textAlign: 'left'}}>Price for 1 night</Text>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <Text style={{
                            marginRight: 5,
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#df405a',
                            alignSelf: 'flex-start'
                        }}>VND {priceString}</Text>
                        <View style={{marginTop: 3}}>
                            <FontAwesome5 name="coins" size={20} color="black"/>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <Ionicons name="checkmark-outline" size={24} color="#3ac569"/>
                        <Text style={{color: '#3ac569', textAlign: 'left'}}>Includes taxs and fees</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Step2', {
                            room, hotel, dateTo, dateFrom, stars, servicesView, priceString, user: state.user
                        })
                    }}
                >
                    <Text style={{color: 'white', fontSize: 17}}>Next step</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

Step1.navigationOptions = () => {
    return {
        // headerShown: false,
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        backgroundColor: 'white',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        marginTop: 10,
        paddingVertical: 19,
        paddingHorizontal: 40,
        backgroundColor: '#2274A5',
        alignItems: 'center',
        marginRight: 5,
        marginBottom: 10,
    }
})

export default Step1;