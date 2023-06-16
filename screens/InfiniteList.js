import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Platform,
    Dimensions,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
    RefreshControl,
    Text,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, COLOR1, COLOR2, COLOR3, ANDROID_BANNER_UNIT_ID, IOS_BANNER_UNIT_ID } from "../env";
import { FlashList } from "@shopify/flash-list";
import { ShimmeringSkeletonLoader } from "./PostSkeletonLoader";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import WebView from "react-native-webview";

const InfiniteList = ({ categoryID, route, visibleIndex, categoryIndex }) => {
    const isFocused = useIsFocused();
    const [feedData, setFeedData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    console.log(categoryID, visibleIndex, categoryIndex)


    const fetchPosts = useCallback(async () => {
        if (visibleIndex == categoryIndex) {
            console.log('fetching post for', categoryIndex, 'with page number', page)
            setLoading(true);
            try {
                var startTime = Date.now()
                const jsonData = (await axios.get(
                    `${BASE_URL}posts/?page=${page}${route !== 'Home' ? "&categories=" + categoryID : ""}`
                )).data;
                console.log("RESPONSE TIME", Date.now() - startTime)
                if (!jsonData) return
                // const jsonData = await response.json();

                if (jsonData && jsonData.length > 0) {
                    setFeedData((prevData) => [...prevData, ...jsonData]);
                    setPage((prevPage) => prevPage + 1);
                }
            } catch (error) {
                console.log("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }
    }, [categoryID, page, visibleIndex]);

    useEffect(() => {
        fetchPosts();
    }, [visibleIndex]);

    const jsInjectable = `// Add an event listener to all ons-list-item elements
    const listItems = document.getElementsByTagName('ons-list-item');
    Array.from(listItems).forEach((item) => {
      item.addEventListener('click', () => {
        // Get the data-ml-post-id attribute value
        const postId = item.getAttribute('data-ml-post-id');
        
        // Create a message object with the post ID
        const message = { postId };
        
        // Send the message back to the WebView
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      });
    });`

    const onMessageReceived = (event) => {
        const pid = JSON.parse(event.nativeEvent.data).postId;
        // Handle the received message here
        navigation.navigate("Post", { pid: pid });

    };

    return (
        <View style={styles.container}>

            <WebView
                originWhitelist={['*']}
                source={{ uri: 'https://hebbarskitchen.com/ml-api/v2/list' }}
                scalesPageToFit={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scrollEnabled={true}
                injectedJavaScript={jsInjectable}
                nestedScrollEnabled
                onMessage={onMessageReceived}
            />

            <GAMBannerAd
                unitId={Platform.OS === 'ios' ? IOS_BANNER_UNIT_ID : ANDROID_BANNER_UNIT_ID}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: false,
                }}
            />
        </View>
    );
};

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

export default InfiniteList;
