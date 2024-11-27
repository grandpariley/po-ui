import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-complete',
  templateUrl: './complete.component.html',
})
export class CompleteComponent {
  @Output() completeSubmit: EventEmitter<void> = new EventEmitter<void>();

  onSubmit(): void {
    this.completeSubmit.emit();
  }
}
