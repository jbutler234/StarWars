import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Modal,
  StyleSheet,
} from 'react-native';

const PlanetsScreen = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then(response => response.json())
      .then(data => {
        setPlanets(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching planets:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Star Wars Planets</Text>

      <TextInput
        style={styles.input}
        placeholder="Search term..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <Button title="Search" onPress={handleSearch} />

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={planets}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.name}</Text>
          )}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>You searched for: {searchText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlanetsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  item: {
    fontSize: 18,
    paddingVertical: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    margin: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});