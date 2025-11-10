/**
 * Tipo de notificación
 */
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Modelo de notificación para el sistema de alertas
 */
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // Duración en milisegundos (por defecto 5000)
  timestamp: Date;
}

/**
 * Opciones de confirmación para modales
 */
export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
}
