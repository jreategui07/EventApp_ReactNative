import TicketMasterService from '../Model/Data/TicketMasterService';
import FirebaseDatabase from '../Model/Data/FirebaseDatabase';

const EventViewModel = {
  fetchEventList: async (start = 0, limit = 50) => {
    try {
      const eventList = await TicketMasterService.getEventList(start, limit);
      console.log('Fetched Event List:', eventList);
      return eventList;
    } catch (error) {
      console.error('Error fetching event list:', error);
      throw error;
    }
  },

  fetchEventDetails: async (id) => {
    try {
      const eventDetails = await TicketMasterService.getEventDetails(id);
      console.log('Fetched Event Details:', eventDetails);
      return eventDetails;
    } catch (error) {
      console.error(`Error fetching event details for ID ${id}:`, error);
      throw error;
    }
  },

  addToFavorites: async (event) => {
    try {
      const result = await FirebaseDatabase.addToFavorites(event);
      console.log('Event added to favorites:', event);
      return result;
    } catch (error) {
      console.error('Error adding event to favorites:', error);
      throw error;
    }
  },

  removeFromFavorites: async (eventId) => {
    try {
      await FirebaseDatabase.removeFromFavorites(eventId);
      console.log('Event removed from favorites:', eventId);
    } catch (error) {
      console.error('Error removing event from favorites:', error);
      throw error;
    }
  },

  fetchFavorites: async () => {
    try {
      const favorites = await FirebaseDatabase.getFavorites();
      console.log('Fetched Favorites:', favorites);
      return favorites;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },

  removeAllFavorites: async () => {
    try {
      await FirebaseDatabase.removeAllFavorites();
      console.log('All favorites removed successfully');
    } catch (error) {
      console.error('Error removing all favorites:', error);
      throw error;
    }
  },
};

export default EventViewModel;
