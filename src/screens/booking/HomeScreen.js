import React, {useContext, useEffect} from "react";
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Context as BookingContext} from '../../context/BookingContext';
import Hotel from "../../components/Hotel";
import City from "../../components/City";
import Header from "../../components/Header";

const HomeScreen = () => {
    const {state, getDataOrderByScore, getCities} = useContext(BookingContext);
    useEffect(() => {
        getDataOrderByScore();
        getCities();
    }, [])
    var hotel = state.data
    var cities = state.cities;
    return (
        <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
            <Header text="Vibo"/>
            <View style={styles.city}>
                <FlatList
                    horizontal={true}
                    data={cities}
                    renderItem={({item}) => {
                        return (<City
                            thumbnail={item.thumbnail}
                            name={item.name}
                            averagePrice={item.averagePrice}
                        />)
                    }}
                />
            </View>
            <View style={styles.hotels}>
                <Text style={styles.header}>Top Hotels</Text>
                <FlatList
                    style={{marginTop: 5}}
                    data={hotel}
                    renderItem={({item}) => {
                        return (
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <Hotel
                                    id={item.id}
                                    score={item.score}
                                    image={item.images}
                                    name={item.name}
                                    address={item.address}
                                />
                            </View>)
                    }}
                    numColumns={2}
                />
            </View>
        </SafeAreaView>
    )
}

HomeScreen.navigationOptions = () => {
    return {
        headerShown: false,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: '#e1eef6',
    },
    image: {
        width: 400,
        height: 200
    },
    city: {
        marginTop: 5,
        paddingBottom: 5,
        height: 180,
    },
    hotels: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    header: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    }
});

export default HomeScreen;