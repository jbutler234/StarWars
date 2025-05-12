import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const PlanetDetailsScreen = ({ route }) => {
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
      <Text style={styles.item}>Climate: {details.climate}</Text>
      <Text style={styles.item}>Terrain: {details.terrain}</Text>
      <Text style={styles.item}>Population: {details.population}</Text>
      <Text style={styles.item}>Diameter: {details.diameter}</Text>
      <Text style={styles.item}>Gravity: {details.gravity}</Text>
    </ScrollView>
  );
};

export default PlanetDetailsScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { fontSize: 16, marginBottom: 10 },
});
