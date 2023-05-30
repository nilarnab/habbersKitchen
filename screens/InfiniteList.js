import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Dimensions,
    FlatList,
    StyleSheet,
    Image,
    ActivityIndicator,
    Text,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, COLOR1, COLOR2, COLOR3 } from "../env";
import { FlashList } from "@shopify/flash-list";

const InfiniteList = ({ categoryID }) => {
    const [feedData, setFeedData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${BASE_URL}posts/?page=${page}${categoryID ? "&categories=" + categoryID : ""}`
            );
            const jsonData = await response.json();
            if (jsonData.length > 0) {
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
        fetchPosts();
    }, [fetchPosts]);

    const handleEndReached = useCallback(() => {
        if (!loading) {
            fetchPosts();
        }
    }, [fetchPosts, loading]);

    const ItemRender = ({ item }) => {
        console.log("item", item.id);
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
                            uri: item.yoast_head_json.og_image[0].url,
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
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                estimatedItemSize={300}
                ListFooterComponent={
                    loading ? <ActivityIndicator style={styles.loadingIndicator} /> : null
                }
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
