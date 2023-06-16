import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
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
            {props.sideList ? props.sideList.map((el) => {
                return (<TouchableOpacity key={el.id} style={styles.sideItemWrapper} onPress={() => {
                    navigation.navigate("Category", { cid: el.id, label: el.label });
                }}
                ><Text style={{ ...styles.sidebarItems, textTransform: 'uppercase' }}>{el.label}</Text></TouchableOpacity>)
            }) : <></>}


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