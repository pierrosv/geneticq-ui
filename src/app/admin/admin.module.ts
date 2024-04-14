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


@NgModule({
  declarations: [
    QuestionPoolsComponent,
    QuestionnaireTemplatesComponent,
    QuestionnaireTemplateEditorComponent,
    QuestionPoolEditorComponent,
    QuestionDetailComponent,
    SubQuestionDetailComponent,
    QuestionOptionDetailComponent,
    QuestionAddComponent
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
