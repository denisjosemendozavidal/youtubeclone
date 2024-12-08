import { StyleSheet, View, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import VideoPlayingFullScreen from "../components/VideoPlayingFullScreen";
import OtherVideos from "../components/OtherVideos";

export default function VideoPlayer({ route, navigation }) {
  const { video: initialVideo } = route.params;
  const [video, setVideo] = useState(initialVideo);
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
            video={video}
            showControls={showControls}
            isFullscreen={isFullscreen}
            onVideoPress={handleVideoPress}
            onBackPress={handleBackPress}
          />
        </View>
        {showControls && (
          <View style={styles.otherVideosSection}>
            <OtherVideos currentVideoId={video.id} />
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
