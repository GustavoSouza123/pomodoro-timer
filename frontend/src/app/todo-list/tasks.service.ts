import { EventEmitter, Injectable, resolveForwardRef } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  taskClicked = new EventEmitter<Task>();
  taskCreated = new EventEmitter<boolean>();
  editClicked = new EventEmitter<boolean>();
  taskDeleted = new EventEmitter<Task[]>();

  private tasks!: Task[];
  // private tasks: Task[] = [
  //   {
  //     id: 1,
  //     title: 'Learn Angular',
  //     description: 'A short description of my task',
  //     favorite: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Read the Bible',
  //     description: 'A short description of my task',
  //     favorite: false,
  //   },
  //   {
  //     id: 3,
  //     title: 'Read my books',
  //     description: 'A short description of my task',
  //     favorite: true,
  //   },
  //   {
  //     id: 4,
  //     title: 'Learn german',
  //     description: 'A short description of my task',
  //     favorite: false,
  //   },
  // ];

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/tasks`, {
      observe: 'response',
    });
  }

  getTask(id: number): Promise<Task> {
    return new Promise<Task>((resolve) => {
      this.getTasks().subscribe((res) => {
        if (res.body.length) {
          let task = res.body.find((task: any) => task.id === id);
          resolve(task);
        }
      });
    });
  }

  getActiveTask(): Observable<any> {
		return this.http.get<any>(`${environment.apiUrl}/api/activeTask`, {
      observe: 'response',
    });
  }

  createTask(title: string, description: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/tasks`, {
      title,
      description,
      favorite: false,
    });
  }

  updateActive(id: number): Observable<any> {
    this.getTasks().subscribe((res) => {
      res.body.forEach((task: any) => {
        if (task.id === id) {
          this.taskClicked.emit(task);
        }
      });
    });

    return this.http.put<any>(`${environment.apiUrl}/api/activeTask`, {
      taskId: id,
    });
  }

  updateFavorite(id?: number) {
    this.tasks.forEach((task) => {
      if (task.id === id) {
        task.favorite = !task.favorite;
      }
    });
  }

  deleteTask(id?: number) {
    this.tasks.splice(
      this.tasks.findIndex((task) => task.id === id),
      1
    );
    this.taskDeleted.emit(this.tasks.slice());
  }
}
