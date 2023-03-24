import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private service: ServiceService) {}
  days: any;
  time: any;
  ngOnInit(): void {
    this.service.getDays().subscribe((result: any) => {
      this.days = result.output;
      // console.log(this.days);
    });
    this.service.getTime().subscribe((result: any) => {
      this.time = result.output;
      // console.log(this.time);
    });
  }
}
