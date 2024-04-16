import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PatientForListModel, PatientModel} from "../models/patient";
import {QuestionnaireListModel, QuestionnaireModel} from "../models/questionnaire";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getAllPatients(doctorId: number): Observable<PatientForListModel[]> {
    return this.http.get<PatientForListModel[]>(`${environment.apiUrl}/${environment.patientUrl}/get-doctor-patients/${doctorId}`);
  }

  getPatientById(id: number): Observable<PatientModel> {
    return this.http.get<PatientModel>(`${environment.apiUrl}/${environment.patientUrl}/${id}`);
  }

  deletePatientById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.patientUrl}/${id}`);
  }

  savePatient(category: PatientModel):Observable<PatientModel> {
    const fullUrl = `${environment.apiUrl}/${environment.patientUrl}/`;
    if (category.id <= 0) {
      return this.http.post<PatientModel>(fullUrl, category);
    }
    return this.http.put<PatientModel>(fullUrl, category);
  }

  getAllQuestionnaires(doctorId: number): Observable<QuestionnaireListModel[]> {
    return this.http.get<QuestionnaireListModel[]>(`${environment.apiUrl}/${environment.questionnaireUrl}/${doctorId}`);
  }

  getQuestionnaireById(doctorId: number, id: number): Observable<QuestionnaireModel> {
    return this.http.get<QuestionnaireModel>(`${environment.apiUrl}/${environment.questionnaireUrl}/${doctorId}/${id}`);
  }

  deleteQuestionnaireById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.questionnaireUrl}/${id}`);
  }

  saveQuestionnaire(category: QuestionnaireModel):Observable<QuestionnaireModel> {
    const fullUrl = `${environment.apiUrl}/${environment.questionnaireUrl}/`;
    if (category.id <= 0) {
      return this.http.post<QuestionnaireModel>(fullUrl, category);
    }
    return this.http.put<QuestionnaireModel>(fullUrl, category);
  }
}
