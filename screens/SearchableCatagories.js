import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet, ActivityIndicator, RefreshControl, Text, ScrollView, Touchable, TouchableOpacity, ImageBackground } from "react-native";
import { BASE_URL, COLOR1, COLOR2, COLOR3, COLOR4 } from '../env'
import fetch_home from '../methods/fetch';


const SearchableCatagories = (props) => {
    const [scategoryData, setscategoryData] = useState([]);

    useEffect(() => {
        // fecth will be here (guess so)
        fetch_home(BASE_URL + 'categoryDefine/getCategories?type=1', { method: 'GET' })
            .then(res => res.json())
            .then(result => { setscategoryData(result); })
    }, []);

    // console.log("searchable")
    // console.log(props)

    const searchItem = async (searchText) => {
        // console.log("seraching for", searchText)
        const result = await fetch_home(BASE_URL + `search/query?query=${searchText}`, { method: 'GET' })
        const response = (await result.json()).data;
        props.setCatagorySearchProducts(response);
        // console.log(response);
    }

    const bigCatagoryActionCenter = async ({ item }) => {

        props.setIgnoreSearch(true)
        props.setHideHeader(true)
        if (item["action"] == 'SEARCH') {
            // console.log("search for", item['title'])
            searchItem(item['title'])
        }
    }


    const QuadItem = ({ item }) => {

        if ("image" in item) {
            return (
                <>
                    <TouchableOpacity style={styles.catItemSmall} onPress={async () => {

                        if (item["action"] == 'SEARCH') {

                        }
                    }}>
                        <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 8
                        }} imageStyle={{ borderRadius: 8 }}>
                            {/* <Text>{item.title}</Text> */}
                        </ImageBackground>
                    </TouchableOpacity>
                </>
            )
        }
        else
            return (
                <>
                    <TouchableOpacity style={styles.catItemSmall} onPress={async () => {

                        if (item["action"] == 'SEARCH') {
                            // console.log("search for", item['title'])
                        }
                    }}>
                        {/* <Text>{item.title}</Text> */}
                    </TouchableOpacity>
                </>
            )
    }

    const CatagoryItem = ({ item }) => {
        if ('subcategory' in item) {
            if (item['subcategory'].length == 4) {
                return (
                    <>
                        <View style={styles.catItemQuad}>
                            <QuadItem item={item.subcategory[0]} />
                            <QuadItem item={item.subcategory[1]} />
                            <QuadItem item={item.subcategory[2]} />
                            <QuadItem item={item.subcategory[3]} />
                        </View>
                    </>
                )
            }
        }

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

    return (
        <>
            {/* <View style={styles.catagoryText}>
                <Text style={styles.catagoryText}>See what we have got here ..  </Text>
            </View> */}
            <View style={styles.catContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={scategoryData}
                    renderItem={CatagoryItem}
                    initialNumToRender={1}
                    // TODO: Fix in production
                    keyExtractor={item => Math.random()}

                />
            </View>

        </>
    )
}


const styles = StyleSheet.create({
    catContainer: {
        height: 'auto',
        flex: 1,
        flexDirection: "row",
        marginHorizontal: "auto",
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 10,
        backgroundColor: COLOR1
    },
    catItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR2,
        borderRadius: 10,
        height: 'auto',
        width: 'auto',
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
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
        backgroundColor: COLOR2,
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
        backgroundColor: COLOR2,
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

export default SearchableCatagories