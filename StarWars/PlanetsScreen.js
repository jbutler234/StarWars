import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlanetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Planets Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F0FF",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});