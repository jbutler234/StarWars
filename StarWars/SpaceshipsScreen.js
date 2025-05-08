import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SpaceshipsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Spaceships Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5E6FF",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});