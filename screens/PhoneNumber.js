import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button, TextInput, Linking, TouchableOpacity, Image, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview'
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import LinearGradient from 'react-native-linear-gradient';
import { BASE_URL } from '../env'
import { APP_NAME } from '../env';

import UniversalLoader from './UniversalLoader';


export default function PhoneNumber(props) {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [authToken, setAuthToken] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMesssage, setErrorMessage] = useState(null);

    // Handle user state changes
    async function onAuthStateChanged(user) {
        if (user) {
            // console.log("user state changed to logged in")
            uid = user.uid
            phone = user.phoneNumber
            // console.log("starting session with", uid, phone)

            // now suppposed to start a new session in mongo db
            var user_data = await startSession(uid, phone)

            // now populate cache storage 
            await addUserToCache(uid, user_data)

            // complete
            props.navigation.navigate("Main");
        }
        else {
            // reset state if you need to  
            // console.log("not logged int")
            // dispatch({ type: "reset_user" });
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const startSession = async (uid, phone) => {
        // make  a new session with uid and phonenumber
        // console.log("starting session")

        // call the server 
        const resp = await fetch(BASE_URL + `sessionManage/create?uuid=${uid}&phone_num=${phone}`, { method: 'POST' })
        var resp_json = await resp.json();

        // console.log(resp_json)
        // console.log("session started")

        return resp_json.user
    }


    const addUserToCache = async (uid, user) => {

        // adding user to cache
        // console.log("adding data to cache")
        // console.log(user)
        // console.log(uid)
        // initialization
        var name = user.name
        var email = user.email
        var uuid = uid
        var user_id = user._id

        if (!name) name = ''
        if (!email) email = ''

        // adding pairs in async storage
        await AsyncStorage.setItem('name', name)
        await AsyncStorage.setItem('phone', phoneNumber)
        await AsyncStorage.setItem('uuid', uuid)
        await AsyncStorage.setItem('email', email)
        await AsyncStorage.setItem('user_id', user_id)

        // console.log("added in cache")

    }

    async function signIn(phoneNumber) {
        // setConverse("Sending Verification code .. ")
        // console.log("trying to sing in")
        // phoneNumber = "+91" + phoneNumber
        console.log(phoneNumber, phoneNumber.length)
        try {

            if (phoneNumber.length != 13) {
                setErrorMessage("Uh, phone number should be 10 digits long")
            }
            else {
                const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
                setConfirm(confirmation);
            }
        } catch (error) {
            alert(error);
        }
    }

    async function confirmVerificationCode() {


        // first see if already logged in
        var user = auth().currentUser
        if (user) {
            // console.log("explicit check, already logged in")
            await onAuthStateChanged(user)
            props.navigation.navigate('Main')
        }
        else {
            try {
                // console.log("user not logged in, trying")
                await confirm.confirm(authToken);
                // console.log("auth complete")
                var user = auth().currentUser
                if (user) {
                    // console.log("user state changed to logged in")
                    uid = user.uid
                    phone = user.phoneNumber
                    // console.log("starting session with", uid, phone)

                    // now suppposed to start a new session in mongo db
                    var user_data = await startSession(uid, phone)

                    // now populate cache storage 
                    await addUserToCache(uid, user_data)

                    // complete
                    props.navigation.navigate("Main");
                }
                else {
                    // reset state if you need to  
                    // console.log("not logged int")
                    // dispatch({ type: "reset_user" });
                }

            } catch (error) {
                setConfirm(null);
                alert(error);
            }

        }

    }

    const Loader = () => {

        if (!confirm) {

            if (loading) {
                return <>
                    <UniversalLoader verbose={1} volume={'pre-login'} color={'#2178bf'} size={'small'} />
                </>
            }
        }
        else {
            if (loading) {
                return <>
                    <UniversalLoader verbose={0} />
                </>
            }

        }




    }


    if (confirm) {


        return <>
            <SafeAreaView style={{
                backgroundColor: 'white',
                height: '100%',
                width: '100%'
            }}>
                <Image source={{ uri: 'https://i.ibb.co/HdC2YQK/Whats-App-Image-2023-02-08-at-8-39-29-PM.jpg' }} style={{
                    height: '60%',
                    width: '100%',
                    transform: [{ translateY: 50 }],
                }} />
                <LinearGradient
                    colors={['white', 'white']}
                    style={{
                        alignItems: 'center',
                        position: 'absolute',
                        height: '40%',
                        width: '100%',
                        bottom: 0,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        shadowColor: 'black',
                        elevation: 10,
                        paddingTop: 40,
                        borderColor: 'lightgrey',
                        borderWidth: 1,
                    }}>

                    <View
                        style={{
                            backgroundColor: 'lightgray',
                            height: 1,
                            width: '90%',
                            transform: [{ translateY: 15 }],
                        }}></View>

                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: 'black',
                                backgroundColor: 'white',
                                paddingHorizontal: 10,
                            }}>You should get an otp</Text>

                    </View>

                    <Loader />

                    <View
                        style={{
                            borderColor: 'lightgray',
                            borderWidth: 1,
                            borderRadius: 5,
                            width: '40%',
                            flexDirection: 'row',
                            marginTop: 20,
                        }}>
                        <TextInput
                            onChangeText={(text) => { setAuthToken(text) }}
                            placeholder="Otp"
                            autoComplete="sms-otp" // android
                            textContentType="oneTimeCode" // ios
                            placeholderTextColor="gray"
                            style={{
                                color: 'black',
                                width: '100%',
                                paddingLeft: 10,
                            }}>
                        </TextInput>
                    </View>

                    <TouchableOpacity title='send otp' onPress={async () => {
                        setLoading(true)
                        await confirmVerificationCode(authToken)
                        setLoading(false)
                    }}
                        style={{
                            marginTop: 10,
                            marignHorizontal: 20,
                            backgroundColor: 'white',
                            color: 'white',
                            borderRadius: 10,
                            padding: 10,
                            width: '40%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#2178bf',
                            alignSelf: 'center'
                        }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Verify
                        </Text>
                    </TouchableOpacity>


                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 15, color: 'red' }}>{errorMesssage}</Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: 'lightgray',
                            height: 1,
                            width: '90%',
                        }}></View>

                </LinearGradient>

            </SafeAreaView>
        </>

    }
    else {
        return (
            <SafeAreaView style={{
                backgroundColor: 'white',
                height: '100%',
                width: '100%'
            }}>
                <Image source={{ uri: 'https://i.ibb.co/HdC2YQK/Whats-App-Image-2023-02-08-at-8-39-29-PM.jpg' }} style={{
                    height: '60%',
                    width: '100%',
                    transform: [{ translateY: 50 }],
                }} />
                <LinearGradient
                    colors={['white', 'white']}
                    style={{
                        alignItems: 'center',
                        position: 'absolute',
                        height: '40%',
                        width: '100%',
                        bottom: 0,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        shadowColor: 'black',
                        elevation: 10,
                        paddingTop: 40,
                        borderColor: 'lightgrey',
                        borderWidth: 1,
                    }}>

                    <View
                        style={{
                            backgroundColor: 'lightgray',
                            height: 1,
                            width: '90%',
                            transform: [{ translateY: 15 }],
                        }}></View>

                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: 'black',
                                backgroundColor: 'white',
                                paddingHorizontal: 10,
                            }}>Welcome, lets login</Text>

                    </View>
                    <View style={{
                        marginTop: 15,
                    }}>
                        <Loader />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '80%',
                        marginTop: 15
                    }}>

                        <View
                            style={{
                                borderColor: 'lightgray',
                                borderWidth: 1,
                                borderRadius: 5,
                                width: 'auto',
                                flexDirection: 'row',
                                marginRight: 10,
                                height: 'auto',
                                padding: 5,
                            }}>
                            <Image source={{ uri: 'https://img.icons8.com/color/48/null/india.png' }} style={{ height: 40, width: 40 }} />
                        </View>
                        <View
                            style={{
                                borderColor: 'lightgray',
                                borderWidth: 1,
                                borderRadius: 5,
                                width: '80%',
                                flexDirection: 'row',
                            }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: 'black',
                                padding: 15
                            }}>+91</Text>
                            <TextInput
                                onChangeText={(text) => { setPhoneNumber('+91' + text) }}
                                placeholder="Enter your phone number"
                                placeholderTextColor="gray"
                                autoComplete="tel" // android
                                textContentType="telephoneNumber" // ios
                                keyboardType="phone-pad"
                                style={{
                                    color: 'black',
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 0,
                                    width: '70%',
                                    textContentType: 'telephoneNumber',
                                    // marginLeft:,
                                    fontSize: 15,
                                }}>
                            </TextInput>
                        </View>

                    </View>
                    <View style={{ marginTop: 20, width: '100%' }}>
                        <TouchableOpacity onPress={async () => {
                            setLoading(true)
                            await signIn(phoneNumber)
                            setLoading(false)
                        }} style={{
                            marginTop: 10,
                            marignHorizontal: 20,
                            backgroundColor: 'white',
                            color: 'white',
                            borderRadius: 10,
                            padding: 10,
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#2178bf',
                            alignSelf: 'center'
                        }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Send OTP</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 15, color: 'red' }}>{errorMesssage}</Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: 'lightgray',
                            height: 1,
                            width: '90%',
                        }}></View>

                </LinearGradient>

            </SafeAreaView>

        )

    }


}

