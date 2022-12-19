import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
import Video, { DRMType } from 'react-native-video';
import { ActivityIndicator, Button } from 'react-native-paper';
import { navigate } from "../RootNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
const uri = "http://159.223.90.95:5000/video/id_video_1/_manifest.mpd"
function DashVideo() {
    return (
        <Video
            source={{ uri: uri }}
            rate={1.0}
            isMuted={true}
            resizeMode="stretch"
            shouldPlay
            repeat={true}
            style={styles.dash}
        />
    );
}

// const userId = "630dc78ee20ed11eea7fb99f"
// const BASE_URL = 'https://desolate-gorge-42271.herokuapp.com/'
const BASE_URL = 'http://159.223.90.95:3000/'

function AddToCartButton({ productID }) {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [cartID, setCartID] = useState(null);
    const [userId, setUserId] = useState('630dc78ee20ed11eea7fb99f')


    const fetchCart = async () => {
        setLoading(true);
        console.log("Loading product specific view for", productID)

        const resp = await fetch(BASE_URL + `handleCartOps/show_items?user_id=${userId}`, { method: 'POST' })
        const { response } = await resp.json();
        const cartItems = response["cart_items"];
        const item = cartItems.find(e => e[Object.keys(e)[0]]._id === productID)
        if (item === undefined) {
            setCount(0);
            setCartID(null);
        } else {
            setCount(item["qnt"]);
            setCartID(Object.keys(item)[0]);
        }
        console.log(JSON.stringify(item, null, 2));
        setLoading(false);
    };

    // useEffect does not support async functions directly
    useEffect(() => { fetchCart(); }, [])


    const fetch_session = async () => {

        console.log("fetching user id")
        var user_id_temp = await AsyncStorage.getItem('user_id')

        setUserId(user_id_temp)
        // console.log("user id")
        // console.log(userId)

    };

    const addProduct = async () => {
        setLoading(true);
        await fetch_session()

        console.log("Adding product", productID);
        const resp = await fetch(BASE_URL + `handleCartOps/insert?user_id=${userId}&prod_id=${productID}&qnt=1`, { method: 'POST' })
        const data = await resp.json();
        console.log(data);

        fetchCart()
    };

    const modifyCount = async (newCount) => {
        setLoading(true);

        await fetch_session()

        const resp = await fetch(BASE_URL + `handleCartOps/alter?cart_id=${cartID}&qnt_new=${newCount}`, { method: 'POST' })
        console.log("response")
        console.log(resp.json())

        fetchCart()
    }

    if (loading) {
        return (
            <ActivityIndicator size={38} color="black" />
        );
    }
    if (count === 0)
        return (
            <Button icon="cart" mode="contained" style={{ backgroundColor: "black" }} onPress={addProduct}>
                Add To Cart
            </Button>
        )
    else
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: "center" }}>
                <Button style={styles.button} onPress={() => modifyCount(count - 1)} mode="contained">-</Button>
                <Text style={{ flexGrow: 1, textAlign: "center", fontSize: 20 }}>{count}</Text>
                <Button style={styles.button} onPress={() => modifyCount(count + 1)} mode="contained">+</Button>
            </View>
        );
}






export default function ProductSpecific({ route }) {
    const { item } = route.params;
    const fetch_session_phone = async () => {
        var phoneNo = await AsyncStorage.getItem('user_phone')
        const items = {
            phone: phoneNo,
        }
        console.log(items.phone)

        if (phoneNo == null) {
            // console.log('navigating to main page')
            props.navigation.navigate("Main")
        }
        else {
            navigate("Pay", { items });
        }

    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: "rgb(250, 250, 250)" }}>
                <DashVideo />
                <View style={styles.screen}>
                    <Text style={styles.productname}>{item.name}</Text>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ paddingRight: 2, ...styles.text }}>{item.ratings}</Text>
                            {/* <Ionicons name="star" size={20} color="orange" /> */}
                        </View>
                        <Text style={styles.text}>₹{item.price}</Text>
                    </View>
                    <View style={{ height: 2, backgroundColor: "lightgrey", marginVertical: 10 }} />
                    <Text style={styles.description}>{item.description}</Text>
                    <TouchableOpacity mode="contained" style={{
                        backgroundColor: 'white',
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        marginTop: 50,
                        borderColor: 'green',
                    }} onPress={fetch_session_phone}>
                        <Text style={{ color: 'green', fontSize: 20, fontWeight: 'bold' }}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
            <View style={styles.footer}>
                <AddToCartButton productID={item._id} />
            </View>
        </View >
    );


}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        marginHorizontal: 0,
        marginBottom: 0,
        marginTop: 0,
        borderRadius: 15,
    },
    productname: {
        paddingBottom: 5,
        fontWeight: "bold",
        fontSize: 30,
        color: 'black'
    },
    
    dash: {
        height: 250,
    },
    text: {
        fontSize: 20,
    },
    description: {
        marginTop: 10,
        fontSize: 15,
    },
    button: {
        backgroundColor: "black",
        width: "30%"
    },
    footer: {
        padding: 20,
        backgroundColor: "#fff",
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowColor: 'black',
        elevation: 10,
    },
});