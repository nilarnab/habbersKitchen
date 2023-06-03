import React, { useEffect, useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL, COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import fetch_home from '../methods/fetch';
import { useNavigation } from '@react-navigation/native';
const ScreenWidth = Dimensions.get('window').width;


const MidHeader = ({ searchMode, searchText, setSearchText }) => {
    const navigation = useNavigation();

    if (searchMode) {
        return <>
            <View style={styles.midHeader}>
                <TextInput
                    style={styles.input}
                    value={searchText}
                    onChangeText={(text) => { setSearchText(text) }}
                    placeholder='Search ..'
                    placeholderTextColor={'grey'}
                    selectionColor={COLOR1}
                    onSubmitEditing={() => {
                        navigation.navigate('SearchResult', { query: searchText })
                    }}
                />
            </View>
        </>
    }
    else {
        return <>
            <Text
                style={{ ...styles.midHeader, paddingTop: 10 }}>
                Hebbers Kitchen
            </Text>
        </>
    }
}

const SearchBar = (props) => {
    const [searchText, setSearchText] = useState("");
    const [hideHeader, setHideHeader] = useState(props.hideHeader)
    const [searchMode, setSearchMode] = useState(false)
    var setProducts = props.setProducts

    const fetchSearchResult = () => {

    }

    const ResetButton = (props) => {
        // console.log("reset button props")
        // console.log(props)

        if (hideHeader) {

            return (
                <>
                    <TouchableOpacity title='Search' onPress={async () => {
                        // console.log(searchText);
                        // console.log("in searching", searchText)
                        const result = await fetch_home(BASE_URL + `search/query?query=${searchText}`, { method: 'GET' })
                        const response = (await result.json()).data;
                        setProducts(response);
                        // console.log(response);

                        setHideHeader(false)
                        props.setHideHeader(false)
                        props.setIgnoreSearch(false)

                    }}
                        style={{
                            transform: [{ translateX: -30 }, { translateY: -10 }],
                            height: 30,
                            width: 30,
                            // backgroundColor: 'green'
                        }} ><Icon name='close' size={25} color={COLOR2} /></TouchableOpacity>

                </>
            )
        }
    }

    const SearchButtonIcon = () => {

        if (searchMode) {
            return <>
                <View style={{
                    height: 30,
                    width: 30,
                    // backgroundColor: 'red',
                    marginLeft: 20
                }}>
                    <Icon name='close' size={20} color={COLOR1} />
                </View>
            </>
        }
        else {
            return <>
                <View style={{
                    height: 30,
                    width: 30,
                    // backgroundColor: 'red',
                    marginLeft: 20
                }}>
                    <Icon name='search' size={20} color={COLOR1} />
                </View>
            </>
        }
    }

    return (
        <>

            <MidHeader searchMode={searchMode} searchText={searchText} setSearchText={setSearchText} />

            <TouchableOpacity title='Search' onPress={() => {
                setSearchMode(!searchMode)
            }} style={{
                ...styles.left_icons,
                width: 60,
                paddingLeft: 10,
                // backgroundColor: 'pink'
            }} >
                <SearchButtonIcon />
            </TouchableOpacity>
            <ResetButton setHideHeader={props.setHideHeader} hideHeader={props.hideHeader} setIgnoreSearch={props.setIgnoreSearch} />

        </>
    )
}


const Header = ({
    setSideMenu,
    SideMenu,
    setProducts,
    setHideHeader,
    hideHeader,
    setIgnoreSearch }) => {

    const BurgerIcon = () => {
        if (SideMenu == 0) {

            return (

                <Icon name='bars' size={20} style={{
                    position: 'absolute',
                    transform: [{ translateY: -5 }]
                }} color={COLOR1} />

            )
        }
        else {
            return (
                <Icon name='close' size={20} style={{
                    position: 'absolute',
                    transform: [{ translateY: -5 }]
                }} color={COLOR1} />
            )
        }
    }

    // console.log(setState)

    return (
        <>
            <View style={styles.containter}>

                <TouchableOpacity
                    onPress={() => {
                        if (SideMenu == 0) {
                            setSideMenu(1)
                        }
                        else {
                            setSideMenu(0)
                        }
                    }}

                >
                    <View style={{
                        ...styles.left_icons,
                    }}>
                        <BurgerIcon />
                    </View>
                </TouchableOpacity>


                <View style={styles.right_icons}>
                    <SearchBar setProducts={setProducts} hideHeader={hideHeader} setHideHeader={setHideHeader} setIgnoreSearch={setIgnoreSearch} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    containter: {
        width: '100%',
        height: 50,
        // elevation: 2,
        flexDirection: 'row',
        backgroundColor: COLOR2,

    },

    midHeader: {
        justifyContent: 'center',
        width: ScreenWidth - 60 * 2,
        color: COLOR1,
        fontSize: 20,
        // backgroundColor: 'green',
        textAlign: 'center'
    },

    left_icons: {
        width: 60,
        height: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        // backgroundColor: 'blue'
    },

    right_icons:
    {
        width: ScreenWidth - 60,
        height: '100%',
        // backgroundColor: 'white',
        position: 'absolute',
        right: 0,
        flexDirection: 'row'
    },

    //----------------
    searchButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        padding: 20,
        borderRadius: 100,
        // backgroundColor: 'white',
    },

    input: {
        fontSize: 15,
        color: COLOR1,
        paddingLeft: 10,
        width: '80%',
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: COLOR1,
    },

    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: '90%',
        marginLeft: '5%',
        marginTop: 10,
    },

})

export default Header;