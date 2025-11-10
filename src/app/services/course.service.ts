import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course, CreateCourseDto, UpdateCourseDto } from '../models/course.model';

/**
 * Servicio para gestión de cursos
 * Implementa operaciones CRUD usando BehaviorSubject para reactividad
 * En un escenario real, este servicio consumiría una API REST
 */
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // Almacenamiento local de cursos (simulando backend)
  private coursesSubject = new BehaviorSubject<Course[]>(this.getInitialCourses());

  // Observable público para que los componentes se suscriban
  public courses$: Observable<Course[]> = this.coursesSubject.asObservable();

  constructor() {
    this.loadCoursesFromStorage();
  }

  /**
   * Obtiene todos los cursos
   */
  getCourses(): Course[] {
    return this.coursesSubject.value;
  }

  /**
   * Obtiene un curso por su ID
   */
  getCourseById(id: string): Course | undefined {
    return this.coursesSubject.value.find(course => course.id === id);
  }

  /**
   * Crea un nuevo curso
   */
  createCourse(courseDto: CreateCourseDto): Course {
    const newCourse: Course = {
      id: this.generateId(),
      ...courseDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const currentCourses = this.coursesSubject.value;
    const updatedCourses = [...currentCourses, newCourse];

    this.coursesSubject.next(updatedCourses);
    this.saveCoursesToStorage(updatedCourses);

    return newCourse;
  }

  /**
   * Actualiza un curso existente
   */
  updateCourse(updateDto: UpdateCourseDto): Course | null {
    const currentCourses = this.coursesSubject.value;
    const index = currentCourses.findIndex(c => c.id === updateDto.id);

    if (index === -1) {
      return null;
    }

    const updatedCourse: Course = {
      ...currentCourses[index],
      ...updateDto,
      updatedAt: new Date().toISOString()
    };

    const updatedCourses = [
      ...currentCourses.slice(0, index),
      updatedCourse,
      ...currentCourses.slice(index + 1)
    ];

    this.coursesSubject.next(updatedCourses);
    this.saveCoursesToStorage(updatedCourses);

    return updatedCourse;
  }

  /**
   * Elimina un curso por su ID
   */
  deleteCourse(id: string): boolean {
    const currentCourses = this.coursesSubject.value;
    const filteredCourses = currentCourses.filter(course => course.id !== id);

    if (filteredCourses.length === currentCourses.length) {
      return false; // No se encontró el curso
    }

    this.coursesSubject.next(filteredCourses);
    this.saveCoursesToStorage(filteredCourses);

    return true;
  }

  /**
   * Filtra cursos por categoría
   */
  getCoursesByCategory(category: string): Course[] {
    return this.coursesSubject.value.filter(
      course => course.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Filtra cursos activos
   */
  getActiveCourses(): Course[] {
    return this.coursesSubject.value.filter(course => course.isActive);
  }

  /**
   * Genera un ID único para nuevos cursos
   */
  private generateId(): string {
    return `course-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Guarda cursos en localStorage
   */
  private saveCoursesToStorage(courses: Course[]): void {
    try {
      localStorage.setItem('webcampus_courses', JSON.stringify(courses));
    } catch (error) {
      console.error('Error al guardar cursos en localStorage:', error);
    }
  }

  /**
   * Carga cursos desde localStorage
   */
  private loadCoursesFromStorage(): void {
    try {
      const stored = localStorage.getItem('webcampus_courses');
      if (stored) {
        const courses = JSON.parse(stored);
        this.coursesSubject.next(courses);
      }
    } catch (error) {
      console.error('Error al cargar cursos desde localStorage:', error);
    }
  }

  /**
   * Datos iniciales de ejemplo
   */
  private getInitialCourses(): Course[] {
    return [
      {
        id: 'course-1',
        title: 'Desarrollo Web con Angular',
        description: 'Aprende a crear aplicaciones web modernas con Angular y TypeScript. Incluye componentes, servicios, routing y más.',
        instructor: 'María González',
        duration: 40,
        level: 'Intermedio',
        category: 'Desarrollo Web',
        startDate: '2024-12-01',
        maxStudents: 30,
        isActive: true,
        createdAt: '2024-11-01T10:00:00Z',
        updatedAt: '2024-11-01T10:00:00Z'
      },
      {
        id: 'course-2',
        title: 'Diseño Responsivo con Tailwind CSS',
        description: 'Domina el framework de utilidades CSS más popular para crear interfaces responsivas y atractivas.',
        instructor: 'Carlos Ramírez',
        duration: 24,
        level: 'Básico',
        category: 'Diseño Web',
        startDate: '2024-11-15',
        maxStudents: 25,
        isActive: true,
        createdAt: '2024-11-01T11:00:00Z',
        updatedAt: '2024-11-01T11:00:00Z'
      },
      {
        id: 'course-3',
        title: 'JavaScript Avanzado',
        description: 'Profundiza en conceptos avanzados de JavaScript: closures, async/await, programación funcional y más.',
        instructor: 'Ana Martínez',
        duration: 36,
        level: 'Avanzado',
        category: 'Programación',
        startDate: '2024-12-10',
        maxStudents: 20,
        isActive: true,
        createdAt: '2024-11-01T12:00:00Z',
        updatedAt: '2024-11-01T12:00:00Z'
      }
    ];
  }
}
