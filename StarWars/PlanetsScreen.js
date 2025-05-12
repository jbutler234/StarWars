import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, Button } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const PlanetsScreen = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then(res => res.json())
      .then(data => setPlanets(data.results))
      .catch(err => console.error(err));
  }, []);

  const openModal = (name) => {
    setSelectedName(name);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Star Wars Planets</Text>
      <ScrollView>
        {planets.map((item) => (
          <Swipeable
            key={item.uid}
            renderRightActions={() => (
              <Button title="View" onPress={() => openModal(item.name)} />
            )}
          >
            <Text style={styles.item}>{item.name}</Text>
          </Swipeable>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You swiped: {selectedName}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default PlanetsScreen;

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