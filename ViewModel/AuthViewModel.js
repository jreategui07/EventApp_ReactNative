import { useState } from 'react';
import FirebaseAuthService from '../Model/Data/FirebaseAuthService';

const useAuthViewModel = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const user = await FirebaseAuthService.signIn(email, password);
      setCurrentUser(user);
      console.log('User signed in successfully:', user);
      return user;
    } catch (err) {
      setError(err.message);
      console.error('Error signing in:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };  

  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const user = await FirebaseAuthService.signUp(email, password);
      setCurrentUser(user);
      console.log('User signed up successfully:', user);
      return user;
    } catch (err) {
      setError(err.message);
      console.error('Error signing up:', err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await FirebaseAuthService.signOut();
      setCurrentUser(null);
      console.log('User signed out successfully');
    } catch (err) {
      setError(err.message);
      console.error('Error signing out:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    currentUser,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
};

export default useAuthViewModel;
