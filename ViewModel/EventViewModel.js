import TicketMasterService from '../Model/Data/TicketMasterService';

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
};

export default EventViewModel;
