import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native';
import { BASE_URL, COLOR1, COLOR2, COLOR3, LIGHT_GREY, ANDROID_BANNER_UNIT_ID, IOS_BANNER_UNIT_ID } from "../env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
// import ReactGA from 'react-ga';
import axios from 'axios';
import { FlashList } from '@shopify/flash-list';
import { logScreen } from '../App';

export const Favourites = ({ route }) => {
    const navigation = useNavigation();
    const [favoriteRecipes, setFavoriteRecipes] = useState({});


    useEffect(() => {
        loadFavoriteRecipes();
    }, []);

    const fetchFavoriteRecipes = async (ids) => {
        try {
            const temp = await Promise.all(ids.map(async (pid) => {
                let res = await axios.get('https://hebbarskitchen.com/wp-json/wp/v2/posts/' + pid)
                const { id, yoast_head_json } = await res.data
                return { id: id, title: yoast_head_json.title, image: yoast_head_json.og_image[0].url }
            }))
            setFavoriteRecipes(temp)
        } catch (error) {
            console.log('Error fetching favorite recipes:', error);
        }
    };
    const loadFavoriteRecipes = async () => {
        try {
            const savedRecipes = await AsyncStorage.getItem('@favoriteRecipes');
            if (savedRecipes !== null) {
                fetchFavoriteRecipes(JSON.parse(savedRecipes));
            }
        } catch (error) {
            console.log('Error loading favorite recipe ids:', error);
        }
    };
    useEffect(() => {
        logScreen('facourites')
    }, [])
    const ItemRender = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate("Post", { pid: item.id });
                }}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: item.image,
                        }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <>
            <SafeAreaView style={{
                backgroundColor: 'white',
                height: '100%',
            }}>
                <View
                    style={{
                        height: 60,
                        width: '100%',
                        backgroundColor: COLOR2,
                        flexDirection: 'row'
                    }}>
                    <View style={{
                        width: '20%',
                    }}>
                        <TouchableOpacity style={{
                            width: 20,
                            marginLeft: 20,
                            marginTop: 20
                        }} onPress={() => {
                            navigation.goBack()
                        }}>
                            <Icon name='arrow-left' size={20} color={COLOR1} />
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        width: '60%',
                        flexDirection: 'row'
                    }}>

                        <TouchableOpacity style={{
                            width: '100%',
                            marginTop: 20,
                            flex: 1,
                            alignItems: "center"
                        }} >
                            <Text style={{ color: 'white', fontSize: 20, textTransform: 'uppercase' }}>Favourites</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '20%',
                    }}>
                    </View>
                </View>
                <FlashList
                    data={favoriteRecipes}
                    renderItem={ItemRender}
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    key={1}
                    horizontal={false}
                    numColumns={1}
                    estimatedItemSize={170}
                />
            </SafeAreaView>
        </>
    );
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





