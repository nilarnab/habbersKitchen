import React, { useEffect, useState, useRef, useCallback, useMemo, memo } from 'react';
import { Animated, SafeAreaView, ActivityIndicator, View, AppRegistry, useWindowDimensions, Text, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import InfiniteList from './InfiniteList';
import { COLOR1, COLOR2 } from '../env';
import Header from './UniversalHeader';
import { SideBar } from './SideBar';
import axios from 'axios';
import { ShimmeringSkeletonLoader } from './PostSkeletonLoader';
import ReactGA from 'react-ga';
AppRegistry.registerComponent('Appname', () => App);

const RenderScene = ({ categories, index, route }) => {
    const category = categories.find((c) => c.label === route.key);
    const indexCat = categories.findIndex(c => c.label === route.key)
    return (
        <View style={{ flex: 1, backgroundColor: COLOR1 }}>
            <InfiniteList categoryID={category.id} route={route.key} visibleIndex={index} categoryIndex={indexCat} categoryUrl={category.endpoint_url} />
        </View>
    );

};

export function MainPage(props) {
    const [sideMenu, setSideMenu] = useState(false);
    const [mainWidth, setMainWidth] = useState('100%');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const opAnim = useRef(new Animated.Value(1)).current;
    const layout = useWindowDimensions();

    useEffect(() => {
        ReactGA.pageview('Main');
        if (sideMenu) {
            Animated.timing(fadeAnim, {
                toValue: 200,
                duration: 500,
                useNativeDriver: false,
            }).start();

            Animated.timing(opAnim, {
                toValue: 0.4,
                duration: 500,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();

            Animated.timing(opAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
    }, [sideMenu]);

    const [categories, setCategories] = useState([]);
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState([]);
    const [sideList, setSideList] = useState([])
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        axios.get('https://hebbarskitchen.com/ml-api/v1/config/')
            .then((response) => response.data)
            .then((data) => {
                setCategories(data.horizontal_navigation);
                setSideList(data.hamburger_navigation);
                const generatedRoutes = data.horizontal_navigation.map((category) => ({
                    key: category.label,
                    title: category.label,
                }));
                setRoutes(generatedRoutes);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const renderTabBar = useCallback(

        (props) => {
            return <TabBar
                scrollEnabled={true}
                style={{
                    backgroundColor: COLOR2,
                    elevation: 0,
                }}
                tabStyle={{
                    width: 'auto'
                }}
                labelStyle={{
                    color: COLOR1,
                    fontSize: 14,
                    fontWeight: 'bold',
                }}
                {...props}
                indicatorStyle={{
                    backgroundColor: COLOR1,
                }}
            />
        },
        [width]
    );

    // const memoizedRenderScene = useMemo(() => renderScene(categories, index), [categories, index]);

    if (categories.length === 0 || routes.length === 0) {
        // Handle the loading state while categories are being fetched
        return (
            <>
                <Header SideMenu={sideMenu} setSideMenu={setSideMenu} />
                <View style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    position: 'absolute',
                    zIndex: 1
                }}>
                    <ActivityIndicator size={'large'} color={COLOR2} />
                </View>
            </>
        );
    }

    return (
        <>
            <View style={{ flexDirection: 'row', height: '100%' }}>
                <Animated.View style={{ width: fadeAnim, height: '100%', backgroundColor: 'rgb(240, 240, 245)' }}>
                    <SideBar props={props.navigation} sideList={sideList} setState={setSideMenu} />
                </Animated.View>

                <Pressable style={{ width: mainWidth, height: '100%', backgroundColor: COLOR2, elevation: 1 }} onPress={() => { setSideMenu(0); }} >
                    <Animated.View pointerEvents={sideMenu ? "none" : 'auto'} style={{ opacity: opAnim, height: '100%' }}>
                        <Header SideMenu={sideMenu} setSideMenu={setSideMenu} />
                        <TabView
                            style={{ backgroundColor: 'white' }}
                            renderTabBar={renderTabBar}
                            navigationState={{ index, routes }}
                            renderScene={({ route }) => <RenderScene categories={categories} index={index} route={route} />}
                            onIndexChange={setIndex}
                            initialLayout={{ width: layout.width }}
                            overScrollMode={'always'}
                        />
                    </Animated.View>
                </Pressable>
            </View>
        </>
    );
}

export default MainPage;
