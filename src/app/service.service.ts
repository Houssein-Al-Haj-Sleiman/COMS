import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './Admin';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  loggedIn: boolean = false;
  constructor(private http: HttpClient) {}
  BaseUrl = 'http://localhost/Angular/ISD/';

  submitDataStudents(jsonData: any, CourseCode: any): void {
    this.http
      .post(this.BaseUrl + 'StudentsUpload.php?C_ID=' + CourseCode, jsonData)
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log('Error:', error);
        }
      );
  }
  submitDataCourse(jsonData: any): void {
    this.http.post(this.BaseUrl + 'CourseUpload.php', jsonData).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  getAdmins() {
    return this.http.get<Admin[]>(this.BaseUrl + 'getAdmin.php');
  }

  getLoggedIn() {
    return this.loggedIn;
  }
  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  getDays() {
    return this.http.get(this.BaseUrl + 'getDays.php');
  }

  getTime() {
    return this.http.get(this.BaseUrl + 'getTime.php');
  }
}
