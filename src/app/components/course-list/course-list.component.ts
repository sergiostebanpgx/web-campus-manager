import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/notification.service';
import { Course } from '../../models/course.model';

/**
 * Componente de listado de cursos
 * Muestra todos los cursos disponibles en tarjetas responsivas
 * Permite navegar a crear, editar y eliminar cursos
 */
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';
  selectedLevel: string = 'all';
  categories: string[] = ['all'];
  levels: string[] = ['all', 'Básico', 'Intermedio', 'Avanzado'];

  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en los cursos
    this.courseService.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe(courses => {
        this.courses = courses;
        this.filteredCourses = courses;
        this.extractCategories();
        this.applyFilters();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Extrae las categorías únicas de los cursos
   */
  private extractCategories(): void {
    const uniqueCategories = [...new Set(this.courses.map(c => c.category))];
    this.categories = ['all', ...uniqueCategories.sort()];
  }

  /**
   * Aplica filtros de búsqueda, categoría y nivel
   */
  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = this.searchTerm === '' ||
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = this.selectedCategory === 'all' ||
        course.category === this.selectedCategory;

      const matchesLevel = this.selectedLevel === 'all' ||
        course.level === this.selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }

  /**
   * Actualiza el término de búsqueda
   */
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.applyFilters();
  }

  /**
   * Cambia la categoría seleccionada
   */
  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  /**
   * Cambia el nivel seleccionado
   */
  onLevelChange(level: string): void {
    this.selectedLevel = level;
    this.applyFilters();
  }

  /**
   * Elimina un curso con confirmación
   */
  async deleteCourse(course: Course, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = await this.notificationService.confirm({
      title: '¿Eliminar Curso?',
      message: `¿Estás seguro de que deseas eliminar el curso "${course.title}"? Esta acción no se puede deshacer.`,
      confirmText: 'Sí, Eliminar',
      cancelText: 'Cancelar',
      type: 'danger'
    });

    if (confirmed) {
      const success = this.courseService.deleteCourse(course.id);

      if (success) {
        this.notificationService.success(
          '¡Curso Eliminado!',
          `El curso "${course.title}" ha sido eliminado exitosamente.`
        );
      } else {
        this.notificationService.error(
          'Error al Eliminar',
          'No se pudo eliminar el curso. Por favor, intenta nuevamente.'
        );
      }
    }
  }

  /**
   * Retorna el color del badge según el nivel
   */
  getLevelColor(level: string): string {
    const colors: { [key: string]: string } = {
      'Básico': 'bg-green-100 text-green-800',
      'Intermedio': 'bg-yellow-100 text-yellow-800',
      'Avanzado': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  }

  /**
   * Formatea la fecha para mostrar
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
