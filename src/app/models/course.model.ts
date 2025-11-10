/**
 * Modelo de datos para un Curso
 * Representa la estructura de un curso en el sistema WebCampus Manager
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number; // Duración en horas
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  category: string;
  startDate: string; // Formato ISO date string
  maxStudents: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * DTO para crear un nuevo curso
 * Omite campos autogenerados como id, createdAt, updatedAt
 */
export interface CreateCourseDto {
  title: string;
  description: string;
  instructor: string;
  duration: number;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  category: string;
  startDate: string;
  maxStudents: number;
  isActive: boolean;
}

/**
 * DTO para actualizar un curso existente
 * Todos los campos son opcionales excepto el id
 */
export interface UpdateCourseDto {
  id: string;
  title?: string;
  description?: string;
  instructor?: string;
  duration?: number;
  level?: 'Básico' | 'Intermedio' | 'Avanzado';
  category?: string;
  startDate?: string;
  maxStudents?: number;
  isActive?: boolean;
}
