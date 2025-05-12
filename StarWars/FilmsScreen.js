import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, ScrollView, TextInput, Button,
  StyleSheet, Animated, Image
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import deathstar from './assets/DeathStar.jpg';

const FilmsScreen = () => {
  const [films, setFilms] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const titleAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    fetch("https://www.swapi.tech/api/films")
      .then((res) => res.json())
      .then((data) => setFilms(data.result || data.results || []))
      .catch((err) => console.error(err));

    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    return () => unsubscribe();
  }, []);

  const handleSwipe = (url) => navigation.navigate("FilmDetails", { url });

  const filteredFilms = films.filter(f =>
    (f.properties?.title || f.title || '').toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>No internet connection.</Text>
        </View>
      )}
      <Image source={deathstar} style={styles.image} />
      <Animated.Text style={[styles.title, {
        opacity: titleAnim,
        transform: [
          { translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }
        ],
      }]}>
        Star Wars Films
      </Animated.Text>

      <TextInput
        style={styles.input}
        placeholder="Search films..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <ScrollView>
        {filteredFilms.map((item, index) => {
          const title = item.properties?.title || item.title || 'Untitled';
          return (
            <Swipeable
              key={index}
              renderRightActions={() => (
                <Button title="Details" onPress={() => handleSwipe(item.url)} />
              )}
            >
              <Text style={styles.item}>{title}</Text>
            </Swipeable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FilmsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 40, paddingHorizontal: 20 },
  image: {
    width: 120, height: 120, resizeMode: 'contain',
    alignSelf: 'center', marginBottom: 10,
  },
  offlineBanner: {
    backgroundColor: '#fcc', padding: 10, marginBottom: 10, alignItems: 'center',
  },
  offlineText: { color: 'red', fontWeight: 'bold' },
  title: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center',
  },
  input: {
    borderColor: '#ccc', borderWidth: 1, marginBottom: 10,
    paddingHorizontal: 8, paddingVertical: 5, borderRadius: 5,
  },
  item: {
    fontSize: 18, paddingVertical: 10,
    borderBottomColor: '#ccc', borderBottomWidth: 1,
  },
});
