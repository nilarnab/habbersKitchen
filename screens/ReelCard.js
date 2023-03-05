// packages Imports
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Text, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';

import Buttons from './Buttons';
import Header from './Header';
import helper from '../utils/helper';
// Screen Dimensions
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height - 50;

// import stride length
import { TRENDING_STRIDE } from '../env';

// is Focused 
import { useIsFocused } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';

function ReelCard({
  uri,
  _id,
  videoUrl,
  fetch,
  title,
  description1,
  description2,
  products,
  ViewableItem,
  liked = false,
  disliked = false,
  index,

  // Container Props
  backgroundColor = 'white',

  // Header Props
  headerTitle = 'Reels',
  headerIconName,
  headerIconColor,
  headerIconSize,
  headerIcon,
  headerComponent,
  onHeaderIconPress = () => { },

  // Options Props
  optionsComponent,
  pauseOnOptionsShow = true,
  onSharePress = () => { },
  onCommentPress = () => { },
  onLikePress = () => { },
  onDislikePress = () => { },

  // Player Props
  onFinishPlaying = () => { },

  // Slider Props
  minimumTrackTintColor = 'black',
  maximumTrackTintColor = 'grey',
  thumbTintColor = 'black',

  // Time Props
  timeElapsedColor = 'black',
  totalTimeColor = 'black',
}) {
  // ref for Video Player
  const VideoPlayer = useRef(null);
  // console.log('check--here',videoUrl)

  // States
  const [VideoDimensions, SetVideoDimensions] = useState({
    width: ScreenWidth,
    height: ScreenWidth,
  });
  const [Progress, SetProgress] = useState(0);
  const [Duration, SetDuration] = useState(0);
  const [Paused, SetPaused] = useState(false);
  const [ShowOptions, SetShowOptions] = useState(true);
  const [isMuted, setIsMuted] = useState(false)
  const [showMuted, setShowMuted] = useState(false)


  const isFocused = useIsFocused()

  // useEffect(() => {
  //   console.log('called show muted', showMuted)



  // }, [setShowMuted])

  const muteButtonHandler = () => {
    setShowMuted(true)
    setTimeout(function () {
      setShowMuted(false)
    }, 1000)
  }


  const MuteButtonImage = () => {
    if (!isMuted) {
      return <>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/null/high-volume--v1.png' }}
          style={{ width: 20, height: 20 }} />
      </>
    }
    else {
      return <>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/null/no-audio.png' }}
          style={{ width: 20, height: 20 }} />
      </>
    }
  }

  // mute button
  const MuteButton = () => {

    if (showMuted) {
      return <>
        <TouchableOpacity

          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            position: 'absolute',
            alignSelf: 'center',
            transform: [{ translateY: -40 }],
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            opacity: 0.8
          }}
        >
          <MuteButtonImage />

        </TouchableOpacity>
      </>
    }
    else {
      <></>
    }

  }

  /* Our changes */

  const FlatListHorizontalItem = ({ index, item }) => {
    const OpenSpecificView = () => {
      navigate("ProductSpecific", { item, navigation });
    };

    return (

      <TouchableOpacity onPress={OpenSpecificView}>
        <LinearGradient style={styles.horizontalItem} colors={['white', 'aliceblue']}>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{
              width: 90,
              marginLeft: 5,
            }}>
              <Image source={{ uri: item.image }} style={{ height: 80, width: 80, borderRadius: 20 }} />
            </View>

            <View style={{
              width: '50%',
              justifyContent: 'center',
            }}>

              <Text style={styles.titleStyle}>{item.name}</Text>
            </View>

          </View>

          <View>
            <Text style={{
              fontSize: 15,
              color: 'grey'
            }}>
              Now at only
            </Text>
            <Text style={{
              fontSize: 25,
              color: 'black'
            }}>{item.price} /-</Text>
          </View>

        </LinearGradient>
      </TouchableOpacity>
    )
  }
  // ---------------------



  // Play/Pause video according to viisibility
  useEffect(() => {
    if (ViewableItem === title) SetPaused(false);
    else SetPaused(true);
  }, [ViewableItem]);

  useEffect(() => {
    if (isFocused) {
      SetPaused(false)
    }
    else {
      SetPaused(true)
    }
  }, [isFocused])

  // Pause when use toggle options to True
  useEffect(() => {
    if (pauseOnOptionsShow) {
      if (ShowOptions) SetPaused(true);
      else SetPaused(false);
    }
  }, [ShowOptions, pauseOnOptionsShow]);

  // Callbhack for Seek Update
  const SeekUpdate = useCallback(
    async seekTime => {
      try {
        if (VideoPlayer.current)
          VideoPlayer.current.seek((seekTime * Duration) / 100 / 1000);
      } catch (error) { }
    },
    [Duration, ShowOptions],
  );

  // Callback for PlayBackStatusUpdate
  const PlayBackStatusUpdate = playbackStatus => {
    try {
      let currentTime = Math.round(playbackStatus.currentTime);
      let duration = Math.round(playbackStatus.seekableDuration);
      if (currentTime)
        if (duration) SetProgress((currentTime / duration) * 100);
    } catch (error) { }
  };

  // function for getting video dimensions on load complete
  const onLoadComplete = event => {
    const { naturalSize } = event;

    try {
      const naturalWidth = naturalSize.width;
      const naturalHeight = naturalSize.height;
      if (naturalWidth > naturalHeight) {
        SetVideoDimensions({
          width: ScreenWidth,
          height: ScreenWidth * (naturalHeight / naturalWidth),
        });
      } else {
        SetVideoDimensions({
          width: ScreenHeight * (naturalWidth / naturalHeight),
          height: ScreenHeight,
        });
      }
      SetDuration(event.duration * 1000);
    } catch (error) { }
  };

  // function for showing options
  const onMiddlePress = async () => {
    try {
      SetShowOptions(!ShowOptions);
    } catch (error) { }
  };

  // fuction to Go back 10 seconds
  const onFirstHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        let toSeek = Math.floor((Progress * Duration) / 100) / 1000;
        if (toSeek > 10) VideoPlayer.current.seek(toSeek - 10);
      }
    } catch (error) { }
  };

  // fuction to skip 10 seconds
  const onSecondHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        let toSeek = Math.floor((Progress * Duration) / 100) / 1000;
        VideoPlayer.current.seek(toSeek + 10);
      }
    } catch (error) { }
  };

  // Manage error here
  const videoError = error => { };

  // useMemo for Slider
  const GetSlider = useMemo(
    () => (
      <View style={styles.SliderContainer}>
        <Text style={[styles.TimeOne, { color: timeElapsedColor }]}>
          {helper.GetDurationFormat(Math.floor((Progress * Duration) / 100))}
        </Text>
        <Slider
          style={{ height: 40, width: '100%' }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={minimumTrackTintColor}
          maximumTrackTintColor={maximumTrackTintColor}
          thumbTintColor={thumbTintColor}
          value={Progress}
          onSlidingComplete={data => SeekUpdate(data)}
        />
        <Text style={[styles.TimeTwo, { color: totalTimeColor }]}>
          {helper.GetDurationFormat(Duration || 0)}
        </Text>
      </View>
    ),
    [
      Duration,
      Progress,
      ShowOptions,
      thumbTintColor,
      totalTimeColor,
      timeElapsedColor,
      minimumTrackTintColor,
      maximumTrackTintColor,
    ],
  );

  // useMemo for Slider
  const GetHeader = useMemo(
    () => (
      <View style={styles.HeaderContainer}>
        <Header
          onPress={onHeaderIconPress}
          text={headerTitle}
          customComponent={headerComponent}
          customIcon={headerIcon}
          color={headerIconColor}
          name={headerIconName}
          size={headerIconSize}
        />
      </View>
    ),
    [
      ShowOptions,
      headerComponent,
      headerIcon,
      headerIconColor,
      headerIconName,
      headerIconSize,
      headerTitle,
      onHeaderIconPress,
    ],
  );

  // useMemo for Options
  const GetButtons = useMemo(
    () => (
      <View style={styles.OptionsContainer}>
        {optionsComponent ? null : (
          <>
            <Buttons
              name={liked ? 'like1' : 'like2'}
              text="like"
              color={liked ? 'dodgerblue' : 'white'}
              onPress={() => onLikePress(_id)}
            />
            <Buttons
              name={disliked ? 'dislike1' : 'dislike2'}
              text="like"
              color={disliked ? 'dodgerblue' : 'white'}
              onPress={() => onDislikePress(_id)}
            />
            <Buttons
              name="message1"
              text="comment"
              onPress={() => onCommentPress(_id)}
            />
            <Buttons
              name="sharealt"
              text="share"
              onPress={() => onSharePress(_id)}
            />
          </>
        )}
      </View>
    ),
    [ShowOptions, optionsComponent, liked, disliked],
  );

  return (
    <>
      <Pressable
        style={[styles.container, { backgroundColor: backgroundColor }]}
        onPress={() => { }}>

        <View style={
          styles.textContainer}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold'
            }}>{title}</Text>

          <Text
            style={{
              fontSize: 15,
              color: 'black',
            }}>{description1}</Text>

          <Text
            style={{
              fontSize: 15,
              color: 'black',
            }}>{description2}</Text>
        </View>

        <TouchableOpacity
          onPress={() => { setIsMuted(!isMuted); muteButtonHandler() }}

        >

          <Video
            ref={VideoPlayer}
            source={{ uri: videoUrl }}
            style={VideoDimensions}
            resizeMode="contain"
            onError={videoError}
            controls={false}
            playInBackground={false}
            progressUpdateInterval={1000}
            paused={Paused}
            muted={isMuted}
            repeat={false}
            onLoad={onLoadComplete}
            onProgress={PlayBackStatusUpdate}
            onEnd={() => { onFinishPlaying(index) }}
          />

        </TouchableOpacity>

        <MuteButton />

        {ShowOptions ? (
          <>
            {GetSlider}
          </>
        ) : null}

        <View style={styles.horizontalListHolder}>
          <FlatList
            horizontal
            data={products}
            renderItem={FlatListHorizontalItem}
            keyExtractor={(item, index) => index.toString()}
            style={{
              height: 150,
              width: '100%',
              marginVertical: 5,
              marginLeft: 5,
            }}
          />
        </View>

      </Pressable>



    </>
  );
}

// Exports
export default ReelCard;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: TRENDING_STRIDE,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 50,
    // paddingTop: '20%'
  },
  SliderContainer: {
    width: ScreenWidth,
    height: 55,
    bottom: 0,
    zIndex: 100,
  },
  TimeOne: {
    color: 'grey',
    position: 'absolute',
    left: 15,
    fontSize: 13,
    bottom: 5,
  },
  TimeTwo: {
    color: 'grey',
    position: 'absolute',
    right: 15,
    fontSize: 13,
    bottom: 5,
  },
  OptionsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 70,
    zIndex: 100,
  },
  HeaderContainer: {
    position: 'absolute',
    width: ScreenWidth,
    top: 0,
    height: 50,
    zIndex: 100,
  },
  FirstHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },
  SecondHalf: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },

  textContainer: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  horizontalListHolder: {
    marginTop: 10,
  },
  horizontalItem: {
    height: 'auto',
    width: 200,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'lightgrey',
    // borderWidth: 0.5,
    marginLeft: 5,
    borderRadius: 20,
    overflow: 'hidden',
  }
});
