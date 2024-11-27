import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-consent',
  templateUrl: './consent.component.html',
})
export class ConsentComponent {
  @Output() consentSubmit: EventEmitter<void> = new EventEmitter<void>();

  onSubmit(): void {
    this.consentSubmit.emit();
  }
}
