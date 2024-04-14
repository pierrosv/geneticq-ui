import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

import { StatComponent } from './stat/stat.component';
import { TransactionComponent } from './transaction/transaction.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [StatComponent, TransactionComponent, QuestionComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [StatComponent, TransactionComponent]
})
export class WidgetModule { }
