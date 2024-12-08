import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import VideoCard from "./VideoCard";
import { videos } from "../data/mockData";

export default function OtherVideos({
  currentVideoId,
  onVideoSelect,
  inVideoPlayer,
}) {
  // Filter out the currently playing video
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
          <VideoCard
            key={video.id}
            video={video}
            onVideoSelect={onVideoSelect}
            inVideoPlayer={inVideoPlayer}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
});
