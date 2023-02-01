import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Animated, BackHandler, FlatList, StyleSheet, Text, View, AppRegistry, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, ActivityIndicator, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../env';
import { useIsFocused } from '@react-navigation/native';
import Video, { DRMType } from 'react-native-video';
import { navigate } from "../RootNavigator";
import LinearGradient from 'react-native-linear-gradient';
import SideBar from '../SideBar';
// import { ActivityIndicator } from 'react-native';
// import { FlatList } from "react-native-bidirectional-infinite-scroll";






export default Trending = (props) => {

    const [trendingData, setTrendingData] = useState([])
    const [playable, setPlayable] = useState(0)
    const [page, setPage] = useState(1)
    const navigation = props.navigation
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [caughtUp, setCaughtUp] = useState(false)
    const [query, setQuery] = useState('')
    const flatListRef = React.useRef()
    const [isMuted, setIsMuted] = useState(true)
    const [lastRequestByRefresh, setLastRequestByRefresh] = useState(false)
    const [videoGettingReady, setVideoGettingReady] = useState(false)
    const [scategoryData, setscategoryData] = useState([]);
    const [hideHeader, setHideHeader] = useState(false);

    /* Side bar */
    // -----------------------------
    const [SideMenu, setSideMenu] = useState(0)
    const [mainWidth, setMainWidth] = useState('100%')
    const fadeAnim = useRef(new Animated.Value(0)).current

    const fetchTrending = async (page, query, refresh) => {
        console.log('fetching trending with', page, query)

        // if (query == '') {
        //     console.log('quer is empty')
        //     setSearchOn(false)
        // }
        // else {
        //     console.log('quer is not empty')
        //     setSearchOn(true)

        //     console.log('search on', searchOn)
        // }

        // console.log('search on', searchOn)

        setLoading(true)

        var user_id = await AsyncStorage.getItem('user_id')

        if (user_id == null) {

            // this part is not tested
            props.navigation.navigate('Phone')
        }
        else {
            if (!caughtUp) {
                var feedData = await fetch(BASE_URL + `trending/get_feed?user_id=${user_id}&page=${page}&fquery=${query}`, { method: 'GET' })
                var feedDataJson = await feedData.json()
                var scrollToTop = feedDataJson.scroll_to_top

                console.log('got feed data', feedData)

                if (!refresh) {
                    if (scrollToTop) {
                        console.log('scrolling to top')
                        flatListRef.current.scrollToIndex({ animated: false, index: 0 })
                    }
                }
                else {
                    flatListRef.current.scrollToEnd({ animated: false })
                }

                setTrendingData(feedDataJson.response)
                setCaughtUp(feedDataJson.caughtup)


                console.log('list length', feedDataJson.response.length)
                setPage(page)
            }
        }
        setQuery(query)
        console.log("new query", query)
        setLoading(false)
    }

    useEffect(() => {
        const backAction = () => {
            console.log('back button pressed', query)
            fetchTrending(1, '')
            // if (searchOn) {
            //     setQuery('')
            //     fetchTrending(1, '')

            // }
            // else {
            //     console.log('exiting app')
            //     // BackHandler.exitApp()
            // }

            return true;

        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();

    }, []);


    useEffect(() => {

        if (SideMenu == 1) {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 200,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start();
        }
        else {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start();
        }
    }, [SideMenu])

    // -----------------------------

    useEffect(() => {

        fetchTrending(1, query)

    }, [])

    useEffect(() => {
        console.log('fetcing serarchable categories')
        fetch(BASE_URL + 'trending/get_searchable_categories')
            .then(res => res.json())
            .then(result => { setscategoryData(result.response); console.log(result.response) })
    }, []);


    const bigCatagoryActionCenter = async ({ item }) => {

        if (item["action"] == 'SEARCH') {
            // console.log("search for", item['title'])
            setQuery(item['query'])
            setHideHeader(true)
            console.log('search on', hideHeader)

            fetchTrending(1, item['query'])
        }
    }

    const SearchableCategories = () => {

        const CatagoryItem = ({ item }) => {

            if ("image" in item) {
                return (
                    <>
                        <TouchableOpacity style={styles.catItem} onPress={() => bigCatagoryActionCenter({ item })}>
                            <Image source={{ uri: item.image }} resizeMode="cover" style={styles.catItemImage} />

                            <Text style={styles.catItemText}>{item.title}</Text>

                        </TouchableOpacity>
                    </>
                )
            }
            else {
                return (
                    <>
                        <TouchableOpacity style={styles.catItem} onPress={() => bigCatagoryActionCenter({ item })}>
                            {/* <Text>{item.title}</Text> */}
                        </TouchableOpacity>

                    </>
                )
            }
        }

        return (<>
            <View style={styles.catContainer}>
                <FlatList
                    horizontal
                    data={scategoryData}
                    renderItem={CatagoryItem}
                    initialNumToRender={1}
                    // TODO: Fix in production
                    keyExtractor={item => Math.random()}

                />
            </View>
        </>)
    }

    const SearchBar = () => {
        const [textVal, setTextVal] = useState('')

        const BurgerIcon = () => {

            if (SideMenu == 0) {

                return (
                    <>
                        <Image source={{ uri: "https://img.icons8.com/material/24/null/menu--v1.png" }} style={{ height: 20, width: 20 }}></Image>
                    </>
                )
            }
            else {
                return (
                    <Image source={{ uri: "https://img.icons8.com/material/24/null/arrow-pointing-left--v2.png" }} style={{ height: 20, width: 20 }}></Image>
                )
            }
        }

        const SearchButtonIcon = () => {
            if (textVal.length == 0) {
                return (
                    <>
                        <Image source={{ uri: "https://img.icons8.com/ios/50/null/search--v1.png" }} style={{ height: 20, width: 20, marginBottom: 15 }} />
                    </>
                )
            }
            else {
                return (
                    <>
                        <Image source={{ uri: "https://img.icons8.com/3d-fluency/94/null/search.png" }} style={{ height: 20, width: 20, marginBottom: 15 }} />
                    </>
                )
            }
        }

        return (<>

            <View style={{
                height: 'auto',
                width: '100%',
                flexDirection: 'row',
                paddingTop: 5,
                marginLeft: 0
            }}>
                <View
                    style={{
                        height: 'auto',
                        width: '20%',
                        backgroundColor: '',
                        padding: 15,
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (SideMenu == 0) {
                                setSideMenu(1)
                            }
                            else {
                                setSideMenu(0)
                            }
                        }}>
                        <BurgerIcon />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        height: 'auto',
                        width: '60%',
                        backgroundColor: '',
                        flexDirection: 'row',
                        marginLeft: '5%',
                        backgroundColor: ''
                    }}>
                    <TextInput
                        onChangeText={(text) => { setTextVal(text) }}
                        value={textVal}
                        placeholder={'Search your reel ! '}
                        style={{
                            fontSize: 15,
                            color: "black",
                            width: '80%',
                            padding: 10,
                            borderRadius: 8,
                            marginBottom: 10,
                            marginLeft: '15%'

                        }}
                    >
                    </TextInput>
                </View>
                <View
                    style={{
                        height: 'auto',
                        width: '20%',
                        backgroundColor: '',
                        flexDirection: 'row',
                        // start from flex end
                        justifyContent: 'flex-end',
                        // marginRight: 20
                    }}>
                    <TouchableOpacity style={{
                        height: 40,
                        width: 40,
                        paddingTop: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 40,
                        marginTop: 5,
                        borderRadius: 50,
                        borderWidth: 0.5,
                        borderColor: 'lightgrey',
                    }}
                        onPress={() => {
                            setPage(1)
                            setQuery(textVal)
                            fetchTrending(1, textVal)

                        }}
                    >
                        <SearchButtonIcon />
                    </TouchableOpacity>
                </View>

            </View>

        </>)
    }

    const Header = ({ setQuery }) => {


        return (<>
            <View style={{
                height: 'auto',
                width: '100%',
                paddingHorizontal: 5,
                backgroundColor: 'white'
            }}>

                <View style={{
                    height: 'auto',
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: ''
                }}>
                    <SearchBar />
                </View>

            </View>
            <SearchableCategories />
        </>)
    }

    const onRefresh = async () => {
        console.log('refresh !', page)
        setRefreshing(true)
        var new_page = Math.max(1, page - 1)
        setLastRequestByRefresh(true)
        console.log("last request by refresh is set as true")
        await fetchTrending(new_page, query, true)
        setPage(new_page)
        setRefreshing(false)
    }



    const onEndReached = async () => {
        console.log('end reached !', page, 'last request by refresh: ', lastRequestByRefresh)
        if (!lastRequestByRefresh) {
            setLoading(true)
            await fetchTrending(page + 1, query, false)
        }
        else {
            setLastRequestByRefresh(false)
        }
    }

    const onViewCallBack = React.useCallback((viewableItems) => {

        var changed = viewableItems.changed

        for (var i = 0; i < changed.length; i++) {
            if (changed[i].isViewable == true) {

                if (i == 0) {
                    console.log('setting playable to: ', changed[i].index)
                    setVideoGettingReady(true)
                    if (playable != changed[i].index) {
                        setPlayable(changed[i].index)
                    }
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

            <TouchableOpacity onPress={OpenSpecificView}>
                <LinearGradient style={{
                    height: 'auto',
                    width: 200,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // borderRightColor: 'lightgrey',
                    // borderRightWidth: 0.5,
                    backgroundColor: 'white',
                    marginLeft: 5,
                    borderRadius: 20,
                    shadowColor: "#3a748a",
                    elevation: 5,
                    overflow: 'hidden',
                }} colors={['white', 'aliceblue']}>

                    {/* <View style={{
                        height: 150,
                        width: 150,
                        borderRadius: 80,
                        backgroundColor: '#A4EBF3',
                        left: -75,
                        bottom: -75,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View>
                    <View style={{
                        height: 150,
                        width: 150,
                        borderRadius: 80,
                        backgroundColor: '#A4EBF3',
                        right: -75,
                        top: -75,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View> */}

                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <View style={{
                            width: 90,
                            marginLeft: 5,
                        }}>
                            <Image source={{ uri: item.image }} style={{ height: 80, width: 80, borderRadius: 20 }} />
                        </View>

                        <View style={{
                            width: '50%',
                            justifyContent: 'center',
                        }}>

                            <Text style={styles.titleStyle}>{item.name}</Text>
                        </View>

                    </View>

                    <View>
                        <Text style={{
                            fontSize: 15,
                            color: 'grey'
                        }}>
                            Now at only
                        </Text>
                        <Text style={{
                            fontSize: 25,
                            color: 'black'
                        }}>{item.price} /-</Text>
                    </View>

                </LinearGradient>
            </TouchableOpacity>
        )
    }


    const VideoGettingReady = () => {
        if (videoGettingReady) {
            return <>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                }}>
                    <ActivityIndicator size="large" color="red" />
                    <Text style={{
                        fontSize: 15,
                        color: 'black',
                        paddingTop: 8,
                        marginLeft: 10,
                    }}>Video is getting ready</Text>
                </View>
            </>

        }
    }


    const FlatListItem = ({ index, item }) => {

        var playVid = true

        if (index == playable) {
            playVid = true
        }
        else {
            playVid = false
        }

        const onVideoBuffer = (status) => {
            console.log('video buffer status: ', status)
        }

        const onReadyForDisplay = (status) => {
            console.log('video ready for display status: ', status)
            setVideoGettingReady(false)
        }



        const VidRendrable = () => {

            if (playVid) {
                return <>
                    <Video key={index}
                        source={{ uri: item.videoUrl }}
                        rate={1.0}
                        isMuted={isMuted}
                        onVideoBuffer={onVideoBuffer}
                        onReadyForDisplay={onReadyForDisplay}
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

        const MuteButton = () => {
            if (playVid) {
                if (videoGettingReady) {
                    return <>
                        <View style={{
                            marginTop: 10,
                            padding: 10,
                            borderColor: 'aliceblue',
                            height: 'auto',
                            width: 'auto',
                            elevation: 10,
                            borderRadius: 50,
                            backgroundColor: 'white'
                        }}>
                            <ActivityIndicator size="small" color="red" />
                        </View>
                    </>
                }
                else {
                    if (isMuted) {
                        return <>
                            <TouchableOpacity onPress={() => {
                                setIsMuted(false)
                            }} style={{
                                marginTop: 10,
                                padding: 10,
                                borderColor: 'aliceblue',
                                height: 'auto',
                                width: 'auto',
                                elevation: 10,
                                borderRadius: 50,
                                backgroundColor: 'white'
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Image source={{ uri: 'https://img.icons8.com/ios-filled/100/null/medium-volume--v1.png' }} style={{ height: 20, width: 20 }} />
                                    <Text style={{
                                        color: 'black',
                                        marginLeft: 10,
                                    }}>Unmute</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    }
                    else {
                        return <>
                            <TouchableOpacity onPress={() => {
                                setIsMuted(true)
                            }} style={{
                                marginTop: 10,
                                padding: 10,
                                borderColor: 'aliceblue',
                                height: 'auto',
                                width: 'auto',
                                elevation: 10,
                                borderRadius: 50,
                                backgroundColor: 'white'
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Image source={{ uri: 'https://img.icons8.com/ios-filled/100/null/no-audio--v1.png' }} style={{ height: 20, width: 20 }} />
                                    <Text style={{
                                        color: 'black',
                                        marginLeft: 10,
                                    }}>Mute</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    }
                }
            }
        }

        return (
            <>
                <LinearGradient style={{
                    height: 'auto',
                    width: '100%',
                    paddingVertical: 20,
                    borderColorBottom: 'lightgrey',
                    borderBottomWidth: 0.2,
                    alignItems: 'center',
                    overflow: 'hidden',
                }} colors={['white', 'aliceblue', 'white']}>

                    {/* <View style={{
                        height: 100,
                        width: 100,
                        borderRadius: 80,
                        backgroundColor: 'aliceblue',
                        left: -50,
                        top: -50,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View>

                    <View style={{
                        height: 150,
                        width: 150,
                        borderRadius: 150,
                        backgroundColor: 'aliceblue',
                        right: -75,
                        bottom: -75,
                        position: 'absolute',
                        transform: [{ translateY: 0 }],
                    }}></View> */}

                    <View style={styles.textContainer}>
                        <Text style={styles.titleMainStyle}>{item.title}</Text>
                        <Text style={styles.descr1Style}>{item.description1}</Text>
                    </View>

                    <VidRendrable />

                    {/* <VideoGettingReady /> */}

                    <View style={{
                        flexDirection: 'row',
                    }}>

                        <MuteButton />
                    </View>

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
                            marginLeft: 5,
                        }}
                    />

                </LinearGradient>

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
            <View style={{
                flexDirection: 'row',
            }}>
                <Animated.View style={{
                    width: fadeAnim,
                    height: '100%',
                    backgroundColor: 'rgb(240, 240, 245)',
                }}>
                    <SideBar props={props.navigation} setState={setSideMenu} />
                </Animated.View>

                <View style={{
                    width: mainWidth,
                    height: '100%',
                    backgroundColor: 'white',
                    elevation: 1
                }}>
                    <Header setQuery={setQuery} />
                    <FlatList
                        data={trendingData}
                        ref={flatListRef}
                        renderItem={FlatListItem}
                        keyExtractor={(item, index) => index.toString()}
                        onViewableItemsChanged={onViewCallBack}
                        viewabilityConfig={viewConfigRef.current}
                        ListFooterComponent={<>
                            <EndReachedComponent />
                        </>}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        onEndReached={onEndReached}

                        // external
                        showDefaultLoadingIndicators={true} // optional
                        onStartReachedThreshold={10} // optional
                        onEndReachedThreshold={0.5} // optional
                        activityIndicatorColor={'black'} // optional
                        HeaderLoadingIndicator={() => { /** Your loading indicator */ }} // optional
                        FooterLoadingIndicator={() => { /** Your loading indicator */ }} // optional
                        enableAutoscrollToTop={true} // optional | default - false
                        style={{
                            backgroundColor: 'white',
                        }}
                    />
                </View>
            </View>
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
        marginTop: 5,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    titleMainStyle: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        marginLeft: 0,
    },
    titleStyle: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        marginLeft: 0,
    },
    descr1Style: {
        fontSize: 15,
        color: 'black',
    },
    descr2Style: {
        fontSize: 12,
        color: 'grey'
    },

    // searchable categoreies
    catContainer: {
        height: 'auto',
        width: '100%',
        flexDirection: "row",
        marginHorizontal: "auto",
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginLeft: 0,
        marginVertical: 0,
        paddingTop: 5,
        backgroundColor: 'white'
    },
    catItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'aliceblue',
        borderRadius: 10,
        height: 'auto',
        width: 'auto',
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        backgroundColor: 'aliceblue'
    },
    catItemImage: {
        width: 30,
        height: 30,
        borderRadius: 8
    },
    catItemText: {
        marginLeft: 5,
        color: 'black',
    },
    catItemQuad: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 25,
        padding: 11,
        height: 100,
        width: 100,
        margin: 4

    },

    catagoryText: {
        fontWeight: '800',
        fontSize: 25,
        marginTop: 20,
        marginLeft: 12,
    },

    catItemSmall: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 0,
        height: 30,
        width: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 0,
        margin: 2

    },

})

