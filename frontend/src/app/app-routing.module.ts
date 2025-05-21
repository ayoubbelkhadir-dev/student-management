import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ImportStudentComponent } from './import-student/import-student.component';
import { ImportPaymentComponent } from './import-payment/import-payment.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { StudentComponent } from './student/student.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGurad } from './guards/authorization.guard';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { PaymentEditComponent } from './payment-edit/payment-edit.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { AddProfilComponent } from './add-profil/add-profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { AddRoleComponent } from './add-role/add-role.component';

const routes: Routes = [
  {path : "", component: LoginComponent},
  {path : "login", component: LoginComponent},
  {path : "admin", component: AdminTemplateComponent, 
    canActivate : [AuthGuard],
    children:[
    {path : "profile", component: ProfileComponent,canActivate : [AuthorizationGurad],data:{roles:['ADMIN']}},
    {path : "addprofile", component: AddProfilComponent,canActivate : [AuthorizationGurad],data:{roles:['ADMIN']}},
    {path : "editprofile/:id", component: EditProfilComponent,canActivate : [AuthorizationGurad],data:{roles:['ADMIN']}},
    {path : "managerole", component: AddRoleComponent,canActivate : [AuthorizationGurad],data:{roles:['ADMIN']}},
    {path : "importStudent", component:ImportStudentComponent ,canActivate : [AuthorizationGurad],data:{roles:['ADMIN']}},
    {path : "importPayment", component: ImportPaymentComponent,canActivate : [AuthorizationGurad],data:{roles:['ADMIN']}},
    {path : "editStudent/:code", component: EditStudentComponent,canActivate : [AuthorizationGurad],data:{roles:['ADMIN']}},
    {path : "editePayment/:id", component:PaymentEditComponent,canActivate:[AuthorizationGurad],data:{roles:['ADMIN']}},
    {path : "viewPayment/:id", component:ViewPaymentComponent,canActivate:[AuthorizationGurad],data:{roles:['ADMIN']}},
    {path : "dashbord", component: DashbordComponent},
    {path : "student", component: StudentComponent},
    {path : "payment", component: PaymentComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
