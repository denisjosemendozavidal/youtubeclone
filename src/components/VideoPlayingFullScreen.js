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
  // State management for video playback
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  // Handle video press to toggle controls
  const handleVideoPress = () => {
    onVideoPress();
  };

  // Handle YouTube video state changes
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setIsPlaying(false);
    }
  }, []);

  // Format time display (e.g., converts 63 seconds to "1:03")
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Toggle video play/pause state
  const togglePlayPause = async () => {
    setIsPlaying(!isPlaying);
  };

  // Get screen dimensions for video sizing
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  const renderVideoPlayer = () => {
    if (video.platform === "youtube") {
      return (
        <YoutubePlayer
          height={SCREEN_WIDTH}
          width={SCREEN_HEIGHT}
          play={isPlaying}
          videoId={video.videoId}
          onChangeState={onStateChange}
          webViewProps={{
            renderToHardwareTextureAndroid: true,
          }}
        />
      );
    } else {
      return (
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: video.videoUrl }}
          useNativeControls={false}
          resizeMode="contain"
          isLooping={false}
          shouldPlay={isPlaying}
          onPlaybackStatusUpdate={(status) => {
            setCurrentTime(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
          }}
        />
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleVideoPress}
      activeOpacity={1}
    >
      {/* Base Video Layer - Always visible */}
      <View style={styles.videoContainer}>{renderVideoPlayer()}</View>

      {/* Controls Overlay Layer - Shown/hidden based on state */}

      {showControls && (
        <View style={styles.controlsOverlay}>
          {/* Top bar with back button, title, and actions */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onBackPress}>
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{video.title}</Text>
              <Text style={styles.channelName}>Matu Aprendiendo a Hablar</Text>
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

          {/* Center play/pause button */}
          <TouchableOpacity
            style={styles.centerButton}
            onPress={togglePlayPause}
          >
            <MaterialIcons
              name={isPlaying ? "pause" : "play-arrow"}
              size={50}
              color="white"
            />
          </TouchableOpacity>

          {/* Bottom progress bar and time display */}
          <View style={styles.bottomBar}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  { width: `${(currentTime / duration) * 100}%` },
                ]}
              />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    position: "relative",
  },
  videoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  controlsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "space-between",
    zIndex: 1,
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
  centerButton: {
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  bottomBar: {
    padding: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 8,
  },
  progress: {
    height: "100%",
    backgroundColor: "red",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: "white",
    fontSize: 14,
  },
});
