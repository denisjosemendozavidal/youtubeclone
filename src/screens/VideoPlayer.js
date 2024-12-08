import { StyleSheet, View, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoPlayingFullScreen from "../components/VideoPlayingFullScreen";
import OtherVideos from "../components/OtherVideos";

export default function VideoPlayer({ route, navigation }) {
  // Initialize with the video passed through navigation
  const { video: initialVideo } = route.params;
  const [currentVideo, setCurrentVideo] = useState(initialVideo);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  const handleVideoPress = () => {
    setShowControls(!showControls);
    setIsFullscreen(!isFullscreen);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // New function to handle video selection
  const handleVideoSelect = (newVideo) => {
    setCurrentVideo(newVideo); // Update the current video
    setShowControls(false); // Hide the controls
    setIsFullscreen(true); // Return to fullscreen mode
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.videoSection,
            showControls ? styles.videoWithControls : styles.videoFullscreen,
          ]}
        >
          <VideoPlayingFullScreen
            video={currentVideo}
            showControls={showControls}
            isFullscreen={isFullscreen}
            onVideoPress={handleVideoPress}
            onBackPress={handleBackPress}
          />
        </View>
        {showControls && (
          <View style={styles.otherVideosSection}>
            <OtherVideos
              currentVideoId={currentVideo.id}
              onVideoSelect={handleVideoSelect}
              inVideoPlayer={true} // New prop to modify VideoCard behavior
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  videoSection: {
    width: "100%",
  },
  videoFullscreen: {
    height: "100%",
  },
  videoWithControls: {
    height: "80%",
  },
  otherVideosSection: {
    height: "20%",
    backgroundColor: "#000",
  },
});
