import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const StarshipDetailsScreen = ({ route }) => {
  const { url } = route.params;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setDetails(data.result.properties))
      .catch(err => console.error(err));
  }, [url]);

  if (!details) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{details.name}</Text>
      <Text style={styles.item}>Model: {details.model}</Text>
      <Text style={styles.item}>Manufacturer: {details.manufacturer}</Text>
      <Text style={styles.item}>Cost: {details.cost_in_credits} credits</Text>
      <Text style={styles.item}>Length: {details.length}</Text>
      <Text style={styles.item}>Crew: {details.crew}</Text>
      <Text style={styles.item}>Passengers: {details.passengers}</Text>
      <Text style={styles.item}>Class: {details.starship_class}</Text>
    </ScrollView>
  );
};

export default StarshipDetailsScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { fontSize: 16, marginBottom: 10 },
});
