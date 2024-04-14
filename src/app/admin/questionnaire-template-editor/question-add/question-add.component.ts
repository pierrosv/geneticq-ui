import {Component, Input} from '@angular/core';
import {QuestionnaireQuestionModel} from "../../../core/models/questionnaire-template";
import {QuestionAnswerOptionModel, QuestionForListModel, QuestionModel} from "../../../core/models/question";

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent {
  @Input() question: QuestionnaireQuestionModel;
  @Input() questions: QuestionForListModel[];
}
