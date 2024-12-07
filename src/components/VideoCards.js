import { StyleSheet, Text, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function VideoCard() {
  return (
    <View style={styles.card}>
      <View style={styles.thumbnailContainer}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: "https://example.com/thumbnail.jpg", // Replace with actual thumbnail URL
          }}
        />
        <View style={styles.duration}>
          <Text style={styles.durationText}>21:25</Text>
        </View>
        <MaterialIcons
          name="more-vert"
          size={24}
          color="white"
          style={styles.menuIcon}
        />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        Baby Alive en Español ⭐ ¡La Muñecas STAR BESTIES Salva La
      </Text>
    </View>
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
});
