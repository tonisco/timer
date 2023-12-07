import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimezoneService {
  private currTimeZone: string =
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  private subject = new Subject();

  constructor() {}

  changeZone(val: string): void {
    this.currTimeZone = val;
    this.subject.next(this.currTimeZone);
  }

  getTimezone(): string {
    return this.currTimeZone;
  }

  onChange(): Observable<any> {
    return this.subject.asObservable();
  }
}
