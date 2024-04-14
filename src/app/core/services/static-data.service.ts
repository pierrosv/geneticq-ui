import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {StaticDataModel} from "../models/static-data";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor(private http: HttpClient) { }

  //TODO: Use proper language
  getQuestionAnswerTypes(): Observable<StaticDataModel[]> {
    return this.http.get<StaticDataModel[]>(`${environment.apiUrl}/${environment.staticDataUrl}/get-question-answer-types/en`);
  }

  getGenders(): Observable<StaticDataModel[]> {
    return this.http.get<StaticDataModel[]>(`${environment.apiUrl}/${environment.staticDataUrl}/get-genders/en`);
  }
}
