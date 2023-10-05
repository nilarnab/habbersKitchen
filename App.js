/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './screens/MainPage';
import PostSpecific from './screens/PostSpecific';
import SplashScreen from 'react-native-splash-screen';
import { CategorySpecific } from './screens/CategorySpecific';
import { Favourites } from './screens/FavouriteList';
import { SearchResult } from './screens/SearchResult';
import { firebase } from '@react-native-firebase/analytics';
import Bar from './screens/Bar';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging'
// import ReactGA from 'react-ga';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// internal imports
import { navigationRef } from './RootNavigator';
import NotificationController from './screens/Notification';

export const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
  // console.log(fcmToken);
  }
  }
const Stack = createNativeStackNavigator();

export const logScreen=(screen)=>{
  try{
    firebase.analytics().logEvent('screen_view', {
      screen: screen,
    }).then(()=>{console.log("screen view added")});
  }
  catch(err){
    console.log(err);
  }
}

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    try{
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
    })

    const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage)
    });
    return unsubscribe;
  }
  catch(err){
    console.log(err);
  }
    });
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
    checkToken();
    logScreen('main')
  }, []);

  return (
    <>
    <NotificationController/>
      <StatusBar
        animated={true}
        backgroundColor="black"
      />
      <Bar />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
          <Stack.Screen name="Post" component={PostSpecific} options={{ headerShown: false }} />
          <Stack.Screen name="Category" component={CategorySpecific} options={{ headerShown: false }} />
          <Stack.Screen name="SearchResult" component={SearchResult} options={{ headerShown: false }} />
          <Stack.Screen name="Favourites" component={Favourites} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
