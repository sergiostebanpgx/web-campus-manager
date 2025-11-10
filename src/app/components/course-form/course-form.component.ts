import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/notification.service';
import { Course, CreateCourseDto, UpdateCourseDto } from '../../models/course.model';

/**
 * Componente de formulario para crear/editar cursos
 * Utiliza Formularios Reactivos con validaciones completas
 * Modo de edición detectado por presencia de parámetro :id en la ruta
 */
@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  isEditMode = false;
  courseId: string | null = null;
  submitAttempted = false;

  // Opciones para los selects
  levels = ['Básico', 'Intermedio', 'Avanzado'];
  categories = [
    'Desarrollo Web',
    'Diseño Web',
    'Programación',
    'Bases de Datos',
    'DevOps',
    'Seguridad',
    'Mobile',
    'Otros'
  ];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  /**
   * Inicializa el formulario con validaciones
   */
  private initializeForm(): void {
    this.courseForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],
      instructor: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      duration: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(500)
      ]],
      level: ['', Validators.required],
      category: ['', Validators.required],
      startDate: ['', Validators.required],
      maxStudents: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(200)
      ]],
      isActive: [true]
    });
  }

  /**
   * Verifica si estamos en modo edición y carga los datos del curso
   */
  private checkEditMode(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');

    if (this.courseId) {
      this.isEditMode = true;
      const course = this.courseService.getCourseById(this.courseId);

      if (course) {
        this.loadCourseData(course);
      } else {
        // Curso no encontrado, redirigir a la lista
        this.notificationService.error(
          'Curso No Encontrado',
          'El curso que intentas editar no existe en el sistema.'
        );
        this.router.navigate(['/courses']);
      }
    }
  }

  /**
   * Carga los datos del curso en el formulario
   */
  private loadCourseData(course: Course): void {
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      category: course.category,
      startDate: course.startDate,
      maxStudents: course.maxStudents,
      isActive: course.isActive
    });
  }

  /**
   * Verifica si un campo tiene errores y ha sido tocado
   */
  hasError(fieldName: string): boolean {
    const field = this.courseForm.get(fieldName);
    return !!(field && field.invalid && (field.touched || this.submitAttempted));
  }

  /**
   * Obtiene el mensaje de error para un campo
   */
  getErrorMessage(fieldName: string): string {
    const field = this.courseForm.get(fieldName);

    if (!field || !field.errors) {
      return '';
    }

    const errors = field.errors;

    if (errors['required']) {
      return 'Este campo es obligatorio';
    }

    if (errors['minlength']) {
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    }

    if (errors['maxlength']) {
      return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    }

    if (errors['min']) {
      return `El valor mínimo es ${errors['min'].min}`;
    }

    if (errors['max']) {
      return `El valor máximo es ${errors['max'].max}`;
    }

    return 'Campo inválido';
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    this.submitAttempted = true;

    if (this.courseForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.courseForm.controls).forEach(key => {
        this.courseForm.get(key)?.markAsTouched();
      });

      this.notificationService.warning(
        'Formulario Incompleto',
        'Por favor, corrige los errores en el formulario antes de continuar.'
      );
      return;
    }

    if (this.isEditMode) {
      this.updateCourse();
    } else {
      this.createCourse();
    }
  }

  /**
   * Crea un nuevo curso
   */
  private createCourse(): void {
    const formValue = this.courseForm.value;
    const newCourse: CreateCourseDto = {
      title: formValue.title,
      description: formValue.description,
      instructor: formValue.instructor,
      duration: Number(formValue.duration),
      level: formValue.level,
      category: formValue.category,
      startDate: formValue.startDate,
      maxStudents: Number(formValue.maxStudents),
      isActive: formValue.isActive
    };

    const course = this.courseService.createCourse(newCourse);

    if (course) {
      this.notificationService.success(
        '¡Curso Creado!',
        `El curso "${course.title}" ha sido creado exitosamente.`
      );
      this.router.navigate(['/courses']);
    } else {
      this.notificationService.error(
        'Error al Crear',
        'No se pudo crear el curso. Por favor, intenta nuevamente.'
      );
    }
  }

  /**
   * Actualiza un curso existente
   */
  private updateCourse(): void {
    if (!this.courseId) return;

    const formValue = this.courseForm.value;
    const updateData: UpdateCourseDto = {
      id: this.courseId,
      title: formValue.title,
      description: formValue.description,
      instructor: formValue.instructor,
      duration: Number(formValue.duration),
      level: formValue.level,
      category: formValue.category,
      startDate: formValue.startDate,
      maxStudents: Number(formValue.maxStudents),
      isActive: formValue.isActive
    };

    const course = this.courseService.updateCourse(updateData);

    if (course) {
      this.notificationService.success(
        '¡Curso Actualizado!',
        `El curso "${course.title}" ha sido actualizado exitosamente.`
      );
      this.router.navigate(['/courses']);
    } else {
      this.notificationService.error(
        'Error al Actualizar',
        'No se pudo actualizar el curso. Por favor, intenta nuevamente.'
      );
    }
  }

  /**
   * Cancela la operación y vuelve a la lista
   */
  async onCancel(): Promise<void> {
    if (this.courseForm.dirty) {
      const confirmed = await this.notificationService.confirm({
        title: '¿Cancelar Cambios?',
        message: 'Los cambios no guardados se perderán. ¿Estás seguro de que deseas cancelar?',
        confirmText: 'Sí, Cancelar',
        cancelText: 'No, Continuar Editando',
        type: 'warning'
      });

      if (!confirmed) {
        return;
      }
    }

    this.router.navigate(['/courses']);
  }
}
