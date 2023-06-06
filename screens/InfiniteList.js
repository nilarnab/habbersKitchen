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

const InfiniteList = ({ categoryID, route, visibleIndex, categoryIndex }) => {
    const isFocused = useIsFocused();
    const [feedData, setFeedData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [coldStart, setColdStart] = useState(true)

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

    const handleEndReached = useCallback(() => {
        console.log("end reached ---------------------------------")
        fetchPosts();
    }, [fetchPosts, loading]);

    const ItemRender = ({ item }) => {
        let thumbimage;
        try {
            thumbimage = item.yoast_head_json.og_image[0].url;
        }
        catch (err) {
            thumbimage = 'NOTFOUND';
            console.log("image not found for " + item.id)
        }
        return (
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
        );
    };

    return (
        <View style={styles.container}>
            <FlashList
                data={feedData}
                renderItem={ItemRender}
                keyExtractor={(item, index) => {
                    return item.id;
                }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                estimatedItemSize={150}
                ListFooterComponent={
                    loading ? <ShimmeringSkeletonLoader count={2} /> : null
                }
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />}
            />
            {/* {loading && feedData.length == 0 ? <ShimmeringSkeletonLoader count={5} /> : 
            } */}
            <GAMBannerAd
                unitId={Platform.OS === 'ios' ? IOS_BANNER_UNIT_ID : ANDROID_BANNER_UNIT_ID}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
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
