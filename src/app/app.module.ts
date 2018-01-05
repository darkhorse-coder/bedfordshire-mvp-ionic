import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { ServicesProvider } from '../providers/services/services';
import { CarDetailPage } from '../pages/car-detail/car-detail';
import { CartPage } from '../pages/cart/cart';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { SuccessfulPage } from '../pages/successful/successful';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CartPage,
    AuthenticationPage,
    CarDetailPage,
    SuccessfulPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CartPage,
    AuthenticationPage,
    CarDetailPage,
    SuccessfulPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
  ]
})
export class AppModule {}
