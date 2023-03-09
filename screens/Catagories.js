
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Image, RefreshControl, Text, ScrollView, Touchable, TouchableOpacity, ImageBackground } from "react-native";
import { BASE_URL, COLOR1, COLOR2, COLOR3, COLOR4 } from '../env'
import LinearGradient from 'react-native-linear-gradient';
import fetch_home from '../methods/fetch';
const bigCatagoryActionCenter = async ({ item }) => {

    if (item["action"] == 'SEARCH') {
        // console.log("search for", item['title'])
    }
}


const QuadItem = ({ item }) => {
    if ("image" in item) {
        return (
            <>
                <TouchableOpacity style={styles.catItemSmall} onPress={async () => {

                    if (item["action"] == 'SEARCH') {
                        // console.log("search for", item['title'])
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
                <LinearGradient colors={[COLOR2, COLOR2]} style={styles.catItem}>
                    <TouchableOpacity onPress={() => bigCatagoryActionCenter({ item })}>

                        {/* <Text style={styles.catagoryText}>{item.title}</Text> */}

                        {/* <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} /> */}

                        {/* <View style={{
                            position: 'absolute',
                            height: 200,
                            width: 200,
                            borderRadius: 100,
                            bottom: 0,
                            transform: [{ translateY: 100 }],
                            alignSelf: 'center',
                            backgroundColor: '#A4EBF3'
                        }}></View> */}

                        <Image source={{ uri: item.image }} resizeMode="cover" style={{
                            width: 180,
                            height: 180,
                            borderRadius: 10
                        }} Image>
                        </Image>
                        {/* <Text style={styles.catItemTitle}>{item.title}</Text> */}


                    </TouchableOpacity>
                </LinearGradient>

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


const Catagories = () => {
    const [categoryData, setcategoryData] = useState([]);

    useEffect(() => {
        fetch_home(BASE_URL + 'categoryDefine/getCategories?type=0', { method: 'GET' })
            .then(res => res.json())
            .then(result => { setcategoryData(result); })
    }, []);

    return (
        <>
            <View style={styles.catagoryBlock}>
                {/* <Image source={{ uri: 'https://img.icons8.com/3d-fluency/94/null/like--v4.png' }} style={{ width: 35, height: 35 }} />
                <Text style={styles.catagoryText}>Just for you .. </Text> */}
            </View>
            <View style={styles.catContainer}>
                <FlatList
                    horizontal
                    data={categoryData}
                    renderItem={CatagoryItem}
                    initialNumToRender={1}
                    showsHorizontalScrollIndicator={false}
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
        marginLeft: 5,
        backgroundColor: COLOR1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingVertical: 10,
    },
    catItem: {
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLOR2,
        height: 180,
        width: 180,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        borderColor: 'lightgrey',
        marginLeft: 10,
        borderRightWidth: 0.5,
        overflow: 'hidden'

    },
    catItemTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
    },
    catItemQuad: {
        backgroundColor: COLOR2,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 8,
        padding: 11,
        height: 180,
        width: 180,
        margin: 4,
    },

    catagoryBlock: {
        fontWeight: '800',
        fontSize: 25,
        marginTop: 0,
        marginLeft: 20,
        color: 'black',
        flexDirection: 'row',
    },

    catagoryText: {
        fontWeight: '800',
        fontSize: 25,
        marginTop: 0,
        marginLeft: 10,
        color: 'black',
        flexDirection: 'row',
    },

    catItemSmall: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 75,
        width: 75,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        margin: 2

    },
})

export default Catagories