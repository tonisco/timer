import { Component } from '@angular/core';
import { TimezoneService } from 'src/app/services/timezone.service';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { zonesData } from 'src/app/data/zones';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.css'],
})
export class TimezoneComponent {
  zone = '';
  subscription: Subscription;

  timeZones = zonesData;

  constructor(private timezoneService: TimezoneService) {
    this.subscription = this.timezoneService
      .onChange()
      .subscribe((val) => (this.zone = val));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.zone = this.timezoneService.getTimezone();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  changeZone(e: MatSelectChange) {
    // console.log(val);
    console.log(e.value);
    this.zone = e.value;
    this.timezoneService.changeZone(e.value);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const val = document.querySelector(
    '.timezone > div > div.mat-mdc-select-arrow-wrapper.ng-tns-c3393473648-0'
  ) as HTMLElement;
  if (val) {
    val.style.display = 'none';
  }
});
