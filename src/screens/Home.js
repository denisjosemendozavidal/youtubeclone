import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoCard from "../components/VideoCard";
import { videos } from "../data/mockData"; // Import our mock data

export default function HomeScreen() {
  // Function to render each video item
  const renderVideo = ({ item }) => <VideoCard video={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        style={styles.content}
        // These props improve performance
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        // Add some spacing between items
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0744",
  },
  content: {
    flex: 1,
    marginBottom: 60, // Space for footer
  },
});

/*
Code for youtubeAPI call if I ever want to go that route 
import { SafeAreaView, FlatList } from 'react-native';
import { useYouTube } from '../hooks/useYouTube';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage';

export default function HomeScreen() {
  const { videos, loading, error, refreshVideos } = useYouTube();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refreshVideos} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={item => item.id}
        style={styles.content}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
      <Footer />
    </SafeAreaView>
  );
}
*/
