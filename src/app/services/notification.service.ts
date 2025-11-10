import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Notification, NotificationType, ConfirmOptions } from '../models/notification.model';

/**
 * Servicio de notificaciones moderno
 * Reemplaza alert() y confirm() con componentes personalizados
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private confirmSubject = new Subject<{
    options: ConfirmOptions;
    callback: (confirmed: boolean) => void;
  }>();
  public confirm$ = this.confirmSubject.asObservable();

  /**
   * Muestra una notificación de éxito
   */
  success(title: string, message: string, duration: number = 5000): void {
    this.showNotification('success', title, message, duration);
  }

  /**
   * Muestra una notificación de error
   */
  error(title: string, message: string, duration: number = 7000): void {
    this.showNotification('error', title, message, duration);
  }

  /**
   * Muestra una notificación de advertencia
   */
  warning(title: string, message: string, duration: number = 6000): void {
    this.showNotification('warning', title, message, duration);
  }

  /**
   * Muestra una notificación informativa
   */
  info(title: string, message: string, duration: number = 5000): void {
    this.showNotification('info', title, message, duration);
  }

  /**
   * Muestra una notificación genérica
   */
  private showNotification(
    type: NotificationType,
    title: string,
    message: string,
    duration: number
  ): void {
    const notification: Notification = {
      id: this.generateId(),
      type,
      title,
      message,
      duration,
      timestamp: new Date()
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Auto-remover después de la duración especificada
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, duration);
    }
  }

  /**
   * Remueve una notificación
   */
  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);
  }

  /**
   * Muestra un diálogo de confirmación
   */
  confirm(options: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmSubject.next({
        options,
        callback: (confirmed: boolean) => {
          resolve(confirmed);
        }
      });
    });
  }

  /**
   * Genera un ID único para las notificaciones
   */
  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Limpia todas las notificaciones
   */
  clearAll(): void {
    this.notificationsSubject.next([]);
  }
}
