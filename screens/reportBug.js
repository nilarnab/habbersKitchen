import React, { useEffect, useState, useRef } from 'react';
import { Animated, Keyboard, SafeAreaView, Image, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, TouchableOpacity, } from 'react-native';
import { COLOR1, COLOR2, COLOR3, COLOR4, COLOR5, COLOR_GREEN } from '../env'
import { BASE_URL } from '../env';
import fetch_home from '../methods/fetch'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneNumber from './PhoneNumber';


export const BugReport = ({ navigation }) => {


    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [bugReport, setBugReport] = useState(null)

    useEffect(() => {

        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    const submitBug = async () => {
        var phoneNum = await AsyncStorage.getItem('phone')
        var userId = await AsyncStorage.getItem('user_id')

        if (bugReport == null || bugReport == '') {
            alert("Bug report can't be empty")
        }
        else {
            console.log('submit bug:', bugReport, 'by', phoneNum)
            var resp_raw = await fetch_home(BASE_URL + `bug/report?user_id=${userId}&phone=${phoneNum}`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'report': bugReport
                    })
                })

            var resp_json = await resp_raw.json()

            if (resp_json.verdict == 1) {
                setBugReport('')
                alert('We got that! thanks a lot')
                navigation.navigate('Main')
            }
            else {
                alert('Something went wrong, can you, uh, try again ?')
            }

        }

    }

    const TreeImage = () => {

        if (isKeyboardVisible) {
            return <></>
        }
        else {
            return <>
                <Image source={{ uri: 'https://ouch-cdn2.icons8.com/0-TuQ1aB2je_gMCXH3hrYa48o9YwKiDkYO2ZRk5DFzY/rs:fit:256:615/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNDcv/ODUzNDkzNDctN2Jl/ZS00NmE3LTlmN2It/YTYzYjQ2ZjE5NzVk/LnN2Zw.png' }} style={{
                    height: 360,
                    width: 150,
                }} />
            </>
        }
    }

    return <>


        <ScrollView contentContainerStyle={styles.holder}>
            <TreeImage />
            <Text style={{
                fontWeight: 'bold',
                fontSize: 30,
                color: 'black'
            }}>
                Just growing up ..
            </Text>
            <Text style={{
                fontSize: 15,
                color: 'black',
                backgroundColor: COLOR2,
                padding: 20,
                borderRadius: 20,
                marginTop: 10,
            }}>
                We understand you have come to this page as you encountered an inconvenience. We have just started and there can be mistakes, we have a long way to go ..
            </Text>

            <TextInput placeholder='Let us know where we were wrong !'
                placeholderTextColor='black'
                numberOfLines={2}
                multiline
                onChangeText={(text) => setBugReport(text)}
                value={bugReport}
                style={{
                    marginTop: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    width: '80%'
                }}></TextInput>

            <TouchableOpacity style={{
                width: '50%',
                backgroundColor: COLOR_GREEN,
                marginTop: 20,
                padding: 20,
                borderRadius: 10,
            }} onPress={submitBug}>
                <Text style={{
                    textAlign: 'center',
                    color: COLOR1
                }}>Report Bug</Text>
            </TouchableOpacity>

        </ScrollView>

    </>
}



const styles = StyleSheet.create({
    holder: {
        height: '100%',
        width: '100%',
        backgroundColor: COLOR1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50,
    }

})