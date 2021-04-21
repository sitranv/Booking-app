import React from "react";
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from "react-native-elements";
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {withNavigation} from "react-navigation";
import { Ionicons } from '@expo/vector-icons';

const Room = ({roomName, id, capacity, price, services, navigation, room, hotel}) => {
    let peoples = [];
    if (capacity <= 4) {
        for (let i = 0; i < capacity; i++) {
            peoples.push(<AntDesign name="user" size={18} color="black"/>);
        }
    } else {
        for (let i = 0; i < 4; i++) {
            peoples.push(<AntDesign name="user" size={18} color="black"/>);
        }
    }
    let priceString= '';
    price = Math.floor(price);
    while (price > 999) {
        var num = price % 1000;
        priceString += '.' + num ;
        price = Math.floor(price/ 1000);
        if (price <= 999) {
            priceString = price + '' + priceString;
            break;
        }
    }
    let services_temp = [];
    let index = [];
    for (let i = 0; i < Math.round(services.length / 2) - 1; i++) {
        let j = Math.floor(Math.random() * services.length);
        while (index.includes(j)) {
            j = Math.floor(Math.random() * services.length);
        }
        index.push(j)
        services_temp.push(services[j]);
    }

    let servicesView = [];

    for(let i = 0; i < services_temp.length; i++) {
        servicesView.push(
            <View style={{flexDirection:'row'}}>
                <Image source={{uri: services_temp[i].icon}} style={{width : 22, height: 22}}/>
                <Text style={{marginLeft: 10}}>{services_temp[i].name}</Text>
            </View> 
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerFluid}>
                <Text style={styles.roomName}>{roomName}</Text>
                <View style={{marginTop: 4, flexDirection: 'row'}}>
                    <Text style={{marginRight: 10, fontSize: 15}}>Price for:</Text>
                    {peoples}
                    <Text style={{fontSize: 15, marginLeft :5}}>({capacity})</Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                    {servicesView}
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    {/*<View style={{*/}
                    {/*    paddingVertical: 7,*/}
                    {/*    paddingHorizontal: 10,*/}
                    {/*    backgroundColor: '#0080ff',*/}
                    {/*    borderRadius: 5*/}
                    {/*}}>*/}
                    {/*    <Text style={{color: 'white'}}>Genius</Text>*/}
                    {/*</View>*/}
                    <View style={{
                        padding: 7,
                        paddingHorizontal: 10,
                        backgroundColor: 'orange',
                        // marginLeft: 10,
                        borderRadius: 5
                    }}>
                        <Text>Getaway Deal</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{marginLeft: 10, fontSize: 16, textAlign : 'right'}}>Price for 1 night</Text>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                        <Text style={{marginRight: 5, fontSize: 18, fontWeight: 'bold', color: '#df405a', alignSelf: 'flex-end'}}>VND {priceString}</Text>
                        <View style={{marginTop: 3}}>
                            <FontAwesome5 name="coins" size={20} color="black"/>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                        <Ionicons name="checkmark-outline" size={24} color="#3ac569" />
                        <Text style={{color: '#3ac569', textAlign : 'right'}}>Includes taxs and fees</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.buttonBook}
                    activeOpacity={.7}
                    onPress={() => {
                        navigation.navigate('Step1', {room: room, hotel: hotel})
                    }}
                >
                    <Text style={styles.buttonText}>Reserve</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal: 7,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    containerFluid : {
        marginTop: 10,
        marginHorizontal: 8
    },
    roomName: {
        color: '#4F86C6',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonBook : {
        marginVertical: 10,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: '#4F86C6',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#4F86C6'
    }
})

export default withNavigation(Room);