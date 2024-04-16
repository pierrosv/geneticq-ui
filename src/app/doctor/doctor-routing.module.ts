import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientListComponent} from "./patients/patient-list/patient-list.component";
import {PatientEditorComponent} from "./patients/patient-editor/patient-editor.component";
import {DoctorQuestionnairesComponent} from "./doctor-questionnaires/doctor-questionnaires.component";
import {DoctorQuestionnaireEditorComponent} from "./doctor-questionnaire-editor/doctor-questionnaire-editor.component";
import {ExecuteQuestionnaireComponent} from "./execute-questionnaire/execute-questionnaire.component";
import {QuestionnaireResultsComponent} from "./questionnaire-results/questionnaire-results.component";
import {QuestionnaireExecutionComponent} from "./questionnaire-execution/questionnaire-execution.component";

const routes: Routes = [
  {
    path: 'patients',
    component: PatientListComponent
  },
  {
    path: 'patient-editor/:id',
    component: PatientEditorComponent
  },
  {
    path: 'questionnaires',
    component: DoctorQuestionnairesComponent
  },
  {
    path: 'questionnaire-editor/:id',
    component: DoctorQuestionnaireEditorComponent
  },
  {
    path: 'questionnaire-results',
    component: QuestionnaireResultsComponent
  },
  {
    path: 'questionnaire-result/:id',
    component: QuestionnaireExecutionComponent
  },
  {
    path: 'execute-questionnaire',
    component: ExecuteQuestionnaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
