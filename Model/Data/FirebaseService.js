import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';

const FirebaseService = {
  addToFavorites: async (event) => {
    try {
      const collectionRef = collection(db, 'favorites');
      const searchQuery = query(collectionRef, where('id', '==', event.id));
      const getFavoriteList = await getDocs(searchQuery);

      if (!getFavoriteList.empty) {
        console.log('Event already in favorites:', event);
        return false;
      }

      await addDoc(collectionRef, event);
      console.log('Event added to favorites:', event);
      return true;
    } catch (error) {
      console.error('Error adding event to favorites:', error);
      throw error;
    }
  },

  removeFromFavorites: async (eventId) => {
    try {
      const collectionRef = collection(db, 'favorites');
      const getFavoriteList = await getDocs(collectionRef);
      getFavoriteList.forEach(async (docSnapshot) => {
        if (docSnapshot.data().id === eventId) {
          await deleteDoc(doc(db, 'favorites', docSnapshot.id));
          console.log('Event removed from favorites:', eventId);
        }
      });
    } catch (error) {
      console.error('Error removing event from favorites:', error);
    }
  },

  getFavorites: async () => {
    try {
      const getFavoriteList = await getDocs(collection(db, 'favorites'));
      const favorites = getFavoriteList.docs.map((doc) => doc.data());
      return favorites;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },

  removeAllFavorites: async () => {
    try {
      const collectionRef = collection(db, 'favorites');
      const querySnapshot = await getDocs(collectionRef);

      const deletePromises = querySnapshot.docs.map((docSnapshot) =>
        deleteDoc(doc(db, 'favorites', docSnapshot.id))
      );

      await Promise.all(deletePromises);
      console.log('All favorites removed successfully');
    } catch (error) {
      console.error('Error removing all favorites:', error);
      throw error;
    }
  },
};

export default FirebaseService;
