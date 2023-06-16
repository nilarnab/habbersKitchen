import React, { useEffect, useState } from 'react';
import { SafeAreaView, Dimensions, useWindowDimensions, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL, COLOR1, COLOR2, COLOR3, COLOR4, COMPNAY_NAME } from '../env';
import fetch_home from '../methods/fetch';
import { useNavigation } from '@react-navigation/native';


const MidHeader = ({ searchMode, searchText, setSearchText }) => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();

    if (searchMode) {
        return <>
            <View style={{ ...styles.midHeader, width: width - 60 * 2 }}>
                <TextInput
                    style={styles.input}
                    value={searchText}
                    autoFocus
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
            <View
                source={{ uri: `https://hebbarskitchen.com/wp-content/uploads/2016/11/my_logo.png` }}
                style={{ ...styles.midHeader, width: width - 60 * 2 }}>

                <Image
                    source={{ uri: `https://hebbarskitchen.com/wp-content/uploads/2016/11/my_logo.png` }}
                    style={{
                        height: 20,
                        width: 200,
                        alignSelf: 'center'
                    }}
                />
            </View>

        </>
    }
}

const SearchBar = (props) => {
    const [searchText, setSearchText] = useState("");
    const [hideHeader, setHideHeader] = useState(props.hideHeader)
    const [searchMode, setSearchMode] = useState(false)
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

        if (searchMode) {
            return <>
                <Icon name='close' size={20} color={COLOR1} />
            </>
        }
        else {
            return <>

                <Icon name='search' size={20} color={COLOR1} />

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
    const { height, width } = useWindowDimensions();

    const BurgerIcon = () => {
        if (SideMenu == 0) {
            return (
                <Icon name='bars' size={20} color={COLOR1} />
            )
        }
        else {
            return (
                <Icon name='close' size={20} color={COLOR1} />
            )
        }
    }

    return (
        <>
            <View style={styles.containter}>
                <TouchableOpacity
                    onPress={() => {
                        setSideMenu(!SideMenu)
                    }}

                >
                    <View style={{
                        ...styles.left_icons,
                    }}>
                        <BurgerIcon />
                    </View>
                </TouchableOpacity>
                <View style={{ ...styles.right_icons, width: width - 60 }}>
                    <SearchBar setProducts={setProducts} hideHeader={hideHeader} setHideHeader={setHideHeader} setIgnoreSearch={setIgnoreSearch} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    containter: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        backgroundColor: COLOR2,
    },

    midHeader: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    left_icons: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    right_icons:
    {
        height: '100%',
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
        fontSize: 18,
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