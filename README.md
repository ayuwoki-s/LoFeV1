#Para lo del semaforo
*Empese a implementar un metodo para los cuestionarios, la ponderación es la sig:
*El cuestionario consta de 21 preguntas, proporcionando un rango de puntuación entre 0 y 63. Los puntos de corte sugeridos para interpretar el resultado obtenido son los siguientes:

**00–21 - Ansiedad muy baja
22–35 - Ansiedad moderada
más de 36 - Ansiedad severa
Cada ítem se puntúa de 0 a 3, correspondiendo la puntuación 0 a "en absoluto", 1 a "levemente, no me molesta mucho", 2 a "moderadamente, fue muy desagradable pero podía soportarlo" y la puntuación 3 a "severamente, casi no podía soportarlo"

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
