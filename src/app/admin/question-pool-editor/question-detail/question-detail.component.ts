import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {QuestionAnswerOptionModel, QuestionModel, SubQuestionModel} from "../../../core/models/question";
import {StaticDataModel} from "../../../core/models/static-data";

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnChanges {
  @Input() question: QuestionModel;
  @Input() questionAnswerTypes: StaticDataModel[];
  displayOptions: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.displayOptions = this.question.answerType == 30;
  }

  onChangeSelection(selected) {
    this.question.answerType = parseInt(selected);
    this.displayOptions = this.question.answerType == 30;
  }

  createQuestionAnswer() {
    let newAnswer = new QuestionAnswerOptionModel();
    let appOrder = 0;
    if (this.question.answerOptions.length > 0) {
      for (let num of this.question.answerOptions) {
        if (num.appearanceOrder > appOrder) {
          appOrder = num.appearanceOrder; // Update the maxNumber if current number is greater
        }
      }
    }

    newAnswer.appearanceOrder = appOrder + 1;
    this.question.answerOptions.push(newAnswer);
  }

  deleteAnswer($index) {
    console.log($index);
    if ($index > -1) {
      this.question.answerOptions.splice($index, 1);
    }
  }

  createSubQuestion() {
    let newSubQuestion = new SubQuestionModel();
    let appOrder = 0;
    if (this.question.subQuestions.length > 0) {
      for (let num of this.question.subQuestions) {
        if (num.appearanceOrder > appOrder) {
          appOrder = num.appearanceOrder; // Update the maxNumber if current number is greater
        }
      }
    }

    newSubQuestion.appearanceOrder = appOrder + 1;
    this.question.subQuestions.push(newSubQuestion);
  }

  deleteSubQuestion($index) {
    console.log($index);
    if ($index > -1) {
      this.question.subQuestions.splice($index, 1);
    }
  }
}
