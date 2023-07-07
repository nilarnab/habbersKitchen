import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, Linking } from 'react-native';
import { COLOR1, COLOR2, COLOR3, COLOR4, BASE_URL } from '../env';


export const SideBar = (props) => {
    const navigation = useNavigation();
    return (<>
        <ScrollView style={{
            width: 200,
            backgroundColor: COLOR1,
            height: '100%',
            position: "absolute",
            paddingHorizontal: 20,
            paddingBottom: 20
        }}>
            <TouchableOpacity key={-1} style={styles.sideItemWrapper} onPress={() => {
                navigation.navigate("Category", { cid: 15572, label: 'Home' });
            }}
            ><Text style={{ ...styles.sidebarItems, textTransform: 'uppercase' }}>Home</Text></TouchableOpacity>
            {props.sideList ? props.sideList.map((el) => {
                return (<TouchableOpacity key={el.id} style={styles.sideItemWrapper} onPress={() => {
                    navigation.navigate("Category", { cid: el.id, label: el.label });
                }}
                ><Text style={{ ...styles.sidebarItems, textTransform: 'uppercase' }}>{el.label}</Text></TouchableOpacity>)
            }) : <></>}
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}></View>
            <TouchableOpacity key={-2} style={styles.sideItemWrapper} onPress={() => {
                navigation.navigate('Favourites')
            }}
            ><Text style={{ ...styles.sidebarItems, textTransform: 'uppercase' }}>Favourites</Text></TouchableOpacity>
            <TouchableOpacity key={-3} style={styles.sideItemWrapper} onPress={() => {
                Linking.openURL('mailto:hebbars.kitchen@gmail.com')
            }}
            ><Text style={{ ...styles.sidebarItems, textTransform: 'uppercase' }}>Email Us</Text></TouchableOpacity>
            <TouchableOpacity key={-4} style={styles.sideItemWrapper} onPress={() => {
                console.log("setting");
            }}
            ><Text style={{ ...styles.sidebarItems, textTransform: 'uppercase' }}>Setting</Text></TouchableOpacity>


        </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({

    sidebarItems: {
        width: '100%',
        // height: 30,
        fontSize: 14,
        flexDirection: 'row',
        fontWeight: 'bold',
        verticalAlign: 'middle',
        flex: 1,
        color: 'gray',
    },
    sideItemWrapper: {
        height: 50,
        flex: 1,
    }
})