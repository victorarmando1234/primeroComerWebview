import { useCallback, useEffect, useState } from 'react';
import { requestLocation } from './phone';

export function useLocationPermission() {
  const [hasPermission, setHasPermitions] = useState();
  const requestLocationPermission = useCallback(async () => {
    try {
      console.log("llego1");
      const granted = await requestLocation();
      console.log("granted2", granted);
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
