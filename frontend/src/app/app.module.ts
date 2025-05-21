import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { ProfileComponent } from './profile/profile.component';
import { ImportPaymentComponent } from './import-payment/import-payment.component';
import { ImportStudentComponent } from './import-student/import-student.component';
import { StudentComponent } from './student/student.component';
import { PaymentComponent } from './payment/payment.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule,FormGroup } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGurad } from './guards/authorization.guard';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { EditStudentComponent } from './edit-student/edit-student.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { PaymentEditComponent } from './payment-edit/payment-edit.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddProfilComponent } from './add-profil/add-profil.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    ProfileComponent,
    ImportPaymentComponent,
    ImportStudentComponent,
    StudentComponent,
    PaymentComponent,
    DashbordComponent,
    LoginComponent,
    EditStudentComponent,
    DialogContentComponent,
    PaymentEditComponent,
    ViewPaymentComponent,
    AddProfilComponent,
    AddRoleComponent,
    EditProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    PdfViewerModule
    
  ],
  providers: [
    provideAnimationsAsync(),AuthGuard,AuthorizationGurad,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
