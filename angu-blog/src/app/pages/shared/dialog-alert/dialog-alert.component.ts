import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css'],
})
export class DialogAlertComponent {
  @Input() message: string = ''; // Receive the error message
}

