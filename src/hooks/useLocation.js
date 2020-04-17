import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
  const [error, setError] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      // watchPositionAsync will gives us a back a value called subscriber, and on that value is a function called remove
      // remove is what will stop tracking the users location
      const sub = await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000, // update once every second
        distanceInterval: 10 // update once every 10 meters
      }, 
      callback
      );
      setSubscriber(sub);
    } catch(e) {
      setError(e);
    }
  };

  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
  }, [shouldTrack]);

  return [error];
};