import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import EventViewModel from '../ViewModel/EventViewModel';

const EventDetailsScreen = ({ route }) => {
  const { eventId } = route.params;
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const details = await EventViewModel.fetchEventDetails(eventId);
      setEventDetails(details);

      const favorites = await EventViewModel.fetchFavorites();
      setIsFavorite(favorites.some((fav) => fav.id === eventId)); // Checking if the event id is in the favorite list
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await EventViewModel.removeFromFavorites(eventId);
      } else {
        await EventViewModel.addToFavorites(eventDetails);
      }

      const updatedFavorites = await EventViewModel.fetchFavorites();
      setIsFavorite(updatedFavorites.some((fav) => fav.id === eventId));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!eventDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading event details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{eventDetails.name}</Text>
      <Text style={styles.subtitle}>{eventDetails.dates?.start?.localDate}</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>Venue:</Text> {eventDetails._embedded?.venues[0]?.name}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>City:</Text> {eventDetails._embedded?.venues[0]?.city?.name}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>State:</Text> {eventDetails._embedded?.venues[0]?.state?.name}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailBold}>Country:</Text> {eventDetails._embedded?.venues[0]?.country?.name}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isFavorite ? styles.removeButton : styles.addButton,
          ]}
          onPress={toggleFavorite}
        >
          <Text style={styles.buttonText}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detail: {
    fontSize: 16,
    color: '#495057',
    marginVertical: 5,
  },
  detailBold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#22c55e',
  },
  removeButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default EventDetailsScreen;
