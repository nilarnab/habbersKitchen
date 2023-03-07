/*
ADDED THRESHOLD FOR VIEWABLE ITEM

after adding visibility thrashold, app crashing started

*/


import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, FlatList } from 'react-native';

import ReelCard from './ReelCard';
const ScreenHeight = Dimensions.get('window').height;


// trending page stride
import { TRENDING_STRIDE } from '../env';

function Reels({
  navigation,
  loading,
  videos,
  fetch,
  page,
  query,
  backgroundColor = 'white',
  headerTitle,
  headerIconName,
  headerIconColor,
  headerIconSize,
  headerIcon,
  headerComponent,
  onHeaderIconPress,
  optionsComponent,
  pauseOnOptionsShow,
  onSharePress,
  onCommentPress,
  onLikePress,
  onDislikePress,
  onFinishPlaying,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  timeElapsedColor,
  totalTimeColor,
}) {
  const FlatlistRef = useRef(null);
  const [ViewableItem, SetViewableItem] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(-1)
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });
  const applyProps = {
    backgroundColor: backgroundColor,
    headerTitle: headerTitle,
    headerIconName: headerIconName,
    headerIconColor: headerIconColor,
    headerIconSize: headerIconSize,
    headerIcon: headerIcon,
    headerComponent: headerComponent,
    onHeaderIconPress: onHeaderIconPress,
    optionsComponent: optionsComponent,
    pauseOnOptionsShow: pauseOnOptionsShow,
    onSharePress: onSharePress,
    onCommentPress: onCommentPress,
    onLikePress: onLikePress,
    onDislikePress: onDislikePress,
    onFinishPlaying: onFinishPlaying,
    minimumTrackTintColor: minimumTrackTintColor,
    maximumTrackTintColor: maximumTrackTintColor,
    thumbTintColor: thumbTintColor,
    timeElapsedColor: timeElapsedColor,
    totalTimeColor: totalTimeColor,
  };
  // const viewabilityConfigCallbackPairs = useRef([
  //   { onViewChange },
  // ]);
  const Loader = () => {
    if (loading) { }
  }

  // Viewable configuration
  const onViewRef = useRef(viewableItems => {
    // console.log("viewable items", viewableItems);
    // if (viewableItems?.viewableItems?.length > 0)
    //   SetViewableItem(viewableItems.viewableItems[0].key || 0);

    // console.log('Viewable item', ViewableItem)
  });

  // const onViewChange = ({
  //   viewableItems,
  // }) => {
  //   console.log(viewa)
  // };

  // console.log("data-here", videos)

  const onScrollEvent = (event) => {
    var scrollVal = event.nativeEvent.contentOffset.y
    var scrollDir = null
    if (Math.abs(scrollOffset - scrollVal) > TRENDING_STRIDE * 0.9) {

      if (scrollVal > scrollOffset) {
        scrollDir = 'DOWN'
        // SetViewableItem(ViewableItem + 1)
      }
      else {
        scrollDir = 'UP'
        // SetViewableItem(Math.max(0, ViewableItem - 1))
      }

      SetViewableItem(Math.round(scrollVal / TRENDING_STRIDE))

      setScrollOffset(scrollVal)
    }
    // console.log('snap scroll', scrollOffset)

  }


  return (
    <>

      <View>
        <FlatList
          nestedScrollEnabled
          ref={FlatlistRef}
          data={videos}
          // key={Rand}
          keyExtractor={item => item.title.toString()}
          onEndReached={() => { console.log('end reached'); fetch(page + 1, query) }}
          renderItem={({ item, index }) => (
            <ReelCard
              {...item}
              index={index}
              ViewableItem={ViewableItem}
              navigation={navigation}
              onFinishPlaying={index => {
                if (index !== videos.length - 1) {
                  // @ts-ignore: Object is possibly 'null'.
                  FlatlistRef.current.scrollToIndex({
                    index: index + 1,
                  });
                }
              }}
              {...applyProps}
            />
          )}
          getItemLayout={(_data, index) => ({
            length: ScreenHeight,
            offset: ScreenHeight * index,
            index,
          })}
          snapToInterval={TRENDING_STRIDE}
          pagingEnabled
          onViewableItemsChanged={onViewRef.current}
          // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          decelerationRate={0.9}
          // viewabilityConfig={viewConfigRef.current}
          contentContainerStyle={{ paddingBottom: TRENDING_STRIDE - 100 }}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 60
          }}
          onMomentumScrollEnd={onScrollEvent}
        />

      </View>
    </>
  );
}

export default Reels;
