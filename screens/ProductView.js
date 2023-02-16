import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { navigate } from "../RootNavigator";
import { ActivityIndicator, Button } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from '../env'
import LinearGradient from "react-native-linear-gradient";

function AddToCartButton({ productID }) {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [cartID, setCartID] = useState(null);
    const [userId, setUserId] = useState(null)



    const fetchCart = async () => {
        setLoading(true);

        // get user id  

        var user_id_temp = await AsyncStorage.getItem('user_id')
        setUserId(user_id_temp)

        const resp = await fetch(BASE_URL + `handleCartOps/show_item?user_id=${user_id_temp}&prod_id=${productID}`, { method: 'POST' })
        const response = await resp.json();

        if (response.cart_item == null) {
            setCount(0);
            setCartID(null);
        } else {

            const cartItem = response.cart_item
            const count = cartItem["qnt"];

            setCount(count);
            setCartID(cartItem["_id"]);
        }

        setLoading(false);
    };

    // useEffect does not support async functions directly
    useEffect(() => {
        fetchCart();
    }, [])

    const addProduct = async () => {
        setLoading(true);

        const resp = await fetch(BASE_URL + `handleCartOps/insert?user_id=${userId}&prod_id=${productID}&qnt=1`, { method: 'POST' })
        const data = await resp.json();
        fetchCart()
    };

    const modifyCount = async (newCount) => {
        setLoading(true);
        await fetch(BASE_URL + `handleCartOps/alter?cart_id=${cartID}&prod_id=${productID}&qnt_new=${newCount}`, { method: 'POST' })

        fetchCart()
    }

    if (loading) {
        return (
            <ActivityIndicator size={38} color="black" />
        );
    }

    if (count === 0)
        return (
            <Button icon="cart" mode="contained" style={{ backgroundColor: "black", borderRadius: 50 }} onPress={addProduct}>Add </Button>
        )
    else
        return (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: "space-around", width: '100%' }}>
                <Button style={styles.button} onPress={() => modifyCount(count - 1)} mode="contained">-</Button>
                <Text style={{ flexGrow: 1, textAlign: "center", fontSize: 20, color: "black", minWidth: 60 }}>{count}</Text>
                <Button style={styles.button} onPress={() => modifyCount(count + 1)} mode="contained">+</Button>
            </View>
        );
}
/**
 * Product View Componentnp
 */
const ProductView = ({ item, navigation }) => {

    const openSpecificView = () => {
        navigate("ProductSpecific", { item, navigation });
    };

    return (

        <TouchableOpacity style={styles.itemWrapperStyle} onPress={openSpecificView}>


            {/* <View style={{
                height: 180,
                width: 180,
                borderRadius: 90,
                backgroundColor: '#CCF2F4',
                alignSelf: 'center',
                position: 'absolute',
                transform: [{ translateY: -40 }],
            }}></View> */}

            {/* <View style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                backgroundColor: '#A4EBF3',
                alignSelf: 'center',
                position: 'absolute',
                transform: [{ translateY: 40 }],
            }}></View> */}
            <LinearGradient colors={['white', 'aliceblue', '#A4EBF3']} style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 10,
            }}>
                {/* <View style={{
                    height: 250,
                    width: 250,
                    borderRadius: 250,
                    backgroundColor: '#CCF2F4',
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: 0,
                    shadowColor: "black",
                    elevation: 10,
                    transform: [{ translateY: 100 }],
                }}></View>

                <View style={{
                    height: 150,
                    width: 150,
                    borderRadius: 100,
                    backgroundColor: '#A4EBF3',
                    alignSelf: 'center',
                    position: 'absolute',
                    bottom: 0,
                    transform: [{ translateY: 40 }],
                }}></View> */}

                <Image style={styles.itemImageStyle} source={{ uri: item.image }} />
                <View style={styles.contentWrapperStyle}>
                    <Text style={styles.txtNameStyle} >{item.name}</Text>
                </View>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <View style={styles.bottomIcon}>
                        <Image source={{ uri: 'https://img.icons8.com/3d-fluency/94/null/star.png' }} style={{ width: 20, height: 20 }} />
                        <Text style={styles.bottomContentText}>{item.ratings}</Text>
                    </View>
                    <View style={styles.bottomIcon}>
                        <Image source={{ uri: 'https://img.icons8.com/3d-fluency/94/null/price-tag.png' }} style={{ width: 20, height: 20 }} />
                        <Text style={styles.bottomContentText}>{item.price} ₹ </Text>
                    </View>
                </View>

                <View >
                    <AddToCartButton productID={item._id} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemWrapperStyle: {
        width: '47%',
        height: 'auto',
        overflow: 'hidden',
        margin: "1.5%",
        borderColor: 'lightgrey',
        // borderWidth:2,
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderRadius: 10,
        shadowColor: '#3a748a',
        shadowOffset: { width: 20, height: 10 },
        elevation: 15,
        backgroundColor: 'green'
    },
    itemImageStyle: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 5
    },
    contentWrapperStyle: {
        alignItems: "flex-start",
        marginTop: 10,
        marginBottom: 5,
        height: 'auto',
    },
    title: {
        color: "black",
        fontSize: 14,
    },
    bottomContent: {
        width: '20%',
        textAlign: 'center',
        height: 'auto',
    },
    bottomContentWrapper: {
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    bottomIcon: {
        width: '50%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: "nowrap",
    },
    bottomContentText: {
        color: "black",
        fontSize: 14,
        height: 'auto'
    },

    txtNameStyle: {
        fontSize: 20,
        height: 50,
        color: "black",
        fontWeight: "bold",
        overflow: "hidden",

    },

    button: {
        backgroundColor: "black",
        width: '10%',
    },
});

// TODO: Optimize large virtualized list
export default ProductView;