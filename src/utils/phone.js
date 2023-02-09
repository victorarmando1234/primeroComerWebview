import { Linking, PermissionsAndroid, Platform } from 'react-native';

// requests location permission and returns true or false
export async function requestLocation() {
  try {
    console.log("llego2");
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permitir Localizacion',
        message: '',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log("granted", granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export function openMaps(lat, lng) {
  const scheme = Platform.select({ ios: `maps:${lat},${lng}?q=`, android: `geo:${lat},${lng}?q=` });
  const latLng = `${lat},${lng}`;
  const label = 'Custom Label';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  Linking.openURL(url);
}
