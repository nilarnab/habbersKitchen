import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Platform,
    Dimensions,
    FlatList,
    useWindowDimensions,
    StyleSheet,
    Image,
    ActivityIndicator,
    RefreshControl,
    Text,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, COLOR1, COLOR2, COLOR3, ANDROID_BANNER_UNIT_ID, IOS_BANNER_UNIT_ID } from "../env";
import { useIsFocused } from '@react-navigation/native';
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import WebView from "react-native-webview";
import { jsInjectable } from "../env";
import { isEqualIcon } from "react-native-paper/lib/typescript/components/Icon";

const defaultUrl = "https://hebbarskitchen.com/ml-api/v2/list";

const InfiniteList = ({ categoryID, route, visibleIndex, categoryIndex, categoryUrl }) => {
    const isFocused = useIsFocused();
    const [feedData, setFeedData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions()
    const [show, setShow] = useState(false)

    const fetchPosts = useCallback(async () => {
        if (visibleIndex == categoryIndex) {
            setShow(true)
            console.log("category url found", categoryID)
        }
    }, [categoryUrl, page, visibleIndex]);

    useEffect(() => {
        fetchPosts();
    }, [visibleIndex]);

    const onMessageReceived = (event) => {
        const pid = JSON.parse(event.nativeEvent.data).postId;
        console.log('getting', JSON.parse(event.nativeEvent.data))
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

    return (
        <View style={styles.container}>
            {loading ? <Loader /> : <></>}
            {show ? <>
                <WebView
                    originWhitelist={['*']}
                    source={categoryUrl ? { uri: categoryUrl } : { uri: defaultUrl }}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scrollEnabled={true}
                    onLoadStart={() => { setLoading(false) }}
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
            </>
                : <></>}


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
