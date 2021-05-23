import React from "react";
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from "react-native-elements";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {withNavigation} from "react-navigation";
const Hotel = ({image, name, address, navigation, score, id, check}) => {
    let stars = [];
    for (let i = 0; i < 5 ; i++) {
        if(i < parseInt(score / 2)) {
            stars.push(<FontAwesome name="star" size={20} color="#FFBC42" style={{marginRight:4}}/>);
        }
        else {
            stars.push(<FontAwesome name="star-o" size={20} color="#FFBC42" style={{marginRight:4}}/>);
        }
    }
    return (
        <TouchableOpacity
            activeOpacity={.7}
            style={styles.container}
            onPress={() => {
                navigation.navigate('HotelDetail', {id: id});
            }}
        >
            <View style={{padding : 5, flexDirection: 'column'}}>
                {image?<Image source={{ uri: image[0]}} style={styles.image}/>: <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={styles.image}/>}
                <View style={{flexDirection: 'row', marginLeft : 5, marginVertical : 5}}>
                    {stars}
                </View>
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{marginTop: 5, width: 130}}>
                            <Text style={styles.address} numberOfLines={2} ellipsizeMode='tail'><Entypo name="location-pin" size={15} color="black" />{address}</Text>
                        </View>
                        <View>
                            <Text style={styles.score}>{score}</Text>
                        </View>
                    </View>
                    {!check ? <Text style={{color: 'red'}}>* Unregistered</Text> : null}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {
        width: 190,
        marginVertical : 5,
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        //shadow
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
        width: 178,
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    name : {
        fontSize : 18,
        fontWeight:'bold',
    },
    info : {
        paddingBottom: 5
    },
    address: {
        fontSize: 14,
    },
    score: {
        marginLeft: 7,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#2b90d9',
        textAlign: 'center',
        color: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7
    },
})

export default withNavigation(Hotel);