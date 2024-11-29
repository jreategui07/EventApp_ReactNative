import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../Config/FirebaseConfig';

const FirebaseDatabase = {
  addToFavorites: async (event) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      const userFavoritesRef = collection(db, `favorites/${user.uid}/events`);
      const eventRef = doc(userFavoritesRef, event.id);

      await setDoc(eventRef, event);
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  removeFromFavorites: async (eventId) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      const eventRef = doc(db, `favorites/${user.uid}/events`, eventId);
      await deleteDoc(eventRef);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  },

  getFavorites: async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      const userFavoritesRef = collection(db, `favorites/${user.uid}/events`);
      const querySnapshot = await getDocs(userFavoritesRef);
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },

  removeAllFavorites: async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      const userFavoritesRef = collection(db, `favorites/${user.uid}/events`);
      const querySnapshot = await getDocs(userFavoritesRef);
      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error removing all favorites:', error);
      throw error;
    }
  },
};

export default FirebaseDatabase;
