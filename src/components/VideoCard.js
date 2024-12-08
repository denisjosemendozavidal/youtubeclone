import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function VideoCard({ video }) {
  const navigation = useNavigation();

  // Function to get the correct thumbnail URL based on video platform
  const getThumbnailUrl = () => {
    if (video.platform === "youtube") {
      return `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
    }
    // For other platforms, use the provided thumbnail URL
    return video.thumbnail;
  };

  const handlePress = () => {
    // Add a small delay to give visual feedback of the press
    setTimeout(() => {
      navigation.navigate("VideoPlayer", { video });
    }, 50);
  };

  return (
    <TouchableOpacity
      style={styles.card}
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
        <TouchableOpacity
          style={styles.menuIconContainer}
          onPress={(e) => {
            e.stopPropagation();
            // Here you could add a menu with options like:
            // - Add to playlist
            // - Share
            // - Report
            // For now, we'll just prevent the card press
          }}
        >
          <MaterialIcons name="more-vert" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title} numberOfLines={2}>
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
});
