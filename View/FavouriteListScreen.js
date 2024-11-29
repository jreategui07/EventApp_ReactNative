import React, { useCallback, useState, useLayoutEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import EventViewModel from '../ViewModel/EventViewModel';

const FavouriteListScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true);
    const data = await EventViewModel.fetchFavorites();
    setFavorites(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const handleRemoveAll = async () => {
    Alert.alert(
      'Remove All Favorites',
      'Are you sure you want to remove all favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove All',
          style: 'destructive',
          onPress: async () => {
            await EventViewModel.removeAllFavorites();
            fetchFavorites(); // Updating favorite list
          },
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        favorites.length > 0 ? (
          <TouchableOpacity onPress={handleRemoveAll} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Remove All</Text>
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, favorites]);

  const navigateToEventDetailsScreen = (event) => {
    navigation.navigate('EventDetails', {
      eventId: event.id,
      eventName: event.name,
    });
  };

  const renderItem = ({ item }) => {
    const eventImage = item.images?.[0]?.url || null; // Getting the first image from the event to display

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigateToEventDetailsScreen(item)}
      >
        {
          eventImage && (
            <Image
              source={{ uri: eventImage }}
              style={styles.itemImage}
              resizeMode="cover"
            />
          )
        }
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDate}>{item.dates?.start?.localDate}</Text>
          <Text style={styles.itemVenue}>{item._embedded?.venues[0]?.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No events found in favorites.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c4e80',
  },
  itemDate: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  itemVenue: {
    fontSize: 16,
    color: '#16a34a',
    marginTop: 5,
  },
  headerButton: {
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fde2e2',
    borderColor: '#ef4444',
    borderWidth: 1,
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#b91c1c',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default FavouriteListScreen;
