import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-consent',
  templateUrl: './consent.component.html',
})
export class ConsentComponent {
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

  onSubmit(): void {
    this.submit.emit();
  }
}
