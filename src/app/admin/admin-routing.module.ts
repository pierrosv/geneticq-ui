import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionPoolsComponent} from "./question-pools/question-pools.component";
import {QuestionnaireTemplatesComponent} from "./questionnaire-templates/questionnaire-templates.component";
import {QuestionnaireTemplateEditorComponent} from "./questionnaire-template-editor/questionnaire-template-editor.component";
import {QuestionPoolEditorComponent} from "./question-pool-editor/question-pool-editor.component";
import {AdminListComponent} from "./admin-list/admin-list.component";
import {RegisterAdminComponent} from "./register-admin/register-admin.component";
import {DoctorListComponent} from "./doctor-list/doctor-list.component";
import {RegisterDoctorComponent} from "./register-doctor/register-doctor.component";

const routes: Routes = [
  {
    path: 'question-pools',
    component: QuestionPoolsComponent
  },
  {
    path: 'question-pool-editor/:id',
    component: QuestionPoolEditorComponent
  },
  {
    path: 'questionnaire-templates',
    component: QuestionnaireTemplatesComponent
  },
  {
    path: 'questionnaire-template-editor/:id',
    component: QuestionnaireTemplateEditorComponent
  },
  {
    path: 'admin-list',
    component: AdminListComponent
  },
  {
    path: 'register-admin',
    component: RegisterAdminComponent
  },
  {
    path: 'doctor-list',
    component: DoctorListComponent
  },
  {
    path: 'register-doctor',
    component: RegisterDoctorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
