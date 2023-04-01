import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';


export const SideBar = (props) => {

    return (<>
        <View style={{
            width: 200,
            backgroundColor: COLOR1,
            height: '100%',
            position: "absolute",
            paddingHorizontal: 20,
            paddingTop: 20
        }}>

            <Text style={styles.sidebarItems}>Chicken biriyani</Text>
            <Text style={styles.sidebarItems}>Tandoori Chicken</Text>
            <Text style={styles.sidebarItems}>Fish Fry</Text>
            <Text style={styles.sidebarItems}>Aluu Bhaja</Text>
        </View>
    </>
    )
}

const styles = StyleSheet.create({

    sidebarItems: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        fontWeight: 'bold'
    },
})