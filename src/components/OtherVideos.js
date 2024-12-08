import { StyleSheet, View, Text } from "react-native";

export default function OtherVideos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Up next</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%", // Takes full height of its parent container
    backgroundColor: "#000",
    padding: 16,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
