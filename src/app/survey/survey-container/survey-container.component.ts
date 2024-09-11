import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LongSurveySubmission, RiskSurveySubmission, ShortSurveySubmission, SurveyState } from '../model/model';
import { SurveyService } from '../survey.service';
import { ConsentComponent } from '../consent/consent.component';
import { RiskSurveyComponent } from '../risk-survey/risk-survey.component';
import { ShortSurveyComponent } from '../short-survey/short-survey.component';
import { InfoComponent } from '../info/info.component';
import { LongSurveyComponent } from '../long-survey/long-survey.component';
import { CompleteComponent } from '../complete/complete.component';

@Component({
  standalone: true,
  selector: 'app-survey-container',
  imports: [ConsentComponent, RiskSurveyComponent, ShortSurveyComponent, InfoComponent, LongSurveyComponent, CompleteComponent],
  template: `
  <div class="grid grid-cols-8 px-6 py-4">
    <div class="col-span-1">
      <img width="100%" height="100%" src="/assets/uofrlogo.jpeg" alt="University of Regina Logo" />
    </div>
    <div class="col-span-7 flex items-center">
      <div>
        <h1 class="text-xl font-medium">Environmental, Social, and Governance Conscious Portfolio Survey</h1>
        <div class="text-xs text-gray-600 mb-4">
          <p>Please note that you can close your browser at any time to withdraw consent. No information will be collected until the final submission.</p>
          <p>Please note that by submitting the survey you will be providing implied consent. Please review the <a class="underline text-blue-600" href="/assets/ESG-Conscious-Portfolio-Survey-Consent-Form.pdf" target="_blank">consent form</a> prior to submission.</p>
        </div>
      </div>
    </div>
    <main class="grid grid-cols-1 col-span-8">
      <app-consent *ngIf="state.value === 'CONSENT'" (submit)="onConsentSubmit()"></app-consent>
      <app-risk-survey *ngIf="state.value === 'RISK'" (submit)="onRiskSurveySubmit($event)"></app-risk-survey>
      <app-short-survey *ngIf="state.value === 'SHORT'" (submit)="onShortSurveySubmit($event)" [disabledInputs]="[]"></app-short-survey>
      <app-info *ngIf="state.value === 'INFO'" (back)="onInfoBack($event)"></app-info>
      <app-long-survey *ngIf="state.value === 'LONG'" (submit)="onLongSurveySubmit($event)"></app-long-survey>
      <app-complete *ngIf="state.value === 'COMPLETE'" (submit)="onCompleteSubmit()"></app-complete>
    </main>
  </div>`,
})
export class SurveyContainerComponent implements OnInit {
  state: FormControl<SurveyState> = new FormControl<SurveyState>('CONSENT', Validators.required);

  constructor(private surveyService: SurveyService, private router: Router) { }

  ngOnInit(): void {
    this.state.valueChanges.subscribe(s => {
      if (s === 'SUBMIT') {
        this.surveyService.complete();
        this.router.navigate(['thanks']);
      }
    });
  }

  onInfoBack($event: ShortSurveySubmission) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.state.setValue(this.surveyService.completeShortSurvey($event));
  }

  onRiskSurveySubmit($event: RiskSurveySubmission): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.state.setValue(this.surveyService.completeRiskSurvey($event));
  }

  onShortSurveySubmit($event: ShortSurveySubmission): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.state.setValue(this.surveyService.completeShortSurvey($event));
  }

  onLongSurveySubmit($event: LongSurveySubmission): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.state.setValue(this.surveyService.completeLongSurvey($event));
  }

  onCompleteSubmit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.state.setValue(this.surveyService.completeSurvey());
  }

  onConsentSubmit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.state.setValue(this.surveyService.consentToSurvey());
  }

}
