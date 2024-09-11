import { Component, EventEmitter, Output } from '@angular/core';
import { ShortSurveySubmission } from '../model/model';
import { ShortSurveyComponent } from '../short-survey/short-survey.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ShortSurveyComponent],
  selector: 'app-info',
  templateUrl: './info.component.html',
})
export class InfoComponent {

  @Output() back: EventEmitter<ShortSurveySubmission> = new EventEmitter<ShortSurveySubmission>();

  onShortSurveySubmit($event: ShortSurveySubmission): void {
    this.back.emit($event);
  }
}
