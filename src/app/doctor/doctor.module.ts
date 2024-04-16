import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalModule} from "ngx-bootstrap/modal";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {UIModule} from "../shared/ui/ui.module";
import {UiSwitchModule} from "ngx-ui-switch";
import {AccordionModule} from "ngx-bootstrap/accordion";
import { DoctorRoutingModule } from './doctor-routing.module';
import {PatientListComponent} from "./patients/patient-list/patient-list.component";
import {PatientEditorComponent} from "./patients/patient-editor/patient-editor.component";
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorQuestionnairesComponent } from './doctor-questionnaires/doctor-questionnaires.component';
import { DoctorQuestionnaireEditorComponent } from './doctor-questionnaire-editor/doctor-questionnaire-editor.component';
import { DoctorQuestionEditorComponent } from './doctor-question-editor/doctor-question-editor.component';
import { ExecuteQuestionnaireComponent } from './execute-questionnaire/execute-questionnaire.component';
import { QuestionnaireResultsComponent } from './questionnaire-results/questionnaire-results.component';
import { QuestionnaireExecutionComponent } from './questionnaire-execution/questionnaire-execution.component';


@NgModule({
  declarations: [
    PatientListComponent,
    PatientEditorComponent,
    DoctorProfileComponent,
    DoctorQuestionnairesComponent,
    DoctorQuestionnaireEditorComponent,
    DoctorQuestionEditorComponent,
    ExecuteQuestionnaireComponent,
    QuestionnaireResultsComponent,
    QuestionnaireExecutionComponent],
  exports: [
    DoctorProfileComponent
  ],
  imports: [
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
    TranslateModule,
    UIModule,
    UiSwitchModule,
    AccordionModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
