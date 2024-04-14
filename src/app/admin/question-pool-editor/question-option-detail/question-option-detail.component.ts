import {Component, Input} from '@angular/core';
import {QuestionAnswerOptionModel} from "../../../core/models/question";

@Component({
  selector: 'app-question-option-detail',
  templateUrl: './question-option-detail.component.html',
  styleUrls: ['./question-option-detail.component.css']
})
export class QuestionOptionDetailComponent {
  @Input() answerOption: QuestionAnswerOptionModel;

}
