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


@NgModule({
  declarations: [
    QuestionPoolsComponent,
    QuestionnaireTemplatesComponent,
    QuestionnaireTemplateEditorComponent,
    QuestionPoolEditorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    TranslateModule,
    UIModule,
    UiSwitchModule
  ]
})
export class AdminModule { }
