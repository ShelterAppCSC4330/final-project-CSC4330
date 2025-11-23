import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useUsername(defaultName = 'Username') {
  const [username, setUsername] = useState(defaultName);

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const stored = await AsyncStorage.getItem("username");
        if (stored) {
          setUsername(stored);
        }
      } catch (err) {
        console.log("Failed to load username:", err);
      }
    };

    loadUsername();
  }, []);

  return { username, setUsername };
}
