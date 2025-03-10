import { EventEmitter, Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  taskCreated = new EventEmitter<Task[]>();
  taskUpdated = new EventEmitter<Task[]>();
  editClicked = new EventEmitter<boolean>();

  private tasks: Task[] = [
    {
      id: 1,
      title: 'Learn Angular',
      description: 'A short description of my task',
      favorite: false,
      active: true,
    },
    {
      id: 2,
      title: 'Read the Bible',
      description: 'A short description of my task',
      favorite: false,
      active: false,
    },
    {
      id: 3,
      title: 'Read my books',
      description: 'A short description of my task',
      favorite: true,
      active: false,
    },
    {
      id: 4,
      title: 'Learn german',
      description: 'A short description of my task',
      favorite: false,
      active: false,
    },
  ];

  getTasks() {
    return this.tasks.slice();
  }

  getTask(id: number) {
    return this.tasks.find((task) => task.id === id);
  }

  createTask() {
    this.tasks.push({
      id: this.tasks.length + 1,
      title: 'New task',
      description: 'A description of my new task',
      favorite: false,
      active: false,
    });

    this.taskCreated.emit(this.tasks.slice());
  }

	// update task not working for now
  updateTask(id: number, title: string, description: string) {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        title,
        description,
      };
      this.taskUpdated.emit(this.tasks.slice());
    } else {
      console.error(`Task with id ${index} not found`);
    }
  }

  updateActive(id: number) {
    this.tasks.forEach((task) => {
      task.active = false;
      if (task.id === id) {
        task.active = true;
      }
    });
  }

  updateFavorite(id?: number) {
    this.tasks.forEach((task) => {
      if (task.id === id) {
        task.favorite = !task.favorite;
      }
    });
  }
}
