import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { Video } from "expo-av";

export default function VideoPlayingFullScreen({
  video,
  showControls,
  onVideoPress,
  onBackPress,
  isFullscreen,
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const handleVideoPress = () => {
    onVideoPress();
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setIsPlaying(false);
    }
  }, []);

  // Get screen dimensions
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  // Calculate video dimensions for landscape mode
  const videoHeight = SCREEN_HEIGHT;
  const videoWidth = (videoHeight * 16) / 9; // Maintain 16:9 aspect ratio

  const renderVideoPlayer = () => {
    if (video.platform === "youtube") {
      return (
        <View style={styles.youtubeContainer}>
          <YoutubePlayer
            height={videoHeight}
            width={videoWidth}
            play={isPlaying}
            videoId={video.videoId}
            onChangeState={onStateChange}
            webViewProps={{
              renderToHardwareTextureAndroid: true,
            }}
          />
        </View>
      );
    } else {
      return (
        <Video
          ref={videoRef}
          style={[
            styles.video,
            isFullscreen ? styles.fullscreenVideo : styles.controlsVideo,
          ]}
          source={{ uri: video.videoUrl }}
          useNativeControls={true}
          resizeMode="contain"
          isLooping={false}
          shouldPlay={isPlaying}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.videoWrapper}
        onPress={handleVideoPress}
        activeOpacity={1}
      >
        {renderVideoPlayer()}
      </TouchableOpacity>

      {showControls && (
        <View style={styles.controlsOverlay}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onBackPress}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{video.title}</Text>
              <Text style={styles.channelName}>
                {video.channelName || "Channel Name"}
              </Text>
            </View>
            <View style={styles.topBarRight}>
              <MaterialIcons
                name="cast"
                size={24}
                color="white"
                style={styles.icon}
              />
              <MaterialIcons name="more-vert" size={24} color="white" />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoWrapper: {
    flex: 1,
  },
  youtubeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  fullscreenVideo: {
    aspectRatio: 16 / 9,
  },
  controlsVideo: {
    aspectRatio: 16 / 9,
  },
  controlsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  channelName: {
    color: "#CCC",
    fontSize: 14,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
});
