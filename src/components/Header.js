import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Header() {
  return (
    <View>
      <View>
        <Entypo name="youtube" size={20} color="red" /> <Text>Youtube</Text>
      </View>
      <View>
        <Text>Search Options</Text>
      </View>
    </View>
  );
}
