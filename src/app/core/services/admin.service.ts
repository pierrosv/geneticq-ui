import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {QuestionPoolForListModel, QuestionPoolModel} from "../models/question-pool";
import {QuestionnaireTemplateForListModel, QuestionnaireTemplateModel} from "../models/questionnaire-template";
import {QuestionForListModel} from "../models/question";
import {AdminModel, DoctorModel} from "../models/application-user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllQuestionPools(): Observable<QuestionPoolForListModel[]> {
    return this.http.get<QuestionPoolForListModel[]>(`${environment.apiUrl}/${environment.questionPoolUrl}`);
  }

  getQuestionPoolById(id: number): Observable<QuestionPoolModel> {
    return this.http.get<QuestionPoolModel>(`${environment.apiUrl}/${environment.questionPoolUrl}/${id}`);
  }

  deleteQuestionPoolById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.questionPoolUrl}/${id}`);
  }

  saveQuestionPool(category: QuestionPoolModel):Observable<QuestionPoolModel> {
    const fullUrl = `${environment.apiUrl}/${environment.questionPoolUrl}/`;
    if (category.id <= 0) {
      return this.http.post<QuestionPoolModel>(fullUrl, category);
    }
    return this.http.put<QuestionPoolModel>(fullUrl, category);
  }

  getAllQuestionnaireTemplates(): Observable<QuestionnaireTemplateForListModel[]> {
    return this.http.get<QuestionnaireTemplateForListModel[]>(`${environment.apiUrl}/${environment.questionnaireTemplateUrl}`);
  }

  getQuestionnaireTemplateById(id: number): Observable<QuestionnaireTemplateModel> {
    return this.http.get<QuestionnaireTemplateModel>(`${environment.apiUrl}/${environment.questionnaireTemplateUrl}/${id}`);
  }

  deleteQuestionnaireTemplateById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.questionnaireTemplateUrl}/${id}`);
  }

  saveQuestionnaireTemplate(category: QuestionnaireTemplateModel):Observable<QuestionnaireTemplateModel> {
    const fullUrl = `${environment.apiUrl}/${environment.questionnaireTemplateUrl}/`;
    if (category.id <= 0) {
      return this.http.post<QuestionnaireTemplateModel>(fullUrl, category);
    }
    return this.http.put<QuestionnaireTemplateModel>(fullUrl, category);
  }

  getAllQuestions(): Observable<QuestionForListModel[]> {
    return this.http.get<QuestionForListModel[]>(`${environment.apiUrl}/${environment.questionPoolUrl}/get-all-questions`);
  }

  getAllAdmins(): Observable<AdminModel[]> {
    return this.http.get<AdminModel[]>(`${environment.apiUrl}/${environment.adminUrl}/get-all-admins`);
  }

  getAllDoctors(): Observable<DoctorModel[]> {
    return this.http.get<DoctorModel[]>(`${environment.apiUrl}/${environment.adminUrl}/get-all-doctors`);
  }
}
