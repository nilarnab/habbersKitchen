import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, useWindowDimensions, TouchableOpacity, Touchable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ searchText }) => {
    const navigation = useNavigation();
    return <>
        <View
            style={{
                height: 60,
                width: '100%',
                backgroundColor: COLOR2,
                flexDirection: 'row'
            }}>
            <View style={{
                width: '80%',
                display: 'flex',
                flex: 1,
                flexDirection: 'row'
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
                <Text style={{ color: 'white', marginTop: 20, marginLeft: 20 }}>Search results for "{searchText}"</Text>

            </View>
            <View style={{
                width: '20%',
                flexDirection: 'row'
            }}>

                <TouchableOpacity style={{
                    width: '50%',
                    marginTop: 20,
                }} >
                    {/* <Icon name='share-alt' size={20} color={COLOR1} /> */}
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: 20,
                    marginTop: 20,
                }}>
                    {/* <Icon name='shopping-cart' size={20} color={COLOR1} /> */}
                </TouchableOpacity>

            </View>
        </View>
    </>

}