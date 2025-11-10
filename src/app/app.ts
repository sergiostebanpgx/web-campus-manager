import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationToastComponent } from './components/notification/notification-toast.component';
import { ConfirmationModalComponent } from './components/notification/confirmation-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NotificationToastComponent,
    ConfirmationModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web-campus-manager');
}
