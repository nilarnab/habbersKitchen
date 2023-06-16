import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, TextInput, Button, Pressable, ScrollView, Touchable, TouchableOpacity, Image, } from 'react-native';
import { COLOR1, COLOR2, COLOR3, COLOR4, BASE_URL } from '../env';
import InfiniteList from './InfiniteList';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReactGA from 'react-ga';

export const CategorySpecific = ({ route }) => {
    const navigation = useNavigation();
    useEffect(() => {
        ReactGA.pageview('CategorySpecific');
    }, [])
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
                            <Text style={{ color: 'white', fontSize: 20 }}>{route.params.label}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '20%',
                    }}>
                    </View>
                </View>
                <InfiniteList categoryID={route.params.cid} route={'Category'} />
            </SafeAreaView>
        </>
    );
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




