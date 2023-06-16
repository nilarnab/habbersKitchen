import React, { useEffect, useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL, COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import fetch_home from '../methods/fetch';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Header } from './SearchResultHeader';
import { ActivityIndicator } from 'react-native-paper';
import { ShimmeringSkeletonLoader } from './PostSkeletonLoader';
import axios from 'axios';
import ReactGA from 'react-ga';
export const SearchResult = (props) => {
    const [feedData, setFeedData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const { query } = props.route.params
    const POST_PER_PAGE = 10
    const navigation = useNavigation();

    const fetchResults = async (page) => {
        var startTime = Date.now();
        console.log('asking or page', `https://hebbarskitchen.com/wp-json/wp/v2/posts?search=${query}&order=desc&orderby=date&offset=${feedData.length}&per_page=${POST_PER_PAGE}`)
        setLoading(true)
        var feedDataTemp = feedData.map((item, index) => { return item })
        const response = await axios.get(`https://hebbarskitchen.com/wp-json/wp/v2/posts?search=${query}&order=desc&orderby=date&offset=${feedData.length}&per_page=${POST_PER_PAGE}`)
        console.log('got response', Date.now() - startTime)
        const responseJson = response.data;
        console.log('converted to json', Date.now() - startTime)
        responseJson.forEach((item, index) => {
            feedDataTemp.push(item)
        })
        console.log('data ready', Date.now() - startTime)
        setFeedData(feedDataTemp)
        setLoading(false)
    }

    useEffect(() => {
        ReactGA.pageview('SearchResult');
        fetchResults(1)
    }, [])

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

    const handleEndReached = async () => {
        fetchResults(page + 1)
        setPage(page + 1)
    }

    if (loading && feedData.length === 0) {
        return <>
            <Header />
            <ShimmeringSkeletonLoader count={5} />
        </>
    }
    else {
        return <>

            <View style={styles.container}>
                <Header />

                <FlashList
                    data={feedData}
                    renderItem={ItemRender}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    estimatedItemSize={300}
                    ListFooterComponent={
                        loading ? <ShimmeringSkeletonLoader count={3} /> : null
                    }
                // refreshControl={<RefreshControl
                //     refreshing={refreshing}
                //     onRefresh={handleRefresh}
                // />}
                />
            </View>
        </>
    }



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