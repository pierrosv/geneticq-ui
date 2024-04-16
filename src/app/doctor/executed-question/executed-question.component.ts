import {Component, Input} from '@angular/core';
import {PatientQuestionAnswerModel} from "../../core/models/questionnaire";
import {StaticDataModel} from "../../core/models/static-data";

@Component({
  selector: 'app-executed-question',
  templateUrl: './executed-question.component.html',
  styleUrls: ['./executed-question.component.css']
})
export class ExecutedQuestionComponent {
  @Input() patientAnswer: PatientQuestionAnswerModel;
  @Input() questionAnswerTypes: StaticDataModel[];
  displayOptions: boolean = false;

}
