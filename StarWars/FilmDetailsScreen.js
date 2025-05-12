import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const FilmDetailsScreen = ({ route }) => {
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
      <Text style={styles.title}>{details.title}</Text>
      <Text style={styles.item}>Director: {details.director}</Text>
      <Text style={styles.item}>Producer: {details.producer}</Text>
      <Text style={styles.item}>Release Date: {details.release_date}</Text>
      <Text style={styles.item}>Opening Crawl:</Text>
      <Text style={styles.opening}>{details.opening_crawl}</Text>
    </ScrollView>
  );
};

export default FilmDetailsScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { fontSize: 16, marginBottom: 10 },
  opening: { fontSize: 14, fontStyle: 'italic', marginTop: 5 },
});
