import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../task-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css',
})

export class Tasklist implements OnInit {

  private taskService = inject(TaskService);
  tasks = this.taskService.tasks;

  newTask = ''

  ngOnInit() {
    this.taskService.loadTasks()
  }

  toggle(id: string){
    this.taskService.toggleTask(id);
  }

  delete(id: string){
    this.taskService.deleteTask(id);
  }

  addTask(){
    const trimmed = this.newTask.trim();
    if(trimmed.length === 0) return;

    this.taskService.addTask(trimmed);
    this.newTask = '';
  }



}
