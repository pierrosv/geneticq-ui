import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionPoolCategoriesComponent} from "./question-pool-categories/question-pool-categories.component";
import {QuestionPoolCategoryEditorComponent} from "./question-pool-category-editor/question-pool-category-editor.component";

const routes: Routes = [
  {
    path: 'question-pool-categories',
    component: QuestionPoolCategoriesComponent
  },
  {
    path: 'question-pool-category-editor/:id',
    component: QuestionPoolCategoryEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParamsRoutingModule { }
