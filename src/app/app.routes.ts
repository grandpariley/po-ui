import { Routes } from '@angular/router';
import { SurveyContainerComponent } from './survey/survey-container/survey-container.component';
import { ErrorContainerComponent } from './survey/error/error.component';
import { PortfolioContainerComponent } from './portfolio/portfolio.component';

export const routes: Routes = [
    {
        path: 'survey',
        component: SurveyContainerComponent,
      },
      {
        path: 'error',
        component: ErrorContainerComponent,
      },
      {
        path: 'portfolio/:portfolioId',
        component: PortfolioContainerComponent,
      },
      {
        path: '**',
        redirectTo: 'survey'
      },
];
