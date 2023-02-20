import React, { useRef, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';

import ReelCard from './ReelCard';
const ScreenHeight = Dimensions.get('window').height;

function Reels({
  videos,
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
  const [ViewableItem, SetViewableItem] = useState('');
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

  // Viewable configuration
  const onViewRef = useRef(viewableItems => {
    // console.log("lol", viewableItems);
    if (viewableItems?.viewableItems?.length > 0)
      SetViewableItem(viewableItems.viewableItems[0].key || 0);
  });
  // console.log("data-here", videos)
  return (
    <FlatList
      ref={FlatlistRef}
      data={videos}
      keyExtractor={item => item.title.toString()}
      onEndReached={() => { console.log('end reached') }}
      renderItem={({ item, index }) => (
        <ReelCard
          {...item}
          index={index}
          ViewableItem={ViewableItem}
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
      snapToInterval={(ScreenHeight - 70) * 0.8}
      pagingEnabled
      decelerationRate={0.9}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />
  );
}

export default Reels;
