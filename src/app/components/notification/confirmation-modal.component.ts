import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { ConfirmOptions } from '../../models/notification.model';

/**
 * Componente Modal de Confirmación
 * Reemplaza el confirm() nativo del navegador
 */
@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible"
         class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"
           (click)="onCancel()"></div>

      <!-- Modal -->
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">

        <!-- Header con color según tipo -->
        <div [class]="getHeaderClass()"
             class="px-6 py-4 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path *ngIf="currentOptions?.type === 'danger'" fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              <path *ngIf="currentOptions?.type === 'warning'" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              <path *ngIf="currentOptions?.type === 'info' || !currentOptions?.type" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white flex-1">{{ currentOptions?.title }}</h3>
        </div>

        <!-- Body -->
        <div class="px-6 py-5">
          <p class="text-secondary-700 leading-relaxed">{{ currentOptions?.message }}</p>
        </div>

        <!-- Footer con botones -->
        <div class="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          <button
            (click)="onCancel()"
            class="btn-secondary flex-1 sm:flex-none">
            {{ currentOptions?.cancelText || 'Cancelar' }}
          </button>

          <button
            (click)="onConfirm()"
            [class]="getConfirmButtonClass()"
            class="flex-1 sm:flex-none">
            {{ currentOptions?.confirmText || 'Confirmar' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {
  isVisible = false;
  currentOptions: ConfirmOptions | null = null;
  private currentCallback: ((confirmed: boolean) => void) | null = null;
  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.confirm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ options, callback }) => {
        this.currentOptions = options;
        this.currentCallback = callback;
        this.isVisible = true;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onConfirm(): void {
    if (this.currentCallback) {
      this.currentCallback(true);
    }
    this.close();
  }

  onCancel(): void {
    if (this.currentCallback) {
      this.currentCallback(false);
    }
    this.close();
  }

  private close(): void {
    this.isVisible = false;
    this.currentOptions = null;
    this.currentCallback = null;
  }

  getHeaderClass(): string {
    const type = this.currentOptions?.type || 'info';
    const classes = {
      danger: 'bg-gradient-to-r from-error-600 to-error-700 text-white',
      warning: 'bg-gradient-to-r from-warning-600 to-warning-700 text-white',
      info: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
    };
    return classes[type];
  }

  getConfirmButtonClass(): string {
    const type = this.currentOptions?.type || 'info';
    const classes = {
      danger: 'btn-danger',
      warning: 'bg-gradient-to-r from-warning-600 to-warning-700 hover:from-warning-700 hover:to-warning-800 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200',
      info: 'btn-primary'
    };
    return classes[type];
  }
}
