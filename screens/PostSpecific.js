import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, Image, StyleSheet, Text, View, AppRegistry, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview'
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import RenderHTML, { HTMLContentModel, HTMLElementModel, defaultHTMLElementModels } from 'react-native-render-html';
import { SvgXml } from 'react-native-svg';
const PostSpecific = ({ route }) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    fetch('https://hebbarskitchen.com/wp-json/wp/v2/posts/' + route.params.pid)
      .then(response => response.json())
      .then(data => { setHtml(data.content.rendered); })
      .catch(error => console.error(error));

  }, []);


  const { width } = useWindowDimensions();
  const renderers = {
    iframe: IframeRenderer
  };

  const customHTMLElementModels = {
    iframe: iframeModel,
    svg: svgElementModel
  };
  const svgElementModel = {
    tagName: 'svg',
    match: (element) => element.tagName === 'svg',
    isVoid: false,
    contentModel: 'block',
    render({ element, children }) {
      const svgXml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
      ${children.join('')}`;
      return <TBlock>{<SvgXml xml={svgXml} />}</TBlock>;
    },
  };
  return <ScrollView overScrollMode='never'>
    <SafeAreaView style={styles.container}>
      <HTML source={{ html: html }} renderers={renderers} WebView={WebView} customHTMLElementModels={customHTMLElementModels} defaultWebViewProps={
        {
        }
      }
        renderersProps={{
          iframe: {
            scalesPageToFit: true,
            webViewProps: {
              /* Any prop you want to pass to iframe WebViews */
            }
          }
        }} contentWidth={width - 30} ignoredDomTags={['input', 'svg', 'label', 'button']} />
    </SafeAreaView>
  </ScrollView>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
});

export default PostSpecific