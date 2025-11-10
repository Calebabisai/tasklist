import { Component, signal } from '@angular/core';
import { Tasklist } from './tasklist/tasklist';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Tasklist],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-manager');
}
