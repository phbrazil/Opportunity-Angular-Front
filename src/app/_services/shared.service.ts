import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class SharedService {

  private shared = new BehaviorSubject<boolean>(false);

  constructor() {

  }

  public setStatus(status: boolean): void {
    this.shared.next(status);
  }

  public getStatus(): Observable<boolean> {
    return this.shared.asObservable();
  }
}
