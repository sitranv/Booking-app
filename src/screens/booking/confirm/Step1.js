import React, {useContext} from "react";
import {FlatList, Image, StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, ListItem} from "react-native-elements";
import {SafeAreaView} from "react-navigation";
import {Entypo, FontAwesome} from "@expo/vector-icons";

const Step1 = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
            <Text h3 style={{marginLeft: 6, marginVertical: 5}}>Step1</Text>
        </SafeAreaView>
    )
}

Step1.navigationOptions = () => {
    return {
        headerShown: false,
    }
}
const styles = StyleSheet.create({
    container : {
        paddingTop: 5,
        backgroundColor: '#e1eef6',
        flex : 1,
    }
})

export default Step1;