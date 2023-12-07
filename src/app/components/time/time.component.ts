import { Component } from '@angular/core';
import { TimezoneService } from 'src/app/services/timezone.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent {
  timeInterval = 0;
  time: Date | string = '  :  :  ';
  subscription: Subscription;
  timeZone = '';

  setTime() {
    this.time = new Date().toLocaleTimeString('en-GB', {
      timeZone: this.timeZone,
      hour12: true,
    });
  }

  constructor(private timezoneService: TimezoneService) {
    this.subscription = this.timezoneService.onChange().subscribe((val) => {
      this.timeZone = val;
      this.setTime();
    });

    this.timeInterval = window.setInterval(() => this.setTime(), 1000);
  }

  ngOnInit(): void {
    this.timeZone = this.timezoneService.getTimezone();
    this.setTime();
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }

    this.subscription.unsubscribe();
  }
}
