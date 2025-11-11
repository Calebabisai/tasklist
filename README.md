# Task List - Aplicación de Gestión de Tareas

Una aplicación moderna de lista de tareas construida con **Angular 20** y un backend JSON Server. Diseño atractivo con CSS personalizado, integración completa con API REST y gestión de estado reactivo.

---

## Características

- **CRUD completo** - Crear, leer, actualizar y eliminar tareas
- **Diseño moderno** - Interfaz oscura con gradientes y animaciones suaves
- **Backend JSON Server** - Base de datos JSON persistente en tiempo real
- **Responsive** - Se adapta perfectamente a dispositivos móviles
- **Angular Signals** - Gestión de estado reactivo moderna
- **HttpClient** - Integración REST API con manejo de errores
- **UX amigable** - Animaciones, hover effects y feedback visual

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Angular** | 20.3.0 | Framework principal |
| **TypeScript** | 5.9.2 | Lenguaje tipado |
| **JSON Server** | 1.0.0-beta.3 | Backend simulado |
| **RxJS** | 7.8.0 | Programación reactiva |
| **CSS3** | Vanilla | Estilos modernos |

---

## Instalación

### Requisitos previos
- Node.js v18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/Calebabisai/tasklist.git
cd tasklist
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar JSON Server (base de datos)**
```bash
npm run json-server
# O manualmente:
npx json-server --watch db.json --port 3000
```

4. **En otra terminal, iniciar Angular**
```bash
npm start
# O:
ng serve
```

5. **Abrir en navegador**
```
http://localhost:4200
```

---

## Uso

### Crear una tarea
1. Escribe el nombre de la tarea en el input
2. Haz clic en el botón "Agregar"
3. La tarea aparecerá en la lista

### Marcar como completada
- Haz clic en el checkbox para marcar/desmarcar como completa
- El texto se tacha automáticamente

### Eliminar una tarea
- Haz clic en el botón "×" de la derecha para eliminar

---

## Estructura del Proyecto

```
TaskList/
├── src/
│   ├── app/
│   │   ├── app.ts                 # Componente raíz
│   │   ├── app.html               # Template principal
│   │   ├── app.css                # Estilos contenedor
│   │   ├── app.routes.ts          # Rutas (si aplica)
│   │   ├── task-service.ts        # Servicio de tareas (CRUD)
│   │   ├── models/
│   │   │   └── task.model.ts      # Modelo TypeScript
│   │   └── tasklist/
│   │       ├── tasklist.ts        # Componente tasklist
│   │       ├── tasklist.html      # Template tareas
│   │       └── tasklist.css       # Estilos modernos
│   ├── main.ts                    # Punto de entrada
│   └── styles.css                 # Estilos globales
├── db.json                        # Base de datos JSON
├── angular.json                   # Configuración Angular
└── package.json                   # Dependencias
```

---

## Arquitectura Backend

### JSON Server como API

La aplicación usa **JSON Server** que simula una API REST completa. Las tareas se persisten en `db.json`.

**URL Base:** `http://localhost:3000/tasks`

#### Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/tasks` | Obtener todas las tareas |
| `GET` | `/tasks/:id` | Obtener una tarea por ID |
| `POST` | `/tasks` | Crear una nueva tarea |
| `PUT` | `/tasks/:id` | Actualizar una tarea |
| `DELETE` | `/tasks/:id` | Eliminar una tarea |

### Estructura de Datos

```json
{
  "tasks": [
    {
      "id": "027a",
      "title": "Aprender CSS",
      "completed": false
    },
    {
      "id": "9f34",
      "title": "Dominar Angular",
      "completed": false
    }
  ]
}
```

**Propiedades:**
- `id` (string): Identificador único generado por JSON Server
- `title` (string): Descripción de la tarea
- `completed` (boolean): Estado de completitud

---

## Componentes y Servicios

### 1. **TaskService** (`task-service.ts`)

Servicio central que gestiona toda la comunicación con el backend.

```typescript
@Injectable({ providedIn: 'root' })
export class TaskService {
  // Signal reactivo con la lista de tareas
  tasks = signal<Task[]>([]);
  
  // Cargar todas las tareas desde la API
  loadTasks(): void
  
  // Agregar una nueva tarea
  addTask(title: string): void
  
  // Actualizar estado de tarea (toggle)
  toggleTask(id: string): void
  
  // Eliminar una tarea
  deleteTask(id: string): void
}
```

**Conceptos clave:**
- **Angular Signals**: Gestión de estado reactivo moderna
- **HttpClient**: Llamadas HTTP a la API
- **RxJS Observables**: Suscripciones y operadores reactivos
- **Manejo de errores**: Try-catch en llamadas HTTP

### 2. **TaskListComponent** (`tasklist.ts`)

Componente que renderiza la lista y coordina interacciones.

**Funcionalidades:**
- Muestra la lista de tareas dinámicamente
- Maneja eventos de usuario
- Valida inputs antes de agregar
- Actualiza UI reactivamente

### 3. **Modelo** (`task.model.ts`)

Define la estructura TypeScript de una tarea:

```typescript
export interface Task {
  id?: string;
  title: string;
  completed: boolean;
}
```

---

## CSS y Diseño

### Variables CSS Globales

El proyecto usa **CSS Custom Properties** para facilitar cambios de tema:

```css
:root {
  --primary-color: #6366f1;      /* Azul índigo */
  --bg-primary: #0f172a;         /* Fondo oscuro */
  --text-primary: #f1f5f9;       /* Texto claro */
  /* ... más variables */
}
```

### Características de Diseño

**Tema Oscuro**: Fondo gradiente atractivo  
**Flexbox Layout**: Alineación perfecta  
**Efectos Hover**: Feedback visual interactivo  
**Animaciones**: Entrada suave de elementos  
**Media Queries**: Responsive en móviles  
**Colores Coherentes**: Paleta unificada

---

## Flujo de Datos

```
Usuario Input
    ↓
Component Event Handler
    ↓
TaskService Method
    ↓
HttpClient (GET/POST/PUT/DELETE)
    ↓
JSON Server API
    ↓
db.json (Base de datos)
    ↓
Response Observable
    ↓
Signal Update (tasks.set/update)
    ↓
Template Re-render (@for loop)
    ↓
UI Actualizada
```

---

## Conceptos Aprendidos

### Angular
- ✅ Componentes standalone
- ✅ Angular Signals (alternativa a RxJS)
- ✅ HttpClient para REST API
- ✅ Inyección de dependencias (@Injectable)
- ✅ Event binding y two-way binding

### TypeScript
- ✅ Interfaces para tipado
- ✅ Tipos genéricos
- ✅ Tipos de unión
- ✅ Parámetros opcionales

### CSS
- ✅ Custom Properties (variables)
- ✅ Flexbox
- ✅ Gradientes
- ✅ Transiciones y animaciones
- ✅ Media queries (responsive)
- ✅ Pseudo-clases (:hover, :focus)

---

## Resolución de Problemas

### El backend no conecta
```bash
# Verifica que JSON Server esté corriendo en puerto 3000
lsof -i :3000

# Reinicia JSON Server
npm run json-server
```

### Las tareas no se guardan
- Revisa que `db.json` tenga permisos de lectura/escritura
- Verifica la consola del navegador para errores HTTP
- Comprueba que la URL de API es correcta en `task-service.ts`

### Problemas de estilo
- Limpia el cache: `Ctrl+Shift+R` (o `Cmd+Shift+R` en Mac)
- Verifica que los archivos CSS estén importados
- Comprueba la consola para errores de CSS

---

## Scripts Disponibles

```bash
npm start              # Inicia servidor de desarrollo
ng serve              # Alternativa: inicia Angular
npm run build         # Compila para producción
npm run watch         # Watch mode para desarrollo
npm test              # Ejecuta tests unitarios
npm run json-server   # Inicia JSON Server
```

---

## Próximas Mejoras

- [ ] Agregar categorías a tareas
- [ ] Filtro por estado (completadas/pendientes)
- [ ] Búsqueda de tareas
- [ ] Modo claro/oscuro
- [ ] Persistencia en localStorage como fallback
- [ ] Validación avanzada de inputs
- [ ] Animaciones más sofisticadas
- [ ] Tests unitarios

---

## Licencia

Este proyecto es de código abierto bajo la licencia MIT.

---

## Autor

**Caleb Trevizo**  
[GitHub](https://github.com/Calebabisai) | [Portfolio]

---

## Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---


**¡Gracias por usar Task List!** 
