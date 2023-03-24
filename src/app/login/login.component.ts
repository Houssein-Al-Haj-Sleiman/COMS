import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formdata: any;
  Admins: any;
  grantLogin: boolean = false;
  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.formdata = new FormGroup({
      ID: new FormControl(),
      Password: new FormControl(),
    });
    this.service.getAdmins().subscribe((result: any) => {
      this.Admins = result.output;
      console.log(result);
    });
  }
  onClickSubmit(data: any) {
    for (let i of this.Admins) {
      if (i.ID == data.ID && i.Password == data.Password) {
        this.grantLogin = true;
        break;
      }
      this.grantLogin = false;
    }
    if (this.grantLogin) {
      this.service.setLoggedIn(true);
      this.router.navigate(['/Add/Instructor']);
    } else {
      alert('no user found');
    }
  }
}
