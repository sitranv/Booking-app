import React, {useContext, useState} from "react";
import {FlatList, Image, StyleSheet, View, TouchableOpacity, Alert, Modal} from 'react-native'
import {Text, ListItem} from "react-native-elements";
import {Context as BookingContext} from '../../context/BookingContext';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {SafeAreaView} from "react-navigation";
import {Entypo, FontAwesome} from "@expo/vector-icons";
import DatePicker from 'react-native-datepicker'
import Room from "../../components/Room";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const HotelDetail = ({navigation}) => {
    const {state, getRoomAvailable} = useContext(BookingContext);
    let now = new Date();
    let date = now.getFullYear()+ '/' + (now.getMonth() + 1)  + '/' +  now.getDate();
    const [modalVisible, setModalVisible] = useState(false);
    const [dateFrom, setDateFrom] = useState(date);
    const [dateTo, setDateTo] = useState(date);

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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text h4>Choose date</Text>
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <View>
                                    <Text>Check-in date</Text>
                                    <DatePicker
                                        style={{width: 170}}
                                        date={dateFrom}
                                        mode="date"
                                        format="YYYY/MM/DD"
                                        showIcon={false}
                                        onDateChange={(date) => setDateFrom(date)}
                                        androidMode={"default"}
                                    />
                                </View>
                                <Text h4 style={{marginTop: 20, marginHorizontal: 10}}> - </Text>
                                <View>
                                    <Text>Check-out date</Text>
                                    <DatePicker
                                        style={{width: 170}}
                                        date={dateTo}
                                        mode="date"
                                        format="YYYY/MM/DD"
                                        showIcon={false}
                                        onDateChange={(date) => setDateTo(date)}
                                        androidMode={"default"}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose, {marginRight: 15}]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonSubmit, {marginLeft : 15}]}
                                    onPress={() => {
                                        // console.log(dateFrom, dateTo);
                                        setModalVisible(!modalVisible)
                                        let startTime = new Date(dateFrom).toISOString();
                                        let endTime = new Date(dateTo).toISOString();
                                        getRoomAvailable(hotel.id, startTime, endTime);
                                        navigation.navigate('RoomScreen' , {services : hotel.serviceTypes, hotel: hotel});
                                    }}
                                >
                                    <Text style={styles.textStyle}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>


                <TouchableOpacity
                    activeOpacity={.7}
                    style={styles.buttonView}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <Text style={{color: 'white', fontSize: 16,}}>Book now</Text>
                </TouchableOpacity>

                {/*<TouchableOpacity*/}
                {/*    activeOpacity={.7}*/}
                {/*    style={styles.buttonView}*/}
                {/*    onPress={() => {*/}
                {/*        navigation.navigate('RoomScreen', {rooms: hotel.rooms, services : hotel.serviceTypes});*/}
                {/*    }}>*/}
                {/*    <Text style={{color: 'white', fontSize: 16,}}>Book now</Text>*/}
                {/*</TouchableOpacity>*/}
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#52616a",
    },
    buttonSubmit: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default HotelDetail;