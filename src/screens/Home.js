import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoCard from "../components/VideoCards";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.content}>
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0744", // Dark blue background from image
  },
  content: {
    flex: 1,
    marginBottom: 60, // Space for footer
  },
});
