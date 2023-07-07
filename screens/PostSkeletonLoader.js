import React, { useEffect, useState } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL, COLOR1, COLOR2, LIGHT_GREY } from '../env';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Header } from './SearchResultHeader';
import { ActivityIndicator } from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'


const ItemRender = ({ item }) => {
    return <>
        <View
            style={styles.itemContainer}

        >
            <View style={styles.imageContainer}>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}

                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    style={{
                        height: 20,
                        width: '80%',
                        marginBottom: 5,
                    }} />
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    style={{
                        height: 20,
                        width: '30%'
                    }} />
            </View>
        </View>
    </>
}
export const ShimmeringSkeletonLoader = ({ count, numColumns }) => {

    var countArr = Array.from(Array(count).keys())
    numColumns ? numColumns : numColumns = 1

    if (countArr.length) {
        return <>
            <View style={{ height: count * 170, width: Dimensions.get("screen").width }}>
                <FlashList
                    data={countArr}
                    renderItem={ItemRender}
                    numColumns={numColumns}
                    key={numColumns}
                    estimatedItemSize={170}
                />
            </View>
        </>
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    itemContainer: {
        height: 170,
        width: "100%",
        flexDirection: "row",
        borderBottomColor: LIGHT_GREY,
        borderBottomWidth: 0.5,
    },
    imageContainer: {
        width: "50%",
    },
    image: {
        width: "80%",
        height: 150,
        marginLeft: "10%",
        marginTop: 10,
    },
    textContainer: {
        width: "50%",
        paddingTop: 10,
        paddingRight: 20,
    },
    title: {
        fontSize: 15,
        color: COLOR2,
        fontWeight: "bold",
    },
    loadingIndicator: {
        marginVertical: 20,
    },
});