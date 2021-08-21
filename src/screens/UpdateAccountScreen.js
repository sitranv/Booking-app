import React, {useContext, useState} from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Picker, Button} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Input, Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context as AuthContext} from '../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

const UpdateAccountScreen = () => {
    const {state, updateProfile, uploadAvatar} = useContext(AuthContext);
    let user = state.user
    let fileUrl = state.fileUrl;
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [city, setCity] = useState('Da Nang');
    const [phoneNumber, setPhoneNumber] = useState('0122223123');
    // const [image, setImage] = useState(null);

    const [avatar, setAvatar] = useState(user.avatar);

    const handleChoosePhoto = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            // mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // quality: 1,
        });
        setAvatar(image.uri);
        let array = image.uri.split('/');
        let fileName = image.uri.split('/')[array.length - 1];
        let type = "";
        if(fileName.includes('jpg')) {
            type = 'image/jpeg'
        } else if(fileName.includes('png')){
            type = 'image/png'
        }
        console.log('image', image)
        uploadAvatar({fileName, type}, image)
    }

    return (
        <View style={styles.container}>

            <KeyboardAwareScrollView
                style={styles.input}
                behavior="padding"
            >
                <TouchableOpacity onPress={handleChoosePhoto}>
                    <Image source={{uri: avatar == null ? "https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png":  avatar}}
                           style={styles.avatar}/>
                </TouchableOpacity>

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
                    placeholder="Phone"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    autoCapitalize='none'
                    autoCorrect={false}
                    leftIcon={<MaterialIcons style={{marginRight: 5}} name="local-phone" size={24} color="black"/>}
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
                    onPress={() => {
                        updateProfile({fullName, address, phoneNumber, avatar: fileUrl})
                    }}
                >
                    <Text style={{color: 'white',}}>Update</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>

    )
}

UpdateAccountScreen.navigationOptions = () => {
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
        // marginTop: 30,
        marginBottom: 20
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        marginBottom: 10
    }
})

export default UpdateAccountScreen;