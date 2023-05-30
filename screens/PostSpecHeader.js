import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, useWindowDimensions, TouchableOpacity, Touchable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InfiniteList from './InfiniteList';
import { COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import { SideBar } from './SideBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

export const Header = () => {
    const navigation = useNavigation();
    console.log('navigation', navigation)
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
                width: '20%',
                flexDirection: 'row'
            }}>

                <TouchableOpacity style={{
                    width: '50%',
                    marginTop: 20,
                }} >
                    <Icon name='share-alt' size={20} color={COLOR1} />
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: 20,
                    marginTop: 20,
                }}>
                    <Icon name='bookmark' size={20} color={COLOR1} />
                </TouchableOpacity>

            </View>
        </View>
    </>

}