import React, {useContext, useEffect} from "react";
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import { Context as BookingContext } from '../../context/BookingContext';

const HomeScreen = () => {
    const {state, getData} = useContext(BookingContext);
    useEffect(() => {
        getData();
    }, [])
    return(
        <SafeAreaView forceInset={{top:'always'}}>
            <Text h3>Create Track</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});

export default HomeScreen;