import React, {useContext, useState} from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Picker} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Input, Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavLink from "../../components/Navlink";
import { Context as AuthContext } from '../../context/AuthContext';
import ErrCommon from "../../components/ErrCommon";
import {NavigationEvents} from "react-navigation";

const SignupScreen = () => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);

    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [password, setPassword] = useState(null);
    const [city, setCity] = useState(null);
    // const [image, setImage] = useState(null);
    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <Header  text="Signup to Vibo"/>
            {state.errorMessage? <ErrCommon text={state.errorMessage}/>: null}
            <KeyboardAwareScrollView
                style={styles.input}
                behavior="padding"
            >
                <Input
                    placeholder="Full name"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCorrect={false}
                    leftIcon={<Feather style={{marginRight: 5}} name="user" size={24} color="black"/>}
                />
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    autoCorrect={false}
                    leftIcon={<Feather style={{marginRight: 5}} name="mail" size={24} color="black"/>}
                />
                <Input
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    autoCapitalize='none'
                    autoCorrect={false}
                    leftIcon={<Icon style={{marginRight: 5}} name="address-book-o" size={24} color="black"/>}
                />
                <Input
                    secureTextEntry
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize='none'
                    autoCorrect={false}
                    leftIcon={<Feather style={{marginRight: 5}} name="lock" size={24} color="black"/>}
                />
                <View style={{marginLeft: 7, marginBottom: 8}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <MaterialIcons name="location-city" size={24} color="black"/>
                        <Text style={{marginLeft: 5, fontSize: 18}}>City</Text>
                    </View>
                    <Picker
                        selectedValue={city}
                        onValueChange={(itemValue) => {
                            setCity(itemValue)
                        }}
                    >
                        <Picker.Item label="Da Nang" value="Da Nang"/>
                        <Picker.Item label="Hue" value="Hue"/>
                        <Picker.Item label="Ha Noi" value="Ha Noi"/>
                        <Picker.Item label="Ho Chi Minh" value="Ho Chi Minh"/>
                        <Picker.Item label="Nha Trang" value="Nha Trang"/>
                        <Picker.Item label="Vung Tau" value="Vung Tau"/>
                    </Picker>
                </View>
                <TouchableOpacity
                    activeOpacity={.7}
                    style={styles.buttonView}
                    onPress={() => {signup({email, password, city, address})}}
                >
                    <Text style={{color: 'white',}}>Signup</Text>
                </TouchableOpacity>
                <NavLink
                    routeName = "SigninScreen"
                    text="Already have an account? Signin instead"
                />
            </KeyboardAwareScrollView>
        </View>

    )
}

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        margin: 10
    },
    header: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 150,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#2274A5'
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    title: {
        marginTop: 10
    },
    input: {
        marginTop: 30,
        marginBottom: 20
    }
})

export default SignupScreen;