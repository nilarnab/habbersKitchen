
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Text, ScrollView, Touchable, TouchableOpacity, ImageBackground } from "react-native";


const data = [
    {
        'title': 'trimmer',
        'action': 'SEARCH',
    },
    {
        'title': 'catagory2',
        'action': 'SEARCH',
        'image': 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        'title': 'catagory2',
        'action': 'SEARCH',
        'image': 'https://images.pexels.com/photos/3755913/pexels-photo-3755913.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        'title': 'catagory2',
        'action': 'SEARCH',
        'image': 'https://images.pexels.com/photos/3755913/pexels-photo-3755913.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        'title': 'catagory2',
        'action': 'SEARCH',
        'image': 'https://images.pexels.com/photos/3755913/pexels-photo-3755913.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
        'title': 'catagory2',
        'action': 'SEARCH',
        'image': 'https://images.pexels.com/photos/3755913/pexels-photo-3755913.jpeg?auto=compress&cs=tinysrgb&w=800'
    },


]



const bigCatagoryActionCenter = async ({ item }) => {

    if (item["action"] == 'SEARCH') {
        console.log("search for", item['title'])
    }
}


const QuadItem = ({ item }) => {
    console.log("from quad item")
    console.log(item)

    if ("image" in item) {
        return (
            <>
                <TouchableOpacity style={styles.catItemSmall} onPress={async () => {

                    if (item["action"] == 'SEARCH') {
                        console.log("search for", item['title'])
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
                        console.log("search for", item['title'])
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
                    <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={{
                        width: '100%',
                        height: '100%',
                    }} imageStyle={{ borderRadius: 50 }}>
                        {/* <Text>{item.title}</Text> */}
                    </ImageBackground>
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




const SearchableCatagories = () => {

    useEffect(() => {
        // fecth will be here (guess so)
    });

    return (
        <>
            {/* <View style={styles.catagoryText}>
                <Text style={styles.catagoryText}>See what we have got here ..  </Text>
            </View> */}
            <FlatList
                horizontal
                data={data}
                renderItem={CatagoryItem}
                initialNumToRender={1}
                // TODO: Fix in production
                keyExtractor={item => Math.random()}

            />

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
    },
    catItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        height: 80,
        width: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 0,
        margin: 10

    },
    catItemQuad: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
        borderRadius: '50%',
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