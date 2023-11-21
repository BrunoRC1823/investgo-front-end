import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEsPE from '@angular/common/locales/es-PE';
import { LOCALE_ID, NgModule } from '@angular/core';

import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { PrimeNgModule } from './prime-ng/prime-ng.module';

registerLocaleData(localeEsPE);
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    PrimeNgModule,
  ],
  providers: [
    MessageService,
    authInterceptorProviders,
    {
      provide: LOCALE_ID,
      useValue: 'es-PE',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
