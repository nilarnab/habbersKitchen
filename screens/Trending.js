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
    const [query, setQuery] = useState('')
    var flatListRef = useRef(null)

    const fetchTrending = async (page, query) => {
        console.log('fetching trending with', page, query)

        setLoading(true)

        var user_id = await AsyncStorage.getItem('user_id')

        if (user_id == null) {

            // this part is not tested
            props.navigation.navigate('Phone')
        }
        else {
            if (!caughtUp) {
                var feedData = await fetch(BASE_URL + `trending/get_feed?user_id=${user_id}&page=${page}&query=${query}`, { method: 'GET' })
                var feedDataJson = await feedData.json()
                setTrendingData(feedDataJson.response)
                setCaughtUp(feedDataJson.caughtup)

                console.log('list length', feedDataJson.response.length)
            }
        }

        setLoading(false)

    }


    useEffect(() => {

        fetchTrending(1, query)

    }, [])



    const SearchBar = () => {
        const [textVal, setTextVal] = useState('')

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
                marginLeft: 20
            }}>
                <TextInput
                    onChangeText={(text) => { console.log(text); setTextVal(text) }}
                    value={textVal}
                    placeholder={'Search your reel ! '}
                    style={{
                        width: '60%',
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                    }}
                >
                </TextInput>
                <TouchableOpacity style={{
                    height: 40,
                    width: 40,
                    paddingTop: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                    marginTop: 10,
                    borderRadius: 50,
                    borderWidth: 0.5,
                    borderColor: 'lightgrey',
                }}
                    onPress={() => {
                        setPage(1)
                        fetchTrending(1, textVal)
                    }}
                >
                    <SearchButtonIcon />
                </TouchableOpacity>
            </View>

        </>)
    }

    const Header = ({ setQuery }) => {
        return (<>
            <View style={{
                height: 'auto',
                width: '100%',
                paddingHorizontal: 5,
            }}>
                <View style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgrey',
                    paddingVertical: 10
                }}>
                    <Image source={{ uri: 'https://lh3.googleusercontent.com/EUyLnq_4bQ_DCshfKyP6bJFunSOOPaJVMUV-qSUMw4nGC5UGeJ9V6rgqGEqoqDP8tKezQCRFlPf4ILMip74aC-3fAcpMCHpqM2LLSsm55XKN9VOHMLMAXfENbkweg6CCB490GyeimnCMm07ZNfw5UQZCXOOMcBseM7I-jP16K1h-SmJONfs3XmizstS1EaLR0zGZAMU61m9vE0t5fJN-opgY_Zt7QbzWN6n4FQ_vku_TEtEkVpYjpITAeqdK8Eje5i8p7iuaCxRRSfOMigP-HS11L16F2EGU-JuxGxhM8tsEeNgv9DpQWgLWZX9k-5efAnLRD64II2JCIDjECCJnKJfmDVGlj-QLvzaQFKgEppC6orjcShedVIuqokd68XmUy4za-3Th8fqXSo5NzYrHlpKVHm9c85m_gSc6tYsQNfr9QiUl7NLSk8lDvGAEb_SLFtRVvHJyBu3D9LIKMtClH1xyTcdTDxPmByY6zK_qnm7FLIBX7S3Ch0grXCciHfmBBwM0jPCIOhm6vCnoPgOiKjaL_trV5azwSuwjwYQJb9H3E-clS1GCzbNPuqS2qrNE7wdcwcqVKKX66LK05XnURfVBjFXQ_BZXwHA3FQCEopVydiEMDhQTNcfM3TO2l66LInh3hfMLuDLFWMaFARs0sdyCU0NJwEksz3BsLAn_tfNT8ot-qEwKST7bC_X_AqKwqxHB9XdEC0NZjVRJquca0ay6IdTXYClnIjiySFcWo3s9OCRjIFr3Rkm29mU20m4yx_hADVnydt1_6C80WhaUWlRk44EqQ_Edhqr62zwy4bT2eUXH_-9Dapy1TlX0lFC6r9JOTqYwKKCg-5xKodtoywYRtJSEnKJ9gkp_sFyKPknQvMmY6Q9osq0_2TJ3Wm8LuJzQdFTfWF429aXvXDB-oE-vBdpKHqcv4rCtKOs5a-h1TM2EiUvkJuCUUF3HUOS3evVtxEi4OvtD7NXQgcc=w280-h286-no?authuser=0' }} style={{
                        height: 55,
                        width: 55,
                    }} />
                    {/* <View style={{
                        marginLeft: 5
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'green'
                        }}>BuyBold</Text>
                        <Text style={{
                            fontSize: 15,
                            color: 'darkgreen',
                            fontStyle: 'italic'
                        }}>Look Before You Buy</Text>
                    </View> */}
                    <View style={{
                        height: 'auto',
                        width: '100%',
                        flexDirection: 'row',
                    }}>
                        <SearchBar />
                    </View>
                </View>

            </View>
        </>)
    }

    const onRefresh = async () => {
        console.log('refresh !')
        setRefreshing(true)
        var new_page = Math.max(1, page - 1)
        await fetchTrending(new_page, query)
        setPage(new_page)
        setRefreshing(false)
    }

    const onEndReached = async () => {
        setLoading(true)
        await fetchTrending(page + 1, query)
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
            <Header setQuery={setQuery} />
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

