import { EventEmitter, Injectable, resolveForwardRef } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  taskCreated = new EventEmitter<boolean>();
  activeTaskUpdated = new EventEmitter<Task>();
  editClicked = new EventEmitter<boolean>();

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

	updateTask(task: Task) {
		return this.http.put<any>(`${environment.apiUrl}/api/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      favorite: !task.favorite,
    });
	}

  updateActive(id: number): Observable<any> {
    this.getTasks().subscribe((res) => {
      res.body.forEach((task: any) => {
        if (task.id === id) {
          this.activeTaskUpdated.emit(task);
        }
      });
    });

    return this.http.put<any>(`${environment.apiUrl}/api/activeTask`, {
      taskId: id,
    });
  }

  updateFavorite(task: Task): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      favorite: !task.favorite,
    });
  }

  deleteTask(id?: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/tasks/${id}`);
  }
}
