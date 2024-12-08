import React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import VideoCard from "./VideoCard";
import { videos } from "../data/mockData";

export default function OtherVideos({ currentVideoId }) {
  // Filter out the currently playing video from recommendations
  const recommendedVideos = videos.filter(
    (video) => video.id !== currentVideoId
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recommendedVideos.map((video) => (
          <View key={video.id} style={styles.cardWrapper}>
            <VideoCard video={video} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardWrapper: {
    width: width * 0.4, // Each card takes 40% of screen width
    marginRight: 8,
  },
});
