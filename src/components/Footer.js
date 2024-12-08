import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";

export default function Footer() {
  // Get the navigation object to use for screen transitions
  const navigation = useNavigation();

  // Function to handle the home navigation
  const handleHomePress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  return (
    <View style={styles.footer}>
      <View style={styles.iconContainer}>
        <Feather name="home" size={24} color="white" />
        <Text style={styles.iconText}>Home</Text>
      </View>

      <View style={styles.iconContainer}>
        <Feather name="search" size={24} color="white" />
        <Text style={styles.iconText}>Search</Text>
      </View>

      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="star-outline" size={24} color="white" />
        <Text style={styles.iconText}>Your stuff</Text>
      </View>

      <View style={styles.iconContainer}>
        <Feather name="user" size={24} color="white" />
        <Text style={styles.iconText}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
});
