import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

/**
 * Componente de notificaciones Toast
 * Muestra notificaciones en la esquina superior derecha
 */
@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full px-4">
      <div
        *ngFor="let notification of notifications"
        [class]="getNotificationClasses(notification)"
        class="animate-slide-in-right">

        <div class="flex items-start gap-3">
          <!-- Icono -->
          <div class="flex-shrink-0 mt-0.5">
            <svg *ngIf="notification.type === 'success'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>

            <svg *ngIf="notification.type === 'error'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>

            <svg *ngIf="notification.type === 'warning'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>

            <svg *ngIf="notification.type === 'info'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>

          <!-- Contenido -->
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm">{{ notification.title }}</p>
            <p class="text-sm mt-0.5 opacity-90">{{ notification.message }}</p>
          </div>

          <!-- Botón cerrar -->
          <button
            (click)="removeNotification(notification.id)"
            class="flex-shrink-0 hover:opacity-70 transition-opacity">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <!-- Barra de progreso (opcional) -->
        <div *ngIf="notification.duration && notification.duration > 0"
             class="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
          <div class="h-full bg-white/70 animate-progress"
               [style.animation-duration.ms]="notification.duration"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }

    .animate-progress {
      animation: progress linear;
    }
  `]
})
export class NotificationToastComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }

  getNotificationClasses(notification: Notification): string {
    const baseClasses = 'rounded-lg shadow-xl p-4 backdrop-blur-sm';

    const typeClasses = {
      success: 'bg-gradient-to-r from-success-500 to-success-600 text-white',
      error: 'bg-gradient-to-r from-error-500 to-error-600 text-white',
      warning: 'bg-gradient-to-r from-warning-500 to-warning-600 text-white',
      info: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
    };

    return `${baseClasses} ${typeClasses[notification.type]}`;
  }
}
