import React, {useContext, useState} from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Button,
    ActivityIndicator,
    Alert,
    Modal,
} from 'react-native'

import {WebView} from 'react-native-webview';

import {Text, ListItem, Input} from "react-native-elements";
import {SafeAreaView} from "react-navigation";
import {Entypo, FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {Context as BookingContext} from "../../../context/BookingContext";
import Dialog from "react-native-dialog";
import helper from "../../../helpers/helper";

const Step2 = ({navigation}) => {
    const {state, book, capturePayment} = useContext(BookingContext);
    const [bookStatus, setBookStatus] = useState(null);
    const [checkoutStatus, setCheckoutStatus] = useState(null)

    let paypal_link = state.paypal_link;
    let bookingDetails = state.bookingDetails;

    let room = navigation.getParam('room');
    let hotel = navigation.getParam('hotel');
    let dateFrom = navigation.getParam('dateFrom');
    let dateTo = navigation.getParam('dateTo');
    let stars = navigation.getParam('stars');
    let user = navigation.getParam('user');
    let servicesView = navigation.getParam('servicesView');
    const date1 = new Date(dateTo);
    const date2 = new Date(dateFrom);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    let price = Math.floor(room.price);
    let priceString = helper().formatPrice(price);
    let priceArray = priceString.split('.');
    price = 0;
    for (let i = 0; i < priceArray.length; i++) {
        price = price * 1000 + parseInt(priceArray[i]);
    }
    price *= diffDays;
    priceString = helper().formatPrice(price);

    const handleResponse = (data) => {
        if (data.url.includes('PAYMENT_SUCCESS')) {
            setCheckoutStatus(true)
            capturePayment(bookingDetails.locationId, bookingDetails.id);
        } else if (data.url.includes('PAYMENT_CANCELED')) {
            setCheckoutStatus(false)
        }
    }
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{
                backgroundColor: 'white',
                paddingHorizontal: 10
            }}>
                <View style={styles.hotelStyle}>
                    <View>
                        <Image source={{uri: hotel.images[0]}} style={styles.image}/>
                    </View>
                    <View style={styles.hotelDetail}>
                        <Text style={{fontSize: 19, fontWeight: 'bold'}}>{hotel.name}</Text>
                        <View style={{flexDirection: 'row'}}>
                            {stars}
                        </View>
                        <Text style={{fontSize: 16,}}>{hotel.address}</Text>
                    </View>
                </View>
                <View style={{
                    borderTopWidth: 1,
                    borderColor: 'black',
                    marginVertical: 20
                }}>
                    <View style={{}}>
                        <View style={{marginVertical: 10, justifyContent: 'space-between', flexDirection: 'row',}}>
                            <Text style={{fontSize: 18,}}>Check - in</Text>
                            <Text style={{fontSize: 18,}}>{dateFrom}</Text>
                        </View>
                    </View>
                    <View style={{
                        borderTopWidth: 1,
                        borderColor: 'black',
                    }}>
                        <View style={{marginVertical: 10, justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text style={{fontSize: 18,}}>Check - out</Text>
                            <Text style={{fontSize: 18,}}>{dateTo}</Text>
                        </View>
                    </View>
                    <View style={{
                        borderTopWidth: 1,
                        borderColor: 'black',
                    }}>
                        <View style={{marginVertical: 10, justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text style={{fontSize: 18,}}>For</Text>
                            <Text style={{fontSize: 18,}}>{diffDays > 1 ? diffDays + ' nights' : diffDays + ' night'} ,
                                1 room</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{
                backgroundColor: 'white',
                paddingHorizontal: 10,
                marginVertical: 10,
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1
            }}>
                <View>
                    <View style={{marginVertical: 10, justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={{fontSize: 18,}}>Your full name</Text>
                        <Text style={{fontSize: 18,}}> {user.fullName}</Text>
                    </View>
                    <View style={{marginVertical: 10, justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={{fontSize: 18,}}>Your email</Text>
                        <Text style={{fontSize: 18,}}>{user.email}</Text>
                    </View>
                    <View style={{marginVertical: 10, justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={{fontSize: 18,}}>Your phone number</Text>
                        <Text style={{fontSize: 18,}}>{user.phoneNumber}</Text>
                    </View>
                    <View style={{marginVertical: 10, justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Final prices</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}> VND {priceString}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={{flexDirection: 'column', marginLeft: 10}}>
                        <Text style={{fontSize: 16, textAlign: 'left'}}>Price
                            for {diffDays > 1 ? diffDays + ' nights' : diffDays + ' night'}</Text>
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

                    {bookStatus &&
                    <Modal>
                        <View style={styles.centeredView}>
                            <Button title={"Close"} onPress={() => {
                                setBookStatus(!bookStatus)
                            }}/>
                            <WebView
                                originWhitelist={['*']}
                                source={{uri: paypal_link}}
                                onNavigationStateChange={
                                    (data) => {
                                        if (data.url.includes('PAYMENT_SUCCESS') || data.url.includes('PAYMENT_CANCELED')) {
                                            setBookStatus(false);
                                        }
                                        handleResponse(data)
                                    }
                                }
                            />
                        </View>
                    </Modal>
                    }

                    <View>
                        <Dialog.Container visible={!bookStatus && checkoutStatus !== null}>
                            <Dialog.Title style={{fontWeight: 'bold'}}>{checkoutStatus ? "Payment Successful" : "Payment Failed"}</Dialog.Title>
                            <Dialog.Description>
                                {checkoutStatus &&  <Text>The room you choose has sent a booking request to admin, please check your email regularly for reservation status updates.
                                    You can view your booking at <Text style={{fontWeight: 'bold'}}>Booking History</Text> in <Text style={{fontWeight: 'bold'}}>Account Setting</Text></Text>}
                            </Dialog.Description>
                            <Dialog.Button label="OK" onPress={() => {
                                if (checkoutStatus) {
                                    navigation.navigate('HomeScreen');
                                    setCheckoutStatus(null)
                                }
                            }}/>
                        </Dialog.Container>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            book(hotel.id, room.id, new Date(dateFrom).toISOString(), new Date(dateTo).toISOString());
                            setBookStatus(true)
                        }}
                    >
                        <Text style={{color: 'white', fontSize: 17}}>Book now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

Step2.navigationOptions = () => {
    return {
        // headerShown: false,
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hotelStyle: {
        marginTop: 10,
        flexDirection: 'row',
        width: 200,
    },
    hotelDetail: {
        marginLeft: 5
    },
    image: {
        width: 200,
        height: 200,
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
    },
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22
    },
    buttonClose: {
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

export default Step2;