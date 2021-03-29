import React from "react";
import {StyleSheet, View} from 'react-native';
import {Text} from "react-native-elements";

const ErrCommon = ({text}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.link}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#BF0A30',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15
    },
    link: {
        fontSize: 15,
        color: 'white',
        marginLeft:10
    },
})

export default ErrCommon;