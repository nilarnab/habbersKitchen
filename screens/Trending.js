import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, AppRegistry, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, ActivityIndicator, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../env';
import { useIsFocused } from '@react-navigation/native';
import Video, { DRMType } from 'react-native-video';
import { navigate } from "../RootNavigator";
// import { FlatList } from "react-native-bidirectional-infinite-scroll";

export default Trending = (props) => {

    const [trendingData, setTrendingData] = useState([])
    const [playable, setPlayable] = useState(0)
    const [playable2, setPlayable2] = useState(0)
    const [page, setPage] = useState(1)
    const navigation = props.navigation
    const [refresing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [caughtUp, setCaughtUp] = useState(false)
    var flatListRef = useRef(null)

    const fetchTrending = async (page) => {

        setLoading(true)

        var user_id = await AsyncStorage.getItem('user_id')

        if (user_id == null) {

            // this part is not tested
            props.navigation.navigate('Phone')
        }
        else {
            if (!caughtUp) {
                var feedData = await fetch(BASE_URL + `trending/get_feed?user_id=${user_id}&page=${page}`, { method: 'GET' })
                var feedDataJson = await feedData.json()
                setTrendingData(feedDataJson.response)
                setCaughtUp(feedDataJson.caughtup)

                console.log('list length', feedDataJson.response.length)
            }
        }

        setLoading(false)

    }


    useEffect(() => {

        fetchTrending(1)

    }, [])

    const onRefresh = async () => {
        console.log('refresh !')
        setRefreshing(true)
        var new_page = Math.max(1, page - 1)
        await fetchTrending(new_page)
        setPage(new_page)
        setRefreshing(false)
    }

    const onEndReached = async () => {
        setLoading(true)
        await fetchTrending(page + 1)
        setPage(page + 1)
        // flatListRef.scrollToOffset({ animated: true, offset: 0 });
    }

    const onViewCallBack = React.useCallback((viewableItems) => {

        var changed = viewableItems.changed

        for (var i = 0; i < changed.length; i++) {
            if (changed[i].isViewable == true) {

                if (i == 0) {
                    setPlayable(changed[i].index)
                }
                else {
                    break
                }

            }
        }

        // Use viewable items in state or as intended
    }, []) // any dependencies that require the function to be "redeclared"


    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 })



    const FlatListHorizontalItem = ({ index, item }) => {
        const OpenSpecificView = () => {
            navigate("ProductSpecific", { item, navigation });
        };

        return (
            <TouchableOpacity style={{
                height: 'auto',
                width: 200,
                paddingTop: 0,
                paddingBottom: 25,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightColor: 'lightgrey',
                borderRightWidth: 0.5,
            }} onPress={OpenSpecificView}>
                <Image source={{ uri: item.image }} style={{ height: 100, width: 100, borderRadius: 20 }} />
                <Text style={styles.titleStyle}>{item.name}</Text>

            </TouchableOpacity>
        )
    }


    const FlatListItem = ({ index, item }) => {

        var playVid = true

        if (index == playable) {
            playVid = true
        }
        else {
            playVid = false
        }

        const VidRendrable = () => {

            if (playVid) {
                return <>
                    <Video key={index}
                        source={{ uri: item.videoUrl }}
                        rate={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay
                        repeat
                        poster={item.posterimage}
                        style={styles.videoContainer}
                        paused={!playVid}
                    />
                </>
            }
            else {
                return <>
                    <Image source={{ uri: item.holdimage }} style={styles.videoContainer} />
                </>
            }
        }

        return (
            <>
                <View style={{
                    height: 'auto',
                    width: '100%',
                    paddingVertical: 20,
                    borderColorBottom: 'lightgrey',
                    borderBottomWidth: 0.5,
                    alignItems: 'center'
                }}>

                    <View style={styles.textContainer}>
                        <Text style={styles.titleStyle}>{item.title}</Text>
                        <Text style={styles.descr1Style}>{item.description1}</Text>
                    </View>

                    <VidRendrable />


                    <View style={styles.textContainer}>
                        <Text style={styles.titleStyle}>Buy From Here</Text>
                    </View>

                    <FlatList
                        horizontal
                        data={item.products}
                        renderItem={FlatListHorizontalItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={{
                            height: 150,
                            width: '100%',
                            marginVertical: 5,
                        }}
                    />

                </View>

            </>

        )
    }

    const EndReachedComponent = () => {

        if (caughtUp) {
            return (<>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20
                }}>
                    <Image source={{ uri: 'https://img.icons8.com/3d-fluency/94/null/today.png' }} style={{ height: 100, width: 100 }} />
                    <Text style={{
                        color: 'black',
                        fontSize: 25,
                    }}>You are all caught up !</Text>
                </View>
            </>)
        }
        else {
            if (loading) {
                return (<>
                    <ActivityIndicator size={'small'} color={'green'} />
                </>)
            }
        }

    }


    return (<>
        <SafeAreaView>
            <FlatList
                data={trendingData}
                ref={(ref) => { flatListRef = ref }}
                renderItem={FlatListItem}
                keyExtractor={(item, index) => index.toString()}
                onViewableItemsChanged={onViewCallBack}
                viewabilityConfig={viewConfigRef.current}
                ListFooterComponent={<>
                    <EndReachedComponent />
                </>}
                onStartReached={onRefresh}
                onEndReached={onEndReached}

                // external
                showDefaultLoadingIndicators={true} // optional
                onStartReachedThreshold={10} // optional
                onEndReachedThreshold={0.5} // optional
                activityIndicatorColor={'black'} // optional
                HeaderLoadingIndicator={() => { /** Your loading indicator */ }} // optional
                FooterLoadingIndicator={() => { /** Your loading indicator */ }} // optional
                enableAutoscrollToTop={true} // optional | default - false






            />
        </SafeAreaView>
    </>)


}

const styles = StyleSheet.create({
    videoContainer: {
        height: 300,
        width: '100%',
        backgroundColor: 'lightgrey',
        paddingVertical: 5,
    },
    textContainer: {
        height: 'auto',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    titleStyle: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    descr1Style: {
        fontSize: 15,
        color: 'grey',
    },
    descr2Style: {
        fontSize: 12,
        color: 'grey'
    }

})

