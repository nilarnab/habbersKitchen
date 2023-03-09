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
  const [scrollOffset, setScrollOffset] = useState(-1);
  const [isMuted, setIsMuted] = useState(true)
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


  const onScrollEvent = (event) => {
    var scrollVal = event.nativeEvent.contentOffset.y
    var total_posts = videos.length

    if (Math.abs(scrollOffset - scrollVal) > TRENDING_STRIDE * 0.9) {
      var post_index = Math.round(scrollVal / TRENDING_STRIDE)
      SetViewableItem(post_index)

      if (total_posts - post_index <= 2) {
        fetch(page + 1, query)
      }

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
          // onEndReached={() => { console.log('end reached'); fetch(page + 1, query) }}
          renderItem={({ item, index }) => (
            <ReelCard
              {...item}
              index={index}
              ViewableItem={ViewableItem}
              navigation={navigation}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
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
          // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          decelerationRate={0.9}
          // viewabilityConfig={viewConfigRef.current}
          contentContainerStyle={{ paddingBottom: TRENDING_STRIDE - 100 }}

          onMomentumScrollEnd={onScrollEvent}
        />

      </View>
    </>
  );
}

export default Reels;
