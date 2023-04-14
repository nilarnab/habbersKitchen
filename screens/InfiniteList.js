import React, { useEffect, useState } from "react";
import { Animated, View, Dimensions, FlatList, StyleSheet, Image, ActivityIndicator, RefreshControl, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, COLOR1, COLOR2, COLOR3 } from '../env'





const InfiniteList = () => {
    const [feedData, setFeedData] = useState([])
    const navigation = useNavigation()
    console.log('navigation', navigation)

    useEffect(() => {
        const getPosts = async () => {
            var jsonRaw = await fetch(BASE_URL + 'posts/')
            var resp = await jsonRaw.json()
            setFeedData(resp)
        }

        getPosts()
    }, [])


    const ItemRender = ({ item }) => {

        return <>
            <TouchableOpacity style={{
                height: 200,
                width: '100%',
                flexDirection: 'row',
                borderBottomColor: COLOR3,
                borderBottomWidth: 1
            }} onPress={() => {
                navigation.navigate('Post')
            }}>
                <View style={{
                    width: '50%'
                }}>
                    <Image source={{
                        uri: item.yoast_head_json.og_image[0].url
                    }} style={{
                        width: '80%',
                        height: '80%',
                        marginLeft: '10%',
                        marginTop: '10%'

                    }}></Image>
                </View>
                <View style={{
                    width: '50%',
                    paddingTop: 20,
                    paddingHorizontal: 20,

                }}>
                    <Text style={{
                        fontSize: 15,
                        color: COLOR2,
                        fontWeight: 'bold'
                    }}>{item.yoast_head_json.title}</Text>
                </View>
            </TouchableOpacity>
        </>
    }


    return (
        <>
            <View>
                <FlatList
                    data={feedData}
                    renderItem={ItemRender}
                />
            </View>
        </>
    )
}

export default InfiniteList;