import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR1, COLOR2, COLOR3, COLOR4, BASE_URL } from '../env';


export const SideBar = (props) => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${BASE_URL}categories`);
            const jsonData = await response.json();
            if (jsonData.length > 0) {
                setCategories(jsonData)
            }
        } catch (error) {
            console.log("Error fetching categoriess:", error);
        }
    }

    return (<>
        <View style={{
            width: 200,
            backgroundColor: COLOR1,
            height: '100%',
            position: "absolute",
            paddingHorizontal: 20,
            paddingTop: 20
        }}>
            {/* {categories.map((el) => {
                console.log(el.name)
                return <Text style={styles.sidebarItems}>{el.name}</Text>
            })} */}
        </View>
    </>
    )
}

const styles = StyleSheet.create({

    sidebarItems: {
        width: '100%',
        // height: 30,
        flexDirection: 'row',
        fontWeight: 'bold',
        color: 'gray'
    },
})