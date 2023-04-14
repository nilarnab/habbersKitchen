import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View, AppRegistry, FlatList, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InfiniteList from './InfiniteList';
import { COLOR1, COLOR2, COLOR3, COLOR4 } from '../env';
import Header from './UniversalHeader';
import { SideBar } from './SideBar';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';


AppRegistry.registerComponent('Appname', () => App);


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
    const [SideMenu, setSideMenu] = useState(false)
    const [mainWidth, setMainWidth] = useState('100%')
    const fadeAnim = useRef(new Animated.Value(0)).current
    const opAnim = useRef(new Animated.Value(1)).current
    const layout = useWindowDimensions();
    console.log(props)

    useEffect(() => {
        console.log('sidemenue', SideMenu)
        if (SideMenu == 1) {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 200,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start();

            Animated.timing(
                opAnim,
                {
                    toValue: 0.4,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start();
        }
        else {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start();

            Animated.timing(
                opAnim,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start();
        }
    }, [SideMenu])

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

        <View style={{
            flexDirection: 'row',
            height: '100%'
        }}>
            <Animated.View style={{
                width: fadeAnim,
                height: '100%',
                backgroundColor: 'rgb(240, 240, 245)',
            }}>
                <SideBar props={props.navigation} setState={setSideMenu} />
            </Animated.View>

            <View style={{
                width: mainWidth,
                height: '100%',
                backgroundColor: COLOR2,
                elevation: 1
            }}>
                <Animated.View style={{
                    opacity: opAnim,
                    height: '100%'
                }}>
                    <Header SideMenu={SideMenu} setSideMenu={setSideMenu} />
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
                    />
                </Animated.View>
            </View>
        </View>

    </>
}

export default MainPage;