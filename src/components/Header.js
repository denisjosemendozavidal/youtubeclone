import { StyleSheet, Text, View } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Entypo name="youtube" size={32} color="red" />
        <Text style={styles.logoText}>Kids</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent",
    color: "white",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingTop: 25,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
