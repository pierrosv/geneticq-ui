import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';
import { User } from 'src/app/store/Authentication/auth.models';
import {BehaviorSubject, from, map, Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ApplicationUser, GenomedicaLoginInformation} from "../models/application-user";


@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  userData: any;
  isLoggedIn = false;
  role: string;
  public currentUser: Observable<ApplicationUser>;
  private tokenKey = 'vouli-token';
  // private profileKey = 'user-profile';
  private currentUserSubject: BehaviorSubject<ApplicationUser>;
  loggedInKey = 'vouli-logged-in-info';
  userProfileKey = 'vouli-user-profile';

  private loginInformationSubject: BehaviorSubject<GenomedicaLoginInformation>;
  public loginInformation: Observable<GenomedicaLoginInformation>;

  public currentUserProfileSubject: BehaviorSubject<ApplicationUser>;
  public currentProfile: Observable<ApplicationUser>;

  constructor(private readonly http: HttpClient,
              private router: Router) {
    this.loginInformationSubject = new BehaviorSubject<GenomedicaLoginInformation>(JSON.parse(localStorage.getItem(this.loggedInKey)));
    this.currentUserProfileSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem(this.userProfileKey)));
    this.loginInformation = this.loginInformationSubject.asObservable();
    this.currentProfile = this.currentUserProfileSubject.asObservable();
  }

  public get getLoginInformation(): GenomedicaLoginInformation {
    return this.loginInformationSubject.value;
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject.value;
  }

  public get getCurrentUserProfile(): ApplicationUser {
    return this.currentUserProfileSubject.value;
  }

  signinUser(email: string, password: string) {
    let url = `${environment.apiUrl}/${environment.identityUrl}/login`;
    return this.http.post<GenomedicaLoginInformation>(url, {email, password})
      .pipe(map(logInfo => {
        console.log(logInfo);
        this.loginInformationSubject.next(logInfo);
        this.currentUserProfileSubject.next(logInfo.userInfo);
        this.setLoginInfo(logInfo);
        this.setUserInfo(logInfo.userInfo);
        localStorage.setItem(this.tokenKey, logInfo.authResult.token);
        this.isLoggedIn = true;
        return logInfo;
      })).pipe( catchError(this.handleLoginError));
  }

  private handleLoginError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  setLoginInfo(value) {
    localStorage.setItem(this.loggedInKey, JSON.stringify(value));
  }

  setUserInfo(value) {
    localStorage.setItem(this.userProfileKey, JSON.stringify(value));
  }

  logout() {
    localStorage.removeItem(this.loggedInKey);
    localStorage.removeItem(this.userProfileKey);
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn = false;
    this.router.navigate(['auth/login']);
  }

  getLocalStorageUser() {
    this.userData = JSON.parse(localStorage.getItem(this.userProfileKey));
    if (this.userData) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  setLocalUserProfile(value) {
    localStorage.setItem(this.userProfileKey, JSON.stringify(value));
  }

  isAuthenticated() {
    this.getLocalStorageUser();
    return this.isLoggedIn;
  }

  confirmEmail(email: string, token: string):Observable<boolean> {
    const fullUrl = `${environment.apiUrl}/${environment.identityUrl}/confirm-email`;
    return this.http.post<boolean>(fullUrl, {email, token});
  }

}

