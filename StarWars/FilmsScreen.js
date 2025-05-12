import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const FilmsScreen = () => {
  const [films, setFilms] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [swipedTitle, setSwipedTitle] = useState('');

  useEffect(() => {
    fetch("https://www.swapi.tech/api/films")
      .then((res) => res.json())
      .then((data) => setFilms(data.result || data.results || []))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = () => {
    setSearchModalVisible(true);
  };

  const handleSwipe = (title) => {
    setSwipedTitle(title);
    setSwipeModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Star Wars Films</Text>

      <TextInput
        style={styles.input}
        placeholder="Search for something..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />

      <ScrollView>
        {films.map((item, index) => {
          const title = item.properties?.title || item.title;
          return (
            <Swipeable
              key={index.toString()}
              renderRightActions={() => (
                <Button title="View" onPress={() => handleSwipe(title)} />
              )}
            >
              <Text style={styles.item}>{title}</Text>
            </Swipeable>
          );
        })}
      </ScrollView>

      {/* Search Modal */}
      <Modal visible={searchModalVisible} transparent animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You searched for: {searchText}</Text>
          <Button title="Close" onPress={() => setSearchModalVisible(false)} />
        </View>
      </Modal>

      {/* Swipe Modal */}
      <Modal visible={swipeModalVisible} transparent animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You swiped: {swipedTitle}</Text>
          <Button title="Close" onPress={() => setSwipeModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default FilmsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
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
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  modalView: {
    marginTop: 250,
    margin: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});