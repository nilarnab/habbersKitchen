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
    useWindowDimensions,
} from "react-native";
import { firebase } from "@react-native-firebase/analytics";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, COLOR1, COLOR2, COLOR3, LIGHT_GREY, ANDROID_BANNER_UNIT_ID, IOS_BANNER_UNIT_ID } from "../env";
import { FlashList } from "@shopify/flash-list";
import { ShimmeringSkeletonLoader } from "./PostSkeletonLoader";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { Pressable } from "react-native";
import { ANDROID_INTER_UNIT_ID, IOS_INTER_UNIT_ID } from '../env';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { BannerAd } from 'react-native-google-mobile-ads';
const InfiniteList = ({ categoryID, route, visibleIndex, categoryIndex }) => {
    // const interstitial = InterstitialAd.createForAdRequest(ANDROID_INTER_UNIT_ID, {
    //     requestNonPersonalizedAdsOnly: true,
    // });

    const isFocused = useIsFocused();
    const [feedData, setFeedData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [coldStart, setColdStart] = useState(true)
    const { height, width } = useWindowDimensions()
    const [numColumns, setNumColumns] = useState(1)

    useEffect(() => {
        if (width > 768) {
            setNumColumns(2)
        }
        else {
            setNumColumns(1)
        }
    }, [height, width])



    // Function to handle the refresh action
    const handleRefresh = () => {
        // Set the refreshing state to true
        setRefreshing(true);
        // Perform your refresh logic here
        fetchPosts();
        // Once the refresh is complete, set the refreshing state back to false
        setRefreshing(false);
    };

    const fetchPosts = useCallback(async () => {
        if (visibleIndex == categoryIndex) {
            setLoading(true);
            try {
                var startTime = Date.now()
                const jsonData = (await axios.get(
                    `${BASE_URL}posts/?page=${page}${route !== 'Home' ? "&categories=" + categoryID : ""}`
                )).data;
                if (!jsonData) return
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

    const handleEndReached = useCallback(() => {
        fetchPosts();
    }, [fetchPosts, loading]);

    const ItemRender = ({ item, index }) => {
        let thumbimage;
        try {
            thumbimage = item.yoast_head_json.og_image[0].url;
        }
        catch (err) {
            thumbimage = 'NOTFOUND';
            console.log("image not found for " + item.id)
        }
        return (<>
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate("Post", { pid: item.id });
                }}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: thumbimage,
                        }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.yoast_head_json.title}</Text>
                </View>
            </TouchableOpacity>
            {index % 7 == 0 ? < BannerAd
                unitId={Platform.OS === 'ios' ? IOS_BANNER_UNIT_ID : ANDROID_BANNER_UNIT_ID}
                size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,


                }}
            /> : <></>}
        </>
        );
    };

    return (
        <Pressable style={styles.container}>
            {/* <ShimmeringSkeletonLoader count={2} numColumns={numColumns} /> */}

            <FlashList
                data={feedData}
                renderItem={ItemRender}
                keyExtractor={(item, index) => {
                    return item.id;
                }}
                key={numColumns}
                horizontal={false}
                numColumns={numColumns}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.7}
                estimatedItemSize={170}
                ListFooterComponent={
                    loading ? <ShimmeringSkeletonLoader count={2} numColumns={numColumns} /> : null
                }
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />}
            />

            <GAMBannerAd
                unitId={Platform.OS === 'ios' ? IOS_BANNER_UNIT_ID : ANDROID_BANNER_UNIT_ID}
                sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    itemContainer: {
        height: 170,
        width: "100%",
        flexDirection: "row",
        borderBottomColor: LIGHT_GREY,
        borderBottomWidth: 0.5,
    },
    imageContainer: {
        width: "50%",
    },
    image: {
        width: "80%",
        height: 150,
        marginLeft: "10%",
        marginTop: 10,
    },
    textContainer: {
        width: "50%",
        paddingTop: 10,
        paddingRight: 20,
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