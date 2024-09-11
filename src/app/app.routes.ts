import { Routes } from '@angular/router';
import { SurveyContainerComponent } from './survey/survey-container/survey-container.component';
import { ThanksContainerComponent } from './survey/thanks-container/thanks-container.component';

export const routes: Routes = [
    {
        path: 'survey',
        component: SurveyContainerComponent,
      },
      {
        path: 'thanks',
        component: ThanksContainerComponent,
      },
      {
        path: '**',
        redirectTo: 'survey'
      },
];
