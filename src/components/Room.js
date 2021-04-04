import React from "react";
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from "react-native-elements";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {withNavigation} from "react-navigation";
const Room = ({}) => {
    return (
        <View>
            <Text>Room</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default withNavigation(Room);