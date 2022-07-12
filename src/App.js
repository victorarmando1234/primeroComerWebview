import React, { Component, useRef, useEffect, useState } from "react";
import { BackHandler, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useLocationPermission } from './utils/useLocationPermission';
import axios from 'axios';
import PushNotification from "react-native-push-notification";


export default function App() {
  const WEBVIEW_REF = useRef();
  const [canGoBack, setcanGoBack] = useState(false);
  const [url, seturl] = useState("http://192.168.0.7:3000/");
  const [loanding, setloanding] = useState(false);
  useLocationPermission();


  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    }
  }, [canGoBack]);


  useEffect(() => {

    getUrl()
    return () => {

    }
  }, []);



  function updateGoogleToken(params) {

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: async function (tokenPushNotification) {
        //console.log("TOKEN:", tokenPushNotification.token);

        const res = await axios.put(
          'https://api.primerocomer.com.mx/v1/Auth/refressTokengoogleClient',
          {
            tokenPushNotification: tokenPushNotification.token,
            id: params.data.id
          },
        );
        if (res.status === 200) {
          console.log('google token actualizado');
          return;
        }
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    console.log(params.data.id);
  }

  async function getUrl() {
    setloanding(true)
    const res1 = await axios.get(
      'https://api.primerocomer.com.mx/v1/url/getUrlClient',
      {
      },
    );

    seturl(res1.data.url);
    console.log("ko", res1.data.url);
    setloanding(false)
  }








  const handleBackButton = (e) => {
    if (canGoBack) {
      WEBVIEW_REF.current.goBack();
      return true;
    }
    return;
  };

  const onNavigationStateChange = (navState) => {
    setcanGoBack(navState.canGoBack);
    console.log("navState.canGoBack", navState.canGoBack);
  };




  if (loanding) {
    return <Text>cargando</Text>;
  }
  return (
    <WebView
      source={{ uri: url }}
      cacheEnabled={false}
      ref={WEBVIEW_REF}
      onNavigationStateChange={onNavigationStateChange}
      geolocationEnabled={true}
      onMessage={e => {

        let res = JSON.parse(e.nativeEvent.data)
        if (res.type == 'USERDATA') {
          // setuserData(res.payload)
          updateGoogleToken(res.payload);
        }


      }}
    />
  );

}