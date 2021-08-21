import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {Context as BookingContext} from '../../context/BookingContext';
import Hotel from "../../components/Hotel";
import City from "../../components/City";
import Header from "../../components/Header";

const HomeScreen = () => {
    const {state, getDataOrderByScore, getCities, getHotelByCity} = useContext(BookingContext);

    const [search, setSearch] = useState("");

    useEffect(() => {
        getCities();
    }, [])

    useEffect(() => {
        getDataOrderByScore(search);
    }, [search])

    var hotel = state.data;
    var cities = state.cities;

    return (
        <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
            <Header text="Vibo"/>
            <SearchBar
                placeholder="Search"
                // data={this.state.searchResultFriendsList}
                value={search}
                onChangeText={setSearch}
                style={styles.searchBar}
                showLoading={true}
                lightTheme={true}
                round
                containerStyle={styles.searchContainer}
            />
            <View style={styles.city}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={cities}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    renderItem={({item}) => {
                        return (<City
                            thumbnail={item.thumbnail}
                            name={item.name}
                            averagePrice={item.averagePrice}
                            getHotelByCity={getHotelByCity}
                            cityId={item.id}
                        />)
                    }}
                />
            </View>
            <View style={styles.hotels}>
                <Text style={styles.header}>{state.searchField}</Text>
                {hotel && hotel.length > 0 &&
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    extraData={state.data}
                    style={{marginTop: 5}}
                    data={hotel}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    renderItem={({item}) => {
                        return (
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <Hotel
                                    id={item.id}
                                    score={item.score}
                                    image={item.images}
                                    name={item.name}
                                    address={item.city ? item.city.name : 'Unknown'}
                                    check={item.userId !== null}
                                />
                            </View>
                        )
                    }}
                    numColumns={2}
                />
                }

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
    },
    searchContainer: {
        backgroundColor: '#e1eef6',
        borderWidth: 0, //no effect
        shadowColor: 'white', //no effect
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    },
    searchBar: {
        color: 'black',
        width: "100%",
        borderWidth: 0, //no effect
        shadowColor: 'white', //no effect
    },
});

export default HomeScreen;