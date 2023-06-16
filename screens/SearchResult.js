import React, { useEffect, useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL, COLOR1, COLOR2, COLOR3, COLOR4, COLOR5, jsInjectable } from '../env';
import fetch_home from '../methods/fetch';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Header } from './SearchResultHeader';
import { ActivityIndicator } from 'react-native-paper';
import { ShimmeringSkeletonLoader } from './PostSkeletonLoader';
import WebView from 'react-native-webview';
import axios from 'axios';
import ReactGA from 'react-ga';


export const SearchResult = (props) => {
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();

    useEffect(() => {
        ReactGA.pageview('SearchResult');
    }, [])

    const onMessageReceived = (event) => {
        const pid = JSON.parse(event.nativeEvent.data).postId;
        // Handle the received message here
        navigation.navigate("Post", { pid: pid });

    };


    const Loader = () => {
        return <>
            <View style={{
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 1
            }}>
                <ActivityIndicator size={'large'} color={COLOR2} />
            </View>
        </>
    }

    return <>

        <View style={styles.container}>
            <Header />
            {loading ? <Loader /> : <></>}
            <WebView
                originWhitelist={['*']}
                source={{ uri: `https://hebbarskitchen.com/ml-api/v2/list?search=${props.route.params.query.replaceAll(" ", "%20")}&order=DESC&orderby=date` }}
                scalesPageToFit={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onLoadStart={() => { setLoading(false) }}
                scrollEnabled={true}
                injectedJavaScript={jsInjectable}
                nestedScrollEnabled
                onMessage={onMessageReceived}
            />
        </View>
    </>
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    itemContainer: {
        height: 200,
        width: "100%",
        flexDirection: "row",
        borderBottomColor: COLOR3,
        borderBottomWidth: 1,
    },
    imageContainer: {
        width: "50%",
    },
    image: {
        width: "80%",
        height: "80%",
        marginLeft: "10%",
        marginTop: "10%",
    },
    textContainer: {
        width: "50%",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 15,
        color: COLOR2,
        fontWeight: "bold",
    },
    loadingIndicator: {
        marginVertical: 20,
    },
});