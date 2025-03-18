import { Injectable } from '@angular/core';
import { Session } from './session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  private sessions: Session[] = [
    { id: 1, taskId: 1, time: 30, date: '10/03/2025' },
    { id: 2, taskId: 1, time: 45, date: '11/03/2025' },
    { id: 3, taskId: 2, time: 60, date: '12/03/2025' },
    { id: 4, taskId: 1, time: 20, date: '13/03/2025' },
  ];

  getSessions() {
    return this.sessions.slice();
  }

  getSessionsFromTask(taskId: number) {
    return this.sessions.filter((session) => session.taskId === taskId);
  }

  sumTimeByTask(taskId: number) {
    let sum = 0;
    let arr = this.getSessionsFromTask(taskId);
    arr.forEach((session) => (sum += session.time));
    return sum;
  }

  createSession(taskId: number, time: number) {
    const date = new Date();
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    let year = date.getFullYear();
    let dateStr = `${day}/${month}/${year}`;

    this.sessions.push({
      id: this.sessions.length + 1,
      taskId,
      time,
      date: dateStr,
    });
  }
}
