import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LongSurveySubmission, RiskSurveySubmission, ShortSurveySubmission, SurveyState } from '../model/model';
import { SurveyService } from '../survey.service';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-survey-container',
  template: `
  <div class="grid grid-cols-8 px-6 py-4">
    <div class="col-span-1">
      <img width="100%" height="100%" src="uofrlogo.jpeg" alt="University of Regina Logo" (click)="onReset()" />
    </div>
    <div class="col-span-7 flex items-center">
      <div>
        <h1 class="text-xl font-medium">Environmental, Social, and Governance Conscious Portfolio Survey</h1>
        <div class="text-xs text-gray-600 mb-4">
          <p>Please note that you can close your browser at any time to withdraw consent. No information will be collected until the final submission.</p>
          <p>Please note that by submitting the survey you will be providing implied consent. Please review the <a class="underline text-blue-600" 
          href="ESG-Conscious-Portfolio-Survey-Consent-Form.pdf" target="_blank">consent form</a> prior to submission.</p>
        </div>
      </div>
    </div>
    <main class="grid grid-cols-1 col-span-8">
      <app-consent *ngIf="state === 'CONSENT'" (submit)="onConsentSubmit()"></app-consent>
      <app-risk-survey *ngIf="state === 'RISK'" (submit)="onRiskSurveySubmit($event)"></app-risk-survey>
      <app-short-survey *ngIf="state === 'SHORT'" (submit)="onShortSurveySubmit($event)" [disabledInputs]="[]"></app-short-survey>
      <app-info *ngIf="state === 'INFO'" (back)="onInfoBack($event)"></app-info>
      <app-long-survey *ngIf="state === 'LONG'" (submit)="onLongSurveySubmit($event)"></app-long-survey>
      <app-complete *ngIf="state === 'COMPLETE'" (submit)="onCompleteSubmit()"></app-complete>
    </main>
  </div>`,
})
export class SurveyContainerComponent implements OnInit {
  state!: SurveyState;

  constructor(
    private surveyService: SurveyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.onReset();
  }

  onReset(): void {
    this.state = 'CONSENT';
  }

  onInfoBack($event: ShortSurveySubmission): void {
    this.scrollToTop();
    this.state = this.surveyService.completeShortSurvey($event);
  }

  onRiskSurveySubmit($event: RiskSurveySubmission): void {
    this.scrollToTop();
    this.state = this.surveyService.completeRiskSurvey($event);
  }

  onShortSurveySubmit($event: ShortSurveySubmission): void {
    this.scrollToTop();
    this.state = this.surveyService.completeShortSurvey($event);
  }

  onLongSurveySubmit($event: LongSurveySubmission): void {
    this.scrollToTop();
    this.state = this.surveyService.completeLongSurvey($event);
  }

  onConsentSubmit(): void {
    this.scrollToTop();
    this.state = this.surveyService.consentToSurvey();
  }

  onCompleteSubmit(): void {
    this.scrollToTop();
    this.state = this.surveyService.completeSurvey();
    this.surveyService.complete()
      .subscribe({
        next: (portfolioId) => this.router.navigate(['portfolio', portfolioId]),
        error: (err) => this.router.navigate(['error'], { state: err }),
      });
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
