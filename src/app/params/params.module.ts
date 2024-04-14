import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParamsRoutingModule } from './params-routing.module';
import { QuestionPoolCategoriesComponent } from './question-pool-categories/question-pool-categories.component';
import { QuestionPoolCategoryEditorComponent } from './question-pool-category-editor/question-pool-category-editor.component';
import {UiSwitchModule} from "ngx-ui-switch";
import {UIModule} from "../shared/ui/ui.module";
import {ModalModule} from "ngx-bootstrap/modal";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    QuestionPoolCategoriesComponent,
    QuestionPoolCategoryEditorComponent
  ],
  imports: [
    CommonModule,
    ParamsRoutingModule,
    UiSwitchModule,
    UIModule,
    ModalModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class ParamsModule { }
