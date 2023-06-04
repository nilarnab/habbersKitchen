import React, { useEffect, useState, useCallback } from "react";
import {
    View,
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
import { BASE_URL, COLOR1, COLOR2, COLOR3 } from "../env";
import { FlashList } from "@shopify/flash-list";
import { ShimmeringSkeletonLoader } from "./PostSkeletonLoader";
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";

const InfiniteList = ({ categoryID, route }) => {
    const isFocused = useIsFocused();
    const [feedData, setFeedData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

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
    }, [categoryID, page]);

    useEffect(() => {
        if (isFocused) {
            fetchPosts();
        }
    }, []);

    const handleEndReached = useCallback(() => {
        if (!loading) {
            fetchPosts();
        }
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

            {loading && feedData.length == 0 ? <ShimmeringSkeletonLoader count={5} /> : <FlashList
                data={feedData}
                renderItem={ItemRender}
                keyExtractor={(item, index) => {
                    return item.id;
                }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                estimatedItemSize={300}
                ListFooterComponent={
                    loading ? <ShimmeringSkeletonLoader count={2} /> : null
                }
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />}
            />
            }
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
