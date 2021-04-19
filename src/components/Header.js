import React from "react";
import {Image, StyleSheet, View} from 'react-native';
import {Text} from "react-native-elements";
import Logo from "../image/logo.png";

const Header = ({text}) => {
    return (
        <View style={styles.header}>
            <Image source={Logo} style={styles.logo}/>
            <Text h3 style={styles.title}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    title: {
        marginTop: 10
    },
})

export default Header;