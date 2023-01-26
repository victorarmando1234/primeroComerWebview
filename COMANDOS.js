//para compilar debug 
/*
 npx react-native start
 npx react-native run-android

 



*/


//para realizar apk

/*  





en raiz

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res


en de .. android

./gradlew assembleDebug

apk en 

project/android/app/build/outputs/apk/debug/app-debug.apk







al cambiar el nombre se bede de cambiar el id en el documento app.js linea 97
seturl(res1.data.url + {id});
ejemp:
seturl(res1.data.url + "37");

*/


//Para cambiar nombre
/*

 react-native-rename "SushibyJhonysFood"

 react-native-rename "SushibyJhonysFood" -b es.minuevo.paquete

 verificar en
  ..\android\app\src\main\res\values\strings.xml

*/

//para limpiar cache
/*
  correr 2 veces en cd android

  ./gradlew clean


*/

//cambiar imagen 

/*
    entra:
    http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(255%2C%20255%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher

    sube y crea la imagen 

    cambia el contenido del zip aqui:
    ..\android\app\src\main\res

    ojo carpeta por carpeta no todas a la vez

*/
