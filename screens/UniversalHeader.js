import React, { useEffect, useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { FaHeart } from "react-icons/fa";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL, COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import fetch_home from '../methods/fetch';
const ScreenWidth = Dimensions.get('window').width;

const SearchBar = (props) => {

    const [searchText, setSearchText] = useState("");
    const [hideHeader, setHideHeader] = useState(props.hideHeader)


    // console.log("search bar props")
    // console.log(props)

    // var searchText = props.searchText
    // var setSearchText = props.setSearchText
    var setProducts = props.setProducts


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

        if (!hideHeader) {
            if (searchText.length == 0) {
                return (
                    <>
                        <View style={{
                            height: 30,
                            width: 30,
                            // backgroundColor: 'red',
                            marginLeft: 20
                        }}>
                            <Icon name='search' size={20} color={COLOR1} />
                        </View>
                    </>
                )
            }
            else {
                return (
                    <>
                        <Icon name='search' size={20} color={COLOR1} />
                    </>
                )
            }
        }
    }

    return (
        <>
            {/* <TextInput style={styles.input}
                editable
                maxLength={40}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Start Typing to search ..."
                placeholderTextColor={'black'}
            /> */}
            <Text
                style={{
                    justifyContent: 'center',
                    width: '100%',
                    color: COLOR1,
                    marginRight: 80,
                    fontSize: 20,
                    textAlign: 'center'
                }}>
                Hebbers Kitchen
            </Text>

            <TouchableOpacity title='Search' onPress={async () => {
                // console.log(searchText);
                // console.log("in searching")
                const result = await fetch_home(BASE_URL + `search/query?query=${searchText}`, { method: 'GET' })
                const response = (await result.json()).data;
                setProducts(response);
                setHideHeader(true)
                props.setHideHeader(true)
                props.setIgnoreSearch(false)

            }} style={{
                position: 'absolute',
                right: 0,
                top: 5
            }} >
                <SearchButtonIcon />
            </TouchableOpacity>
            <ResetButton setHideHeader={props.setHideHeader} hideHeader={props.hideHeader} setIgnoreSearch={props.setIgnoreSearch} />

        </>
    )
}


const Header = ({
    setState,
    State,
    setProducts,
    setHideHeader,
    hideHeader,
    setIgnoreSearch }) => {

    const [sideState, setSideState] = useState(0)

    const handleSideBar = () => {

    }


    const BurgerIcon = () => {
        return (
            <>
                <Icon name='bars' size={20} color={COLOR1} style={{
                    position: 'absolute',
                    transform: [{ translateY: -5 }]
                }} />
            </>
        )

        if (State == 0) {

            return (
                <>
                    <Icon name='bars' size={20} color={COLOR1} />
                </>
            )
        }
        else {
            return (
                <Icon name='close' size={20} color={COLOR1} />
            )
        }
    }

    // console.log(setState)

    return (
        <>
            <View style={styles.containter}>

                <View style={styles.left_icons}>
                    <TouchableOpacity
                        onPress={() => {
                            if (State == 0) {
                                setState(1)
                            }
                            else {
                                setState(0)
                            }
                        }}>
                        <BurgerIcon />
                    </TouchableOpacity>

                </View>

                <View style={styles.right_icons}>
                    <View style={styles.screen}>
                        <SearchBar setProducts={setProducts} hideHeader={hideHeader} setHideHeader={setHideHeader} setIgnoreSearch={setIgnoreSearch} />
                    </View>
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
        backgroundColor: COLOR2
    },

    left_icons: {
        width: 60,
        height: '100%',
        padding: 20
    },

    right_icons:
    {
        width: ScreenWidth - 60,
        height: '100%',
        // backgroundColor: 'white',
        position: 'absolute',
        right: 0,
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
        color: "black",
        backgroundColor: COLOR1,
        width: '100%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
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