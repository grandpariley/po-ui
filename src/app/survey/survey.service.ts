import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LongSurveySubmission, RiskSurveySubmission, ShortSurveySubmission, SurveyState, SurveySubmission } from './model/model';
import { Observable, of } from 'rxjs';
import { Portfolio } from '../portfolio/model/portfolio.model';

const URI = './api/v1/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  state: SurveySubmission = {
    risk: null,
    short: null,
    long: null,
  };

  constructor(private http: HttpClient) { }

  completeSurvey(): SurveyState {
    return 'SUBMIT';
  }

  consentToSurvey(): SurveyState {
    return 'RISK';
  }

  completeRiskSurvey(riskSurveySubmission: RiskSurveySubmission): SurveyState {
    this.state.risk = riskSurveySubmission;
    return 'SHORT';
  }

  completeShortSurvey(shortSurveySubmission: ShortSurveySubmission): SurveyState {
    this.state.short = shortSurveySubmission;
    switch (shortSurveySubmission.q1) {
      case 'A':
        return 'LONG';
      case 'B':
        return 'INFO';
      case 'C':
        return 'COMPLETE';
    }
    return null;
  }

  completeLongSurvey(longSurveySubmission: LongSurveySubmission): SurveyState {
    this.state.long = longSurveySubmission;
    return 'COMPLETE';
  }

  complete(): Observable<string> {
    return of('69d1a5a0-870c-4026-bf9c-f85a83f04be8');
    // return this.http.post(URI, this.state, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
  }
}

