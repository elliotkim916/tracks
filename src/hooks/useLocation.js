import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        // watchPositionAsync sets up a listener & will gives us a back a value called subscriber, and on that value is a function called remove
        // remove is what will stop tracking the users location
        subscriber = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000, // update once every second
          distanceInterval: 10 // update once every 10 meters
        }, 
        callback
        );
      } catch(e) {
        setError(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        // to stop the previous time we were watching the users location change
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [error];
};