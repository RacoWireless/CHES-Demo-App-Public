import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from '../components/home/layouts/sidebar/sidebar.component';
import { HeaderComponent } from '../components/home/layouts/header/header.component';
import { DatacontainerComponent } from '../components/home/layouts/datacontainer/datacontainer.component';
import { ConfigurationComponent } from './home/configuration/configuration.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PatientInformationComponent } from './home/patient-information/patient-information.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { KeyManagementComponent } from './home/key-management/key-management.component';
import { TelemetryDataComponent } from './home/telemetry-data/telemetry-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { AwsManagedKeysComponent } from './home/key-management/aws-managed-keys/aws-managed-keys.component';
import { AwsCreateKeyComponent } from './home/key-management/aws-create-key/aws-create-key.component';
import { InputTextModule } from 'primeng/inputtext';
import { AddPatientFormComponent } from './home/patient-information/add-patient-form/add-patient-form.component';
import { EditPatientFormComponent } from './home/patient-information/edit-patient-form/edit-patient-form.component';
import { DeletePatientDialogComponent } from './home/patient-information/delete-patient-dialog/delete-patient-dialog.component';
import { GlobalListFilterComponent } from './home/patient-information/global-list-filter/global-list-filter.component';
import { FormatDatePipe } from '../common/pipes/format-date/format-date.pipe';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DownloadKeyComponent } from './home/key-management/aws-managed-keys/download-key/download-key.component';
import { SubscriptionFormComponent } from './home/configuration/subscription-form/subscription-form.component';
import { AssignEncryptionKeyComponent } from './home/configuration/assign-encryption-key/assign-encryption-key.component';
import { AssignedKeyModalComponent } from './home/key-management/aws-managed-keys/assigned-key-modal/assigned-key-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    DatacontainerComponent,
    ConfigurationComponent,
    PatientInformationComponent,
    KeyManagementComponent,
    TelemetryDataComponent,
    AwsManagedKeysComponent,
    AwsCreateKeyComponent,
    AddPatientFormComponent,
    EditPatientFormComponent,
    DeletePatientDialogComponent,
    GlobalListFilterComponent,
    FormatDatePipe,
    DownloadKeyComponent,
    SubscriptionFormComponent,
    AssignEncryptionKeyComponent,
    AssignedKeyModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
    RouterModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    TooltipModule
  ],
  exports: [FormatDatePipe],
})
export class FeaturesModule {}
