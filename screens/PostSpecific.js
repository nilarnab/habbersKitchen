import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview'
import { GET_POST_URL } from '../env';
import { Header } from './PostSpecHeader';
import ReactGA from 'react-ga';
import { useState } from 'react';
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const PostSpecific = ({ route }) => {
  const [title, setTitle] = useState(null)

  useEffect(() => {
    ReactGA.pageview('PostSpecific');
  }, [])

  useEffect(() => {
    const getTitle = () => {
      axios.get('https://hebbarskitchen.com/wp-json/wp/v2/posts/' + route.params.pid)
        .then((response) => response.data.title.rendered)
        .then((data) => {
          setTitle(data)
        })
        .catch((error) => {
          console.error("Error fetching title", error);
        });
    }

    getTitle();
  }, [])

  return <>
    <SafeAreaView style={{
      backgroundColor: 'white',
      height: '100%',
    }}>
      <Header sharable={title} />
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