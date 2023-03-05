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

import { useIsFocused } from '@react-navigation/native';


const dictionary = {
    'pre-login': [
        'connecting with server',
        'while we are at it',
        'let\'s tell you what we are',
        'we are a onilne seller company',
        'with a whole new concept',
        'we make choosing easier',
        'by providing top vloggers videos',
        'this is to make sure',
        'you get different views',
        'by different vloggers',
        'to make the best decision',
        'looks like it is taking longer than usual',
    ],

    'trending': [
        'fetching latest reels',
        'waiting ..',
        'pariently waiting ..',
    ]
}

const UniversalLoader = ({ verbose, volume, color, size }) => {

    const [pageNumber, setPageNumber] = useState(0)
    const isFocused = useIsFocused();

    useEffect(() => {

        const verboseEngine = async () => {

            if (isFocused) {
                if (verbose) {
                    await AsyncStorage.setItem('loaderIndex', '0')

                    let myInterval = setInterval(async () => {

                        var index = await AsyncStorage.getItem('loaderIndex')
                        index = parseInt(index)
                        console.log(index)
                        setPageNumber(index)

                        if (index < dictionary[volume].length) {

                            await AsyncStorage.setItem('loaderIndex', (index + 1).toString())
                        }
                        else {
                            console.log('clearing interval')
                            clearInterval(myInterval)
                        }

                    }, 2000)

                }
            }

        }

        verboseEngine()


    }, [isFocused])

    if (!verbose) {
        return (
            <ActivityIndicator size={size} color={color} />
        )
    }
    else {
        return (
            <View style={{ flexDirection: 'row' }}>
                <ActivityIndicator size={size} color={color} />
                <Text style={{ fontSize: 16, marginLeft: 5 }}>{dictionary[volume][pageNumber]}</Text>
            </View>
        )
    }

}

export default UniversalLoader;