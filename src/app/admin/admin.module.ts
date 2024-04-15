import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { QuestionPoolsComponent } from './question-pools/question-pools.component';
import { QuestionnaireTemplatesComponent } from './questionnaire-templates/questionnaire-templates.component';
import { QuestionnaireTemplateEditorComponent } from './questionnaire-template-editor/questionnaire-template-editor.component';
import { QuestionPoolEditorComponent } from './question-pool-editor/question-pool-editor.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {UIModule} from "../shared/ui/ui.module";
import {UiSwitchModule} from "ngx-ui-switch";
import { QuestionDetailComponent } from './question-pool-editor/question-detail/question-detail.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import { SubQuestionDetailComponent } from './question-pool-editor/sub-question-detail/sub-question-detail.component';
import { QuestionOptionDetailComponent } from './question-pool-editor/question-option-detail/question-option-detail.component';
import { QuestionAddComponent } from './questionnaire-template-editor/question-add/question-add.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';


@NgModule({
  declarations: [
    QuestionPoolsComponent,
    QuestionnaireTemplatesComponent,
    QuestionnaireTemplateEditorComponent,
    QuestionPoolEditorComponent,
    QuestionDetailComponent,
    SubQuestionDetailComponent,
    QuestionOptionDetailComponent,
    QuestionAddComponent,
    AdminListComponent,
    DoctorListComponent,
    RegisterDoctorComponent,
    RegisterAdminComponent,
    AdminProfileComponent,
    DoctorProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    TranslateModule,
    UIModule,
    UiSwitchModule,
    AccordionModule
  ]
})
export class AdminModule { }
