import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/interceptors/auth.guard';
import { LoginComponent, HomeComponent } from './components';
import { ConfigurationComponent } from '../app/components/home/configuration/configuration.component';
import { PatientInformationComponent } from '../app/components/home/patient-information/patient-information.component';
import { KeyManagementComponent } from '../app/components/home/key-management/key-management.component';
import { TelemetryDataComponent } from '../app/components/home/telemetry-data/telemetry-data.component';
import { AwsCreateKeyComponent } from '../app/components/home/key-management/aws-create-key/aws-create-key.component';

const auth = true;
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'configuration',
        component: ConfigurationComponent,
      },
      {
        path: 'patient-information',
        component: PatientInformationComponent,
      },
      {
        path: 'telemetry-data',
        component: TelemetryDataComponent,
      },
      {
        path: 'key-management',
        component: KeyManagementComponent,
      },
      {
        path: 'aws-create-key',
        component: AwsCreateKeyComponent,
      },
      {
        path: '**',
        redirectTo: 'patient-information',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
