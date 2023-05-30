import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview'
import { GET_POST_URL } from '../env';
import { Header } from './PostSpecHeader';


const PostSpecific = ({ route }) => {
  return <>
    <SafeAreaView style={{
      backgroundColor: 'white',
      height: '100%',
    }}>
      <Header />
      <WebView
        originWhitelist={['*']}
        source={{ uri: GET_POST_URL + route.params.pid }}
        style={{ flex: 1 }}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

    </SafeAreaView>
  </>
}


export default PostSpecific