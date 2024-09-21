import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SurveyContainerComponent } from './survey/survey-container/survey-container.component';
import { ConsentComponent } from './survey/consent/consent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RiskSurveyComponent } from './survey/risk-survey/risk-survey.component';
import { ShortSurveyComponent } from './survey/short-survey/short-survey.component';
import { InfoComponent } from './survey/info/info.component';
import { LongSurveyComponent } from './survey/long-survey/long-survey.component';
import { CompleteComponent } from './survey/complete/complete.component';
import { SurveyService } from './survey/survey.service';
import { PortfolioService } from './portfolio/portfolio.service';
import { AppRoutingModule } from './app-routing.module';
import { RankComponent } from './survey/rank/rank.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PortfolioContainerComponent } from './portfolio/portfolio.component';

@NgModule({
    declarations: [
        AppComponent,
        SurveyContainerComponent,
        PortfolioContainerComponent,
        ConsentComponent,
        RiskSurveyComponent,
        ShortSurveyComponent,
        InfoComponent,
        LongSurveyComponent,
        CompleteComponent,
        RankComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        SurveyService,
        PortfolioService,
        provideHttpClient(withInterceptorsFromDi()),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


