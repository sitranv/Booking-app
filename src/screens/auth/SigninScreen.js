import React, {useContext, useState} from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Picker} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Input, Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons'
import Logo from '../../image/logo.png'
import NavLink from "../../components/Navlink";
import {NavigationEvents} from "react-navigation";
import { Context as AuthContext } from '../../context/AuthContext';
import ErrCommon from "../../components/ErrCommon";

const SigninScreen = () => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    return (
        <View style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <View style={styles.header}>
                <Image source={Logo} style={styles.logo}/>
                <Text h3 style={styles.title}>Signin to Vibo</Text>
            </View>
            {state.errorMessage? <ErrCommon text={state.errorMessage}/>: null}

            <KeyboardAwareScrollView
                style={styles.input}
                behavior="padding"
            >
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    autoCorrect={true}
                    leftIcon={<Feather style={{marginRight: 5}} name="mail" size={24} color="black"/>}
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
                <TouchableOpacity
                    style={styles.buttonView}
                    onPress={() => {signin({email, password})}}
                >
                    <Text style={{color: 'white',}}>Signin</Text>
                </TouchableOpacity>
                <NavLink
                    routeName = "SignupScreen"
                    text="Don't have an account? Go back to sign up"
                />
            </KeyboardAwareScrollView>
        </View>

    )
}

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
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
        marginTop: 40,
        marginBottom: 20
    }
})

export default SigninScreen;