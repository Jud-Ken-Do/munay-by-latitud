import { Component, input, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="modal-backdrop" [class.on]="isOpen()" (click)="close.emit()">
      <div class="modal-content" [class.on]="isOpen()" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ title() }}</h3>
          <button class="close-btn" (click)="close.emit()"><app-icon name="x" /></button>
        </div>
        <div class="modal-body">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  close = output();
}
