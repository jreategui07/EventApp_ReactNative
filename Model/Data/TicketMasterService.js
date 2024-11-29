import axios from 'axios';
import { ticketMasterConfig } from '../../Config/TicketMasterConfig'

const TicketMasterService = {
  getEventList: async (start = 0, limit = 50) => {
    try {
      const response = await axios.get(`${ticketMasterConfig.BASE_URL}/discovery/v2/events.json`, {
        params: {
          apikey: ticketMasterConfig.API_KEY,
          size: limit,
          page: start,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching event list:', error);
      throw new Error('Unable to fetch event list');
    }
  },

  getEventDetails: async (id) => {
    try {
      const response = await axios.get(`${ticketMasterConfig.BASE_URL}/discovery/v2/events/${id}.json`, {
        params: {
          apikey: ticketMasterConfig.API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for event ID ${id}:`, error);
      throw new Error('Unable to fetch event details');
    }
  },
};

export default TicketMasterService;
