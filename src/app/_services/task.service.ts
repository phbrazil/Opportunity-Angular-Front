import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../components/shared/utils/Constants';
import { Task } from '../_models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private isReloadTask = new BehaviorSubject<boolean>(false);

  readonly baseUrl: string = Constants.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public setIsReload(status: boolean): void {
    this.isReloadTask.next(status);
  }

  public getIsReload(): Observable<boolean> {
    return this.isReloadTask.asObservable();

  }

  newTask(task: Task, idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/task/newTask/${idUser}`;

    return this.http.post<any>(url,  task , header)
      .pipe(map(res => {
        return res;
      }));
  }

  getTasks(idGroup: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/task/getTasks/${idGroup}`

    return this.http.get<[Task]>(url, header);
  }
}
