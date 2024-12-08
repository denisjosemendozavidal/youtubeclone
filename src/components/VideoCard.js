import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function VideoCard({ video, onVideoSelect, inVideoPlayer }) {
  const navigation = useNavigation();

  const getThumbnailUrl = () => {
    if (video.platform === "youtube") {
      return `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
    }
    return video.thumbnail;
  };

  const handlePress = () => {
    // If we're in the video player, use the onVideoSelect handler
    if (inVideoPlayer && onVideoSelect) {
      onVideoSelect(video);
    } else {
      // Otherwise, use the original navigation behavior
      setTimeout(() => {
        navigation.navigate("VideoPlayer", { video });
      }, 50);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        // Adjust styling if we're in the video player
        inVideoPlayer && styles.inPlayerCard,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: getThumbnailUrl(),
          }}
          onError={() =>
            console.warn(`Failed to load thumbnail for video ${video.id}`)
          }
        />

        <View style={styles.playIconContainer}>
          <MaterialIcons name="play-circle-outline" size={48} color="white" />
        </View>
        <View style={styles.duration}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
        {!inVideoPlayer && ( // Only show menu icon when not in video player
          <TouchableOpacity
            style={styles.menuIconContainer}
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            <MaterialIcons name="more-vert" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={[styles.title, inVideoPlayer && styles.inPlayerTitle]}
        numberOfLines={2}
      >
        {video.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  thumbnailContainer: {
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  duration: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 4,
    borderRadius: 4,
  },
  durationText: {
    color: "white",
    fontSize: 12,
  },
  menuIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  title: {
    color: "white",
    fontSize: 14,
    padding: 12,
  },
  playIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -24 }, // Half the icon size
      { translateY: -24 },
    ],
    opacity: 0.8,
  },
  menuIconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
  },
  inPlayerCard: {
    margin: 4, // Smaller margins for the horizontal list
    width: 200, // Fixed width for horizontal scrolling
  },
  inPlayerTitle: {
    fontSize: 12, // Slightly smaller text for in-player view
    padding: 8,
  },
});
