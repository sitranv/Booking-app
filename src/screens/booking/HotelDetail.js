import React, {useContext} from "react";
import {FlatList, Image, StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, ListItem} from "react-native-elements";
import {Context as BookingContext} from '../../context/BookingContext';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {SafeAreaView} from "react-navigation";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import Room from "../../components/Room";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const HotelDetail = ({navigation}) => {
    const {state} = useContext(BookingContext);
    let hotel_id = navigation.getParam('id');
    const hotel = state.data.find(
        hotel => hotel.id === hotel_id
    );
    let stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < parseInt(hotel.score / 2)) {
            stars.push(<FontAwesome name="star" size={20} color="#FFBC42" style={{marginLeft: 4}}/>);
        } else {
            stars.push(<FontAwesome name="star-o" size={20} color="#FFBC42" style={{marginLeft: 4}}/>);
        }
    }
    console.log(hotel);
    return (
        <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
            <SwiperFlatList
                autoplay
                autoplayLoop
                index={0}
                autoplayDelay={10}
                // showPagination
                data={hotel.images}
                renderItem={({item}) => {
                    return (
                        <Image source={{uri: item}} style={{width: 412, height: 250}}/>
                    )
                }}
            />
            <View style={styles.content}>
                <View style={styles.container1}>
                    <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 5,}}>
                        <View style={{width: 350}}>
                            <Text h4 numberOfLines={2} ellipsizeMode='tail'>{hotel.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.score}>{hotel.score}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 5, marginLeft: 5,}}>
                        <Text style={{
                            paddingVertical: 2,
                            paddingHorizontal: 4,
                            textAlign: 'center',
                            borderWidth: 1,
                            fontSize: 12
                        }}>{hotel.locationType.name}</Text>
                        {stars}
                    </View>
                    <View style={{marginTop: 5, marginLeft: 5}}>
                        <Text style={styles.address} numberOfLines={2} ellipsizeMode='tail'>
                            <Entypo name="location-pin" size={15} color="black"/>{hotel.address}
                        </Text>
                    </View>
                </View>
                <View style={styles.container3}>
                    <Text numberOfLines={8} ellipsizeMode='tail' style={styles.priceMobile}>Mobile-only price</Text>
                    <Text numberOfLines={8} ellipsizeMode='tail' style={styles.price}>VND {hotel.price.split('D')[1]}</Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.description} numberOfLines={8} ellipsizeMode='tail'>{hotel.description}</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={.7}
                    style={styles.buttonView}
                    onPress={() => {
                        navigation.navigate('RoomScreen', {rooms: hotel.rooms, services : hotel.serviceTypes});
                    }}>
                    <Text style={{color: 'white', fontSize: 16,}}>Select rooms</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

HotelDetail.navigationOptions = () => {
    return {
        headerShown: false,
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1eef6',
    },
    container1: {
        height: 160,
        backgroundColor: 'white',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    container2: {
        marginTop: 5,
        height: 200,
        backgroundColor: 'white',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    container3 : {
        marginTop: 5,
        height: 90,
        backgroundColor: 'white',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    content: {
        // marginTop: 10,
        // marginLeft: 5,
        height: 600
    },
    score: {
        marginLeft: 7,
        paddingVertical: 10,
        paddingHorizontal: 13,
        backgroundColor: '#2b90d9',
        textAlign: 'center',
        color: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7
    },
    description: {
        marginLeft: 7,
        padding: 10,
        fontSize: 15
    },
    buttonView: {
        marginTop: 6,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 390,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#2274A5',
    },
    priceMobile : {
        marginTop: 10,
        marginLeft: 15,
        padding: 5,
        fontSize: 13,
        width: 130,
        backgroundColor: '#F68657'
    },
    price: {
        marginTop: 10,
        marginRight: 10,
        padding: 5,
        fontSize: 25,
        // width: 160,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginBottom: 5,
    }
})

export default HotelDetail;