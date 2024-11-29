import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import EventViewModel from '../ViewModel/EventViewModel';

const HomeScreen = ({ navigation }) => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventList();
  }, []);

  const fetchEventList = async () => {
    try {
      setLoading(true);
      const events = await EventViewModel.fetchEventList(0, 50); // Fetching events from Ticketmaster API
      setEventList(events._embedded?.events || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const navigateToEventDetails = (event) => {
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
        onPress={() => navigateToEventDetails(item)}
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
          <Text style={styles.itemLocation}>{item._embedded?.venues[0]?.name}</Text>
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

  return (
    <View style={styles.container}>
      <FlatList
        data={eventList}
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
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c4e80',
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
  itemDate: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  itemLocation: {
    fontSize: 16,
    color: '#16a34a',
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;