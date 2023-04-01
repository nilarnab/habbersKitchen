import React, { useEffect, useState, useRef } from 'react';
import { Animated, SafeAreaView, Image, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, TouchableOpacity, } from 'react-native';
import { COMPNAY_NAME, BASE_URL } from './env.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { COLOR1, COLOR2, COLOR3, COLOR4, COLOR5 } from './env';



const data = COMPNAY_NAME


const SideBar = ({ props, setState }) => {


    return (
        <>
            <View style={{
                width: '100%',
                alignItems: 'center',
                height: '100%'
            }}>
                <View style={{
                    width: '100%',
                    height: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Image source={require('./resources/images/buyboldlogo.png')} style={{ width: 160, height: 160, alignSelf: 'center' }} />
                    <Text style={{
                        fontSize: 25,
                        color: COLOR5,
                        marginBottom: 20,
                        width: 200,
                        textAlign: 'center'
                    }}>
                        {data}
                    </Text>
                </View>



                <View style={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    // elevation: 10,
                    backgroundColor: COLOR1,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    elevation: 10,
                    paddingTop: 20
                }}>

                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={async () => {
                            setState(0)
                            props.navigate('Home')
                        }} style={styles.tabTab}>
                            <Text style={styles.tabTextStyle}>Move to Home</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={async () => {
                            setState(0)
                            props.navigate('Profile')
                        }} style={styles.tabTab}>
                            <Text style={styles.tabTextStyle}>See Profile</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={async () => {
                            setState(0)
                            props.navigate('Wishlist')
                        }} style={styles.tabTab}>
                            <Text style={styles.tabTextStyle}>Your Wishlist</Text>
                        </TouchableOpacity>
                    </View> */}


                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={async () => {
                            setState(0)
                            props.navigate('Cart')
                        }} style={styles.tabTab}>
                            <Text style={styles.tabTextStyle}>Visit Cart Items</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={async () => {
                            setState(0)
                            props.navigate('OldOrderStatus')
                        }} style={styles.tabTab}>
                            <Text style={styles.tabTextStyle}>See Old Orders</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tabContainer}>
                        <TouchableOpacity onPress={async () => {
                            setState(0)
                            props.navigate('ReportBug')
                        }} style={styles.tabTab}>
                            <Text style={styles.tabTextStyle}>Report a Bug</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.tabContainer, {

                    }]}>
                        <TouchableOpacity onPress={async () => {
                            setState(0)
                            await AsyncStorage.removeItem('name')
                            await AsyncStorage.removeItem('phone')
                            await AsyncStorage.removeItem('uuid')
                            await AsyncStorage.removeItem('email')
                            await AsyncStorage.removeItem('user_id')

                            if (auth().currentUser) {
                                await auth().signOut()
                            }

                            props.navigate('Phone')

                        }} style={
                            styles.tabTab
                        }>
                            <Text style={{
                                color: COLOR1,
                                textAlign: 'center',
                                width: 100,
                            }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        width: 180,
        height: 50,
        marginTop: 10,
        backgroundColor: COLOR2,
        borderRadius: 20,
        elevation: 2
    },
    tabTab:
    {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabTextStyle: {
        color: 'black',
        textAlign: 'center',
        width: 100,
    }

})



export default SideBar