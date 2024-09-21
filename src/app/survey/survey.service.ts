import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LongSurveySubmission, RiskSurveySubmission, ShortSurveySubmission, SurveyState, SurveySubmission } from './model/model';
import { map, Observable } from 'rxjs';

const URI = 'http://localhost:81/api/v1/portfolio'

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
    return this.http.post<any>(URI, this.state, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .pipe(map(response => response['portfolio_id']));
  }
}

