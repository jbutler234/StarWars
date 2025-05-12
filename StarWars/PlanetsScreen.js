import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, Modal, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const PlanetsScreen = () => {
  const [planets, setPlanets] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [swipeModalVisible, setSwipeModalVisible] = useState(false);
  const [swipedItemName, setSwipedItemName] = useState('');

  const titleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then((res) => res.json())
      .then((data) => setPlanets(data.results))
      .catch((err) => console.error(err));

    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = () => setSearchModalVisible(true);
  const handleSwipe = (name) => {
    setSwipedItemName(name);
    setSwipeModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, {
        opacity: titleAnim,
        transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }],
      }]}>
        Star Wars Planets
      </Animated.Text>

      <TextInput
        style={styles.input}
        placeholder="Search for something..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />

      <ScrollView>
        {planets.map((item) => (
          <Swipeable
            key={item.uid}
            renderRightActions={() => (
              <Button title="View" onPress={() => handleSwipe(item.name)} />
            )}
          >
            <Text style={styles.item}>{item.name}</Text>
          </Swipeable>
        ))}
      </ScrollView>

      <Modal visible={searchModalVisible} transparent animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You searched for: {searchText}</Text>
          <Button title="Close" onPress={() => setSearchModalVisible(false)} />
        </View>
      </Modal>

      <Modal visible={swipeModalVisible} transparent animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You swiped: {swipedItemName}</Text>
          <Button title="Close" onPress={() => setSwipeModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default PlanetsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  item: { fontSize: 18, paddingVertical: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 },
  modalView: {
    marginTop: 250,
    margin: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: { fontSize: 18, marginBottom: 10 },
});