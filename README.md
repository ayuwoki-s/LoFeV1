# LoFe-V.0.001
* Para reconstruir, una vez descargado usen npm install en su consola, dentro de la carpeta del proyecto
* Para usar con devapp usar comando << ionic cordova prepare android >>

# Listo

* funcionalidad de la aplicacion.
* Conexion a BD.
* Registro de Nuevos usuarios.
* Login (sin tokens).
* La ubicacion con maps con busqueda y geolocalizacion.
  *  despues del npm install agregar la siguiente linea desde el cli
  1. npm install ngx-google-places-autocomplete
  2. [Paquete usado](https://www.npmjs.com/package/ngx-google-places-autocomplete)
 * La foto del evento no la va a tomar directamente sino que abrira su galeria y seleccionara la foto
  * La funcion de la camara ya no genera error :D
  * La camara no sirve con ionic serve ni con devapp, la probe con un emulador, paquetes y plugins usados:
  1. ionic cordova plugin add cordova-plugin-camera
  2. npm install @ionic-native/camera
  3. ionic cordova plugin add cordova-plugin-ionic-webview
  4. npm install @ionic-native/ionic-webview

# Para revisar

* Insertar imagenes del lado del servidor.
* Trabajar en funciones de agregado de publicaciones propias.
* Hacer pruebas a la BD con la interfaz en el lado del servidor.

* Ya estoy checando como contruir el apk, (yo asi hago las mias > https://www.nigmacode.com/ionic/Exportar-y-firmar-APK-en-Ionic ..... y asi las firmo http://jonsegador.com/2014/11/firmar-aplicacion-android-sin-utilizar-eclipse-android-studio/)
