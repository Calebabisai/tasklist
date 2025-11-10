import { inject, Injectable, signal } from '@angular/core';
import { Task } from './models/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**Signal donde nosotros llamamos a nuestro model Task (Que este contiene: 
  * id: string, 
  * description: string 
  completed: boolean) y va a llamar a los datos almacenados con: this.loadFromLocalStorage */
  tasks = signal< Task[]>([]);

  /*Esto permite que podamos usar this.http.get(), this.http.post()*/
  private http = inject(HttpClient)

  /*Nueva URL de API con port 3000 */
  private apiUrl = 'http://localhost:3000/tasks'
  /*Cargamos la tarea a nuestro backend, aqui es donde hacemos la llamada a nuestra
  apiUrl y si no se llaga a cumplir, se marca un error */
  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks)
      },
      error: (error) => {
        console.error('Ha ocurrido un error al cargar los datos...', error)
      }
    });
  }

  /* Anade una tarea asignandole un ID mismo del backend, 
  *anade la descripcion que se coloque en el input 
  *y se guarda en el mismo
  */
  addTask(title:string) {
    const newTask: Task = {
      title: title,
      completed: false
      }
      
      this.http.post<Task>(this.apiUrl, newTask).subscribe({
        next: (taskCreada) => {
          this.tasks.update((currentTasks) => {
            return [...currentTasks, taskCreada]
          })
        }
      })
  }
  /* Marca la tarea completada por su ID, revirtiendo su estado completed 
  de true a false y de false a true y actualiza el signal*/
  toggleTask(id: string) {
    const task = this.tasks().find(findTask => findTask.id === id)
    if(!task) return
    
    const updatedTask = {...task, completed: !task.completed };
    this.http.put<Task>(`${this.apiUrl}/${id}`, updatedTask).subscribe({
      next: (taskUpdate) => {
        this.tasks.update(allTasks => allTasks.map(taskId => taskId.id === id? taskUpdate: taskId))
      }
    })
  }
  /*Borra la tarea por su ID, y actualiza el signal */
  deleteTask(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.tasks.update(allTask => 
          allTask.filter(filterTask => filterTask.id !== id)
        )
      }
    })
  }

};

