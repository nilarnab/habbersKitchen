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


const Stack = createNativeStackNavigator();


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
          <Stack.Screen name="Post" component={PostSpecific} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>


      {/* <NavigationContainer ref={navigationRef}>

        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
          <Stack.Screen name="Phone" component={PhoneNumber}
            options={{ headerShown: false }}
            screenOptions={{
              headerMode: 'screen',
              defaultNavigationOptions: {
                cardStyle: { backgroundColor: '#FFFFFF' },
              },
            }}
          />
          <Stack.Screen name="ProductSpecific" component={ProductSpecific} />
          <Stack.Screen name="Pay" component={Payment} />
          <Stack.Screen name="PreBuyPipe" component={PreBuyComp} options={{ headerShown: false }} />
          <Stack.Screen name="OrderStatus" component={OrderStatus} />
          <Stack.Screen name="OldOrderStatus" component={OldOrderStatus} />
          <Stack.Screen name="Wishlist" component={Wishlistview} />
          <Stack.Screen name="ReportBug" component={BugReport} />
        </Stack.Navigator>
      </NavigationContainer> */}
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
