import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// importamos htppClient para hacer peticiones
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// maps
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
// camara
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    GooglePlaceModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, // importado para peticiones 
    PipesModule,  // importado
    FormsModule,
    ReactiveFormsModule, // importar Forms y ReactiveFormsModule para usar validacion reactiva
    HttpModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    WebView,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
