import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InfiniteList from './InfiniteList';
import { COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import Header from './UniversalHeader';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


AppRegistry.registerComponent('Appname', () => App);

const userId = "630dc78ee20ed11eea7fb99f"
const Tab = createBottomTabNavigator()


const Home = () => (
    <View style={{ flex: 1, backgroundColor: COLOR1 }}>
        <InfiniteList />
    </View>
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: COLOR1 }} />
);

const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: COLOR1 }} />
);

const renderScene = SceneMap({
    home: Home,
    second: SecondRoute,
    third: ThirdRoute
});

export function MainPage(props) {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home' },
        { key: 'second', title: 'Some Recipie' },
        { key: 'third', title: 'Some Recipie' },
    ]);

    function renderTabBar(props) {
        return (<TabBar
            scrollEnabled={true}
            style={{
                backgroundColor: COLOR2,
                elevation: 0,
                borderColor: '#000000',
                borderBottomWidth: 1,
                height: 45,
                width: 'auto'
            }}
            labelStyle={{
                color: COLOR1,
                fontSize: 14,
                fontWeight: 'bold'
            }}
            {...props}
            indicatorStyle={{ backgroundColor: COLOR1, height: 2.5 }}
        />
        );
    }

    return <>
        <Header />
        <TabView
            style={{
                backgroundColor: 'white'
            }}
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            overScrollMode={'always'}
            sceneContainerStyle={{
                backgroundColor: 'red'
            }}
        />
    </>
}

export default MainPage;