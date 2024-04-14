import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionPoolsComponent} from "./question-pools/question-pools.component";
import {QuestionnaireTemplatesComponent} from "./questionnaire-templates/questionnaire-templates.component";
import {QuestionnaireTemplateEditorComponent} from "./questionnaire-template-editor/questionnaire-template-editor.component";
import {QuestionPoolEditorComponent} from "./question-pool-editor/question-pool-editor.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
