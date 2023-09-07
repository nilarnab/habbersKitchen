import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'
import { GET_POST_URL } from '../env';
import { Header } from './PostSpecHeader';
import ReactGA from 'react-ga';
import { useState } from 'react';
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { ANDROID_INTER_UNIT_ID, IOS_INTER_UNIT_ID } from '../env';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const PostSpecific = ({ route }) => {
  const [sharable, setSharable] = useState(null)
  const interstitial = InterstitialAd.createForAdRequest(ANDROID_INTER_UNIT_ID, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    ReactGA.pageview('PostSpecific');
  }, [])

  useEffect(() => {
    const getSharable = () => {
      axios.get('https://hebbarskitchen.com/wp-json/wp/v2/posts/' + route.params.pid)
        .then((response) => response.data)
        .then(({ title, link }) => {
          setSharable(title.rendered + ":\n" + link)
        })
        .catch((error) => {
          console.error("Error fetching title", error);
        });
    }

    getSharable();
  }, [])

  useEffect(() => {
    const load_ad = async () => {
      try {
        interstitial.load()
        interstitial.addAdEventListener(AdEventType.LOADED, () => {
          interstitial.show({
            immersiveModeEnabled: true,



          });
        });

        interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
          console.log('Interstitial ad failed to load:', error);
        });
      } catch (error) {
        console.log('Error loading or showing interstitial ad:', error);
      }
    };

    load_ad();
  }, []);

  return <>
    <SafeAreaView style={{
      backgroundColor: 'white',
      height: '100%',
    }}>
      <Header sharable={sharable} pid={route.params.pid} />
      <WebView
        originWhitelist={['*']}
        source={{ uri: GET_POST_URL + route.params.pid }}
        style={{ flex: 1 }}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

    </SafeAreaView></>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
});

export default PostSpecific