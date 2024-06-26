import {StaticDataModel} from "./static-data";

export class QuestionnaireListModel {
  id: number;
  fromTemplateId: number;
  name: string;
  description: string;
}

export class QuestionnaireModel {
  id: number;
  name: string;
  fromTemplateId: number;
  description: string;
  byDoctorId: number;
  lockTemplate: boolean;
  questions: DoctorQuestionModel[];
}

export class DoctorQuestionModel {
  id: number;
  title: string;
  description: string;
  answerType: number;
  appearanceOrder: number;
  answerOptions: DoctorQuestionAnswerOptionModel[];
  subQuestions: DoctorSubQuestionModel[];
}

export class DoctorSubQuestionModel {
  id: number;
  title: string;
  description: string;
  onQuestionId: number;
  appearanceOrder: number;
}

export class DoctorQuestionAnswerOptionModel {
  id: number;
  title: string;
  appearanceOrder: number;
}

export class DoctorQuestionForListModel {
  id: number;
  title: string;
}

export class QuestionnaireExecutionListModel {
  id: number;
  forQuestionnaireId: number;
  forPatientId: number;
  executionDate: Date;
  forPatientName: string;
  forQuestionnaireName: string;
}

export class ExecuteQuestionnaireModel {
  forQuestionnaireId: number;
  forPatientId: number;
  byDoctorId: number;
}

export class QuestionnaireExecutionModel {
  id: number;
  byDoctorId: number;
  forQuestionnaireId: number;
  forPatientId: number;
  executionDate: Date;
  forPatientName: string;
  forQuestionnaireName: string;
  notes: string;
  answers: PatientQuestionAnswerModel[];
  subAnswers: PatientSubQuestionAnswerModel[];
}

export class PatientQuestionAnswerModel {
  id: number;
  answerType: number;
  appearanceOrder: number;
  forExecutionId: number;
  forQuestionId: number;
  optionResultId: number;
  questionTitle: string;
  booleanResult: boolean;
  numericResult: number;
  options: StaticDataModel[];
}

export class PatientSubQuestionAnswerModel {
  id: number;
  answerType: number;
  appearanceOrder: number;
  forExecutionId: number;
  forQuestionId: number;
  optionResultId: number;
  questionTitle: string;
  booleanResult: boolean;
  numericResult: number;
  options: StaticDataModel[];
}
