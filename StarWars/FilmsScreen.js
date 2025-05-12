import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, Button } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const FilmsScreen = () => {
  const [films, setFilms] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/films")
      .then(res => res.json())
      .then(data => setFilms(data.result || data.results || []))
      .catch(err => console.error(err));
  }, []);

  const openModal = (title) => {
    setSelectedTitle(title);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Star Wars Films</Text>
      <ScrollView>
        {films.map((item, index) => {
          const title = item.properties?.title || item.title;
          return (
            <Swipeable
              key={index.toString()}
              renderRightActions={() => (
                <Button title="View" onPress={() => openModal(title)} />
              )}
            >
              <Text style={styles.item}>{title}</Text>
            </Swipeable>
          );
        })}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You swiped: {selectedTitle}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
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