import { useCallback, useEffect, useState } from 'react';
import { requestLocation } from './phone';

export function useLocationPermission() {
  const [hasPermission, setHasPermitions] = useState();
  const requestLocationPermission = useCallback(async () => {
    try {
      const granted = await requestLocation();
      setHasPermitions(granted);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return hasPermission;
}

export default useLocationPermission;
