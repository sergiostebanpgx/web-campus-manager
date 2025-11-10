# WebCampus Manager

Sistema web moderno de gestión de cursos académicos desarrollado con Angular 20 y Tailwind CSS.

![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📋 Tabla de Contenidos

- [Características](#-características-destacadas)
- [Descripción](#-descripción-del-proyecto)
- [Tecnologías](#-tecnologías-utilizadas)
- [Instalación](#️-instalación-y-configuración)
- [Despliegue](#-despliegue-en-vercel)
- [Uso](#-uso-de-la-aplicación)
- [Diseño](#-características-de-diseño)
- [Estructura](#-estructura-del-proyecto)
- [Changelog](#-changelog)
- [Autor](#-autor)

---

## 🌟 Características Destacadas

- 🎨 **Diseño Moderno**: Interfaz elegante con tipografía Montserrat y paleta Blue Charcoal
- 🔔 **Sistema de Notificaciones**: Toast notifications y modales de confirmación personalizados
- 📱 **Totalmente Responsivo**: Funciona perfecto en móvil, tablet y escritorio
- ⚡ **Alto Rendimiento**: Bundle optimizado (81 KB comprimido) con lazy loading
- 🎯 **Experiencia de Usuario**: Animaciones suaves y feedback visual inmediato
- 🔒 **Validaciones Robustas**: Formularios reactivos con validación en tiempo real
- 🔍 **Búsqueda Avanzada**: Filtros por texto, categoría y nivel
- 💾 **Persistencia Local**: Datos guardados automáticamente en localStorage

---

## 📋 Descripción del Proyecto

**WebCampus Manager** es una aplicación web moderna para la gestión completa de cursos académicos. Implementa todas las operaciones CRUD (Create, Read, Update, Delete) con una interfaz profesional y responsiva.

### Competencia Académica

Este proyecto demuestra la competencia:
> "Construir aplicaciones de software en ambientes web, de escritorio y para dispositivos móviles."

Desarrollado como proyecto de fin de unidad curricular en Desarrollo Web, aplicando tecnologías modernas de la industria.

### Funcionalidades CRUD Completas

- ✅ **Crear cursos**: Formulario completo con validaciones
- ✅ **Listar cursos**: Vista en tarjetas responsivas con información detallada
- ✅ **Editar cursos**: Modificación de cursos existentes
- ✅ **Eliminar cursos**: Con confirmación elegante antes de eliminar
- ✅ **Buscar cursos**: Filtro en tiempo real por título, descripción o instructor
- ✅ **Filtrar por categoría**: Organizar cursos por tipo
- ✅ **Filtrar por nivel**: Básico, Intermedio o Avanzado

---

## 🚀 Tecnologías Utilizadas

### Stack Principal

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Angular** | 20 | Framework principal (componentes standalone) |
| **Tailwind CSS** | 3 | Framework de estilos utility-first |
| **TypeScript** | 5 | Lenguaje con tipado fuerte |
| **RxJS** | Latest | Gestión reactiva del estado |
| **Montserrat** | - | Tipografía desde Google Fonts |
| **Vercel** | - | Plataforma de despliegue |

### Justificación Técnica

#### ¿Por qué Angular?
- Framework completo con todo incluido (routing, forms, HTTP)
- TypeScript nativo para código de calidad
- Arquitectura escalable con componentes modulares
- Lazy loading y optimización automática
- Respaldo de Google con amplia documentación

#### ¿Por qué Tailwind CSS?
- Desarrollo rápido con utility-first approach
- Responsivo por defecto (mobile-first)
- Altamente personalizable
- PurgeCSS elimina estilos no utilizados
- Estándar moderno de la industria

#### ¿Por qué Vercel?
- Optimizado para frameworks JavaScript
- CDN global con distribución rápida
- CI/CD integrado con GitHub
- Preview deployments automáticos
- Plan gratuito para proyectos académicos

---

## 🛠️ Instalación y Configuración

### Requisitos Previos

- **Node.js** 18+ (recomendado v20.x)
- **npm** 10+
- **Git**

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/sergiostebanpgx/web-campus-manager.git
cd web-campus-manager

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm start
# La aplicación estará disponible en http://localhost:4200

# 4. Build de producción
npm run build
# Los archivos optimizados estarán en dist/web-campus-manager
```

---

## 🚀 Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

#### 1. Preparar el Repositorio

```bash
# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "feat: Initial commit - WebCampus Manager v1.0.0"

# Crear repositorio en GitHub (https://github.com/new)
# Nombre sugerido: web-campus-manager

# Conectar con el repositorio remoto
git remote add origin https://github.com/sergiostebanpgx/web-campus-manager.git

# Crear rama main y subir
git branch -M main
git push -u origin main
```

#### 2. Conectar con Vercel

1. **Ir a Vercel**
   - Abre [vercel.com](https://vercel.com)
   - Click en "Sign Up" o "Log In"
   - Usa tu cuenta de GitHub

2. **Importar Proyecto**
   - Click en "Add New..." → "Project"
   - Busca tu repositorio `web-campus-manager`
   - Click en "Import"

3. **Configurar Proyecto**

   Vercel detectará automáticamente Angular:
   ```
   Framework Preset: Angular
   Build Command: npm run build
   Output Directory: dist/web-campus-manager
   Install Command: npm install
   ```

4. **Deploy**
   - Click en "Deploy"
   - Espera 2-3 minutos
   - ¡Listo! 🎉

#### 3. URL de Producción

Vercel te dará una URL como:
```
https://web-campus-manager.vercel.app
```

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Verificar instalación
vercel --version

# Login en Vercel
vercel login

# Desplegar (primera vez)
vercel

# Desplegar a producción
vercel --prod
```

### Actualizaciones Automáticas

Una vez conectado con GitHub, cada `git push` a la rama `main` desplegará automáticamente:

```bash
# Hacer cambios en el código
# ...

# Commit y push
git add .
git commit -m "feat: Nueva funcionalidad"
git push origin main

# Vercel detecta el push y despliega automáticamente
```

### Solución de Problemas Comunes

#### Error: "Build Failed"

```bash
# 1. Probar build localmente
npm run build

# 2. Si funciona local, agregar a package.json:
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### Error: "404 - Page Not Found" en rutas

El archivo `vercel.json` ya está configurado correctamente:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📚 Uso de la Aplicación

### Crear un Curso

1. Click en **"+ Nuevo Curso"** en la navbar
2. Completar el formulario:
   - **Título**: 3-100 caracteres
   - **Descripción**: 10-500 caracteres
   - **Instructor**: Nombre del docente
   - **Categoría**: Seleccionar del dropdown
   - **Nivel**: Básico, Intermedio o Avanzado
   - **Duración**: 1-500 horas
   - **Fecha de inicio**: Selector de fecha
   - **Máximo estudiantes**: 1-200
   - **Estado**: Activo/Inactivo
3. Click en **"Crear Curso"**
4. Se mostrará una notificación de éxito

### Editar un Curso

1. En el listado, click en **"Editar"** en la tarjeta del curso
2. Modificar los campos deseados
3. Click en **"Actualizar Curso"**
4. Notificación de confirmación

### Eliminar un Curso

1. En el listado, click en **"Eliminar"**
2. Aparecerá un modal de confirmación
3. Confirmar la eliminación
4. Notificación de curso eliminado

### Buscar y Filtrar Cursos

**Búsqueda por texto:**
- Escribe en el campo de búsqueda
- Filtra por título, descripción o instructor
- Resultados en tiempo real

**Filtrar por categoría:**
- Selecciona una categoría del dropdown
- Se filtran automáticamente

**Filtrar por nivel:**
- Selecciona Básico, Intermedio o Avanzado
- Combina con otros filtros

**Limpiar filtros:**
- Click en "Limpiar Filtros" para resetear

---

## 🎨 Características de Diseño

### Paleta de Colores Blue Charcoal

```css
/* Paleta principal de Kigen.design */
primary: {
  50:  '#e0f4ff',  // Azul muy claro
  100: '#b3e5ff',  // Azul claro
  200: '#80d4ff',  // Azul medio claro
  300: '#4dc3ff',  // Azul medio
  400: '#1ab2e8',  // Turquesa brillante
  500: '#00abd5',  // Turquesa principal ⭐
  600: '#0092b8',  // Turquesa oscuro
  700: '#007999',  // Azul turquesa oscuro
  800: '#00607a',  // Azul profundo
  900: '#00475a',  // Azul oscuro
  950: '#00151d',  // Casi negro azulado
}

/* Colores adicionales */
success: Verde (#22c55e → #16a34a)
warning: Amarillo (#f59e0b → #d97706)
error: Rojo (#ef4444 → #dc2626)
```

### Tipografía

- **Fuente**: Montserrat (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800
- **Aplicación**: Toda la interfaz

### Sistema de Notificaciones Personalizado

#### Toast Notifications

Notificaciones no intrusivas en la esquina superior derecha:

| Tipo | Color | Uso |
|------|-------|-----|
| Success | Verde | Operaciones exitosas |
| Error | Rojo | Errores y problemas |
| Warning | Amarillo | Advertencias |
| Info | Azul | Información general |

**Características:**
- ✅ Animación slide-in desde la derecha
- ✅ Auto-desaparición (5-7 segundos)
- ✅ Barra de progreso visual
- ✅ Iconos contextuales SVG
- ✅ Botón de cierre manual
- ✅ Múltiples notificaciones simultáneas

**Ejemplo de uso:**
```typescript
// Success
this.notificationService.success('¡Éxito!', 'Curso creado correctamente');

// Error
this.notificationService.error('Error', 'No se pudo eliminar');

// Warning
this.notificationService.warning('Atención', 'Campo requerido');

// Info
this.notificationService.info('Info', 'Datos guardados localmente');
```

#### Confirmation Modals

Diálogos elegantes para acciones críticas:

**Tipos:**
- 🔴 **Danger**: Acciones destructivas (eliminar)
- 🟡 **Warning**: Advertencias importantes
- 🔵 **Info**: Confirmaciones generales

**Características:**
- ✅ Overlay con blur
- ✅ Animación de escala
- ✅ Async/await con Promises
- ✅ Personalizable 100%
- ✅ Click fuera para cancelar

**Ejemplo de uso:**
```typescript
const confirmed = await this.notificationService.confirm({
  title: '¿Eliminar Curso?',
  message: 'Esta acción no se puede deshacer.',
  confirmText: 'Sí, Eliminar',
  cancelText: 'Cancelar',
  type: 'danger'
});

if (confirmed) {
  // Ejecutar acción
}
```

### Responsividad

| Dispositivo | Breakpoint | Columnas | Menú |
|-------------|-----------|----------|------|
| **Móvil** | < 768px | 1 columna | Hamburguesa |
| **Tablet** | 768px - 1024px | 2 columnas | Hamburguesa |
| **Desktop** | > 1024px | 3 columnas | Horizontal |

### Animaciones

- **Botones**: Elevación al hover, efecto de presión
- **Cards**: Elevación y escala suave
- **Notificaciones**: Slide-in con fade
- **Modales**: Scale-in con overlay blur
- **Menú móvil**: Fade-in

---

## 📦 Estructura del Proyecto

```
web-campus-manager/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layout/                    # Layout principal
│   │   │   │   ├── layout.component.ts
│   │   │   │   ├── layout.component.html
│   │   │   │   └── layout.component.css
│   │   │   ├── course-list/              # Listado de cursos
│   │   │   │   ├── course-list.component.ts
│   │   │   │   ├── course-list.component.html
│   │   │   │   └── course-list.component.css
│   │   │   ├── course-form/              # Formulario crear/editar
│   │   │   │   ├── course-form.component.ts
│   │   │   │   ├── course-form.component.html
│   │   │   │   └── course-form.component.css
│   │   │   └── notification/             # Sistema de notificaciones
│   │   │       ├── notification-toast.component.ts
│   │   │       └── confirmation-modal.component.ts
│   │   ├── models/
│   │   │   ├── course.model.ts           # Interfaces de Curso
│   │   │   └── notification.model.ts     # Interfaces de Notificaciones
│   │   ├── services/
│   │   │   ├── course.service.ts         # Lógica CRUD
│   │   │   └── notification.service.ts   # Sistema de notificaciones
│   │   ├── app.routes.ts                 # Configuración de rutas
│   │   ├── app.component.ts              # Componente raíz
│   │   └── app.component.html
│   ├── styles.css                        # Estilos globales + Tailwind
│   └── index.html                        # HTML principal + Fonts
├── tailwind.config.js                    # Config Tailwind + Blue Charcoal
├── postcss.config.js                     # Config PostCSS
├── vercel.json                           # Config Vercel
├── angular.json                          # Config Angular
├── tsconfig.json                         # Config TypeScript
├── package.json                          # Dependencias
└── README.md                             # Este archivo
```

---

## 📊 Estadísticas del Proyecto

### Bundle Size (Producción)

| Archivo | Tamaño Raw | Comprimido |
|---------|-----------|------------|
| **Initial Total** | 306.81 KB | **81.27 KB** ✅ |
| polyfills | 34.59 KB | 11.33 KB |
| styles.css | 31.72 KB | 4.45 KB |
| main.js | 10.00 KB | 2.63 KB |

### Lazy Chunks

| Componente | Comprimido |
|-----------|------------|
| course-form | 11.75 KB |
| course-list | 3.74 KB |
| layout | 1.98 KB |

### Performance

- ⚡ **Build time**: ~3 segundos
- 🎯 **Bundle optimizado**: 81 KB comprimido
- 🚀 **Lazy loading**: 100% de componentes
- 📦 **Tree-shaking**: CSS y JS optimizados

### Código

- **TypeScript**: ~2,000 líneas
- **HTML**: ~900 líneas
- **CSS**: ~250 líneas
- **Total**: ~3,150 líneas
- **Componentes**: 6 standalone
- **Servicios**: 2 con `providedIn: 'root'`

---

## 📝 Changelog

### [1.0.0] - 2024-11-10

#### 🎉 Versión Inicial Completa

**✨ Añadido**

**Sistema de Notificaciones Personalizado**
- Toast notifications con 4 tipos: success, error, warning, info
- Modal de confirmación elegante para acciones críticas
- Animaciones suaves de entrada/salida
- Barra de progreso visual
- Auto-desaparición configurable
- Soporte para múltiples notificaciones simultáneas
- Sistema basado en RxJS Observables

**Mejoras Visuales**
- Integración de tipografía Montserrat desde Google Fonts
- Paleta de colores Blue Charcoal de Kigen.design
  - Primary: Turquesa (#00abd5)
  - 11 tonos de azul turquesa
- Gradientes en botones con efectos hover
- Navbar con gradiente sutil y logo mejorado
- Footer minimalista y elegante
- Sombras dinámicas y efectos de elevación

**Funcionalidades CRUD**
- Crear cursos con formulario reactivo completo
- Listar cursos en tarjetas responsivas
- Editar cursos existentes
- Eliminar cursos con confirmación
- Búsqueda en tiempo real
- Filtros por categoría
- **Filtros por nivel** (Básico/Intermedio/Avanzado)

**Validaciones y UX**
- Formularios reactivos con validaciones robustas
- Mensajes de error contextuales
- Feedback visual inmediato
- Persistencia en localStorage
- Diseño totalmente responsivo

**Componentes**
- `NotificationToastComponent`: Notificaciones toast
- `ConfirmationModalComponent`: Modales de confirmación
- `CourseListComponent`: Listado con filtros
- `CourseFormComponent`: Formulario crear/editar
- `LayoutComponent`: Layout con navbar y footer

**Servicios**
- `NotificationService`: Gestión de notificaciones
- `CourseService`: Lógica CRUD con localStorage

**Modelos**
- `Course`: Modelo de datos de curso
- `Notification`: Modelo de notificaciones
- DTOs para crear y actualizar

**🎨 Mejorado**

- Interfaz de usuario con animaciones fluidas
- Performance con lazy loading
- Accesibilidad con HTML semántico
- Bundle size optimizado (81 KB)

**🔧 Técnico**

- Tailwind CSS 3 con configuración personalizada
- Componentes standalone (Angular 20)
- Lazy loading en rutas
- TypeScript estricto
- Build optimizado para Vercel

**📚 Documentación**

- README.md completo con guías
- Comentarios en código
- Ejemplos de uso

**🚀 Despliegue**

- Configuración de Vercel lista
- CI/CD con GitHub
- Preview deployments

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start              # Servidor de desarrollo (http://localhost:4200)
ng serve               # Alternativa a npm start

# Producción
npm run build          # Build optimizado para producción
ng build --configuration production

# Otros
npm test               # Ejecutar tests unitarios
npm run lint           # Ejecutar linter
```

---

## 🎓 Valor Académico

### Competencias Demostradas

1. **Desarrollo Web Moderno**
   - Angular 20 con componentes standalone
   - Tailwind CSS personalizado
   - TypeScript avanzado

2. **Arquitectura de Software**
   - Separación de responsabilidades
   - Servicios desacoplados
   - Componentes reutilizables

3. **Experiencia de Usuario**
   - Sistema de notificaciones personalizado
   - Validaciones en tiempo real
   - Diseño responsivo

4. **Buenas Prácticas**
   - Código limpio y documentado
   - Patrones de diseño
   - Performance optimizado

---

## 👨‍💻 Autor

**Sergio Steban Parra Guarnizo**

- 🌐 Portfolio: [sergiostebanpgx.vercel.app](https://sergiostebanpgx.vercel.app/)
- 💼 Desarrollador Full Stack
- 🎓 Proyecto Académico - Desarrollo Web
- 📧 Contacto a través del portfolio

---

## 🙏 Agradecimientos

- **Angular Team** por el excelente framework
- **Tailwind Labs** por Tailwind CSS
- **Vercel** por la plataforma de despliegue
- **Google Fonts** por la tipografía Montserrat
- **Kigen.design** por la paleta Blue Charcoal
- **Comunidad Open Source**

---

## 📄 Licencia

Este es un proyecto académico desarrollado con fines educativos.

---

## 🚀 Estado del Proyecto

✅ **Versión**: 1.0.0
✅ **Estado**: Completado y Listo para Producción
✅ **Última Actualización**: 10 de Noviembre de 2024

---

<div align="center">

**WebCampus Manager**

Sistema de Gestión de Cursos Académicos

Desarrollado con ❤️ usando Angular 20, Tailwind CSS y TypeScript

[Ver Demo](#) | [Reportar Bug](#) | [Solicitar Feature](#)

</div>
