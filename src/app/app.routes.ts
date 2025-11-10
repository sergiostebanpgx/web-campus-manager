import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'courses',
        loadComponent: () => import('./components/course-list/course-list.component').then(m => m.CourseListComponent)
      },
      {
        path: 'courses/new',
        loadComponent: () => import('./components/course-form/course-form.component').then(m => m.CourseFormComponent)
      },
      {
        path: 'courses/edit/:id',
        loadComponent: () => import('./components/course-form/course-form.component').then(m => m.CourseFormComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/courses'
  }
];
