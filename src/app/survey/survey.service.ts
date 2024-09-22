import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LongSurveySubmission, RiskSurveySubmission, ShortSurveySubmission, SurveyState, SurveySubmission } from './model/model';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

const URI = `${environment.SERVICE_URI}/survey`

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
    }
    return 'COMPLETE';
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

