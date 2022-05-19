import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { commonclass } from './common/common';
import { ApiServicesService } from './services/api-services.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth/auth.interceptor';
import { ErrorInterceptor } from '../interceptors/error/error.interceptor';
import { FeaturesModule } from './components/components.module';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { environment } from '../environments/environment';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'blue',
  bgsOpacity: 0.6,
  fgsColor: '#6dc7ff',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'wandering-cubes',
  blur: 6,
  logoUrl: environment.logo_url,
  logoSize: 80,
  gap: 14,
  pbColor: 'blue',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  hasProgressBar: true,
  pbThickness: 4,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FeaturesModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [
    commonclass,
    ApiServicesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
