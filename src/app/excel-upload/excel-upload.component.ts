import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css'],
})
export class ExcelUploadComponent implements OnInit {
  constructor(private service: ServiceService) {}

  ngOnInit(): void {}

  StdData: any;
  StdRange = 'B9:M999';
  CRange = 'D2:G8';
  Students!: string;
  Course!: string;
  CourseData: any;
  CourseArray: any[] = [];
  CourseCode: any;

  fileUploadStd(event: any) {
    this.fileUploadCourse(event);

    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
          range: this.StdRange,
        });
        this.StdData = data;
        // this.Json_file = data;
        this.Students = JSON.stringify(data, undefined, 4);
      });
    };
  }

  fileUploadCourse(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        const data: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
          range: this.CRange,
          header: 'A',
        });
        // this.CourseData = data;
        //this.Course = JSON.stringify(data, undefined, 4);
        this.CourseArray = data.map((item: { D: any }) => item.D);
        this.Course = JSON.stringify(this.CourseArray, undefined, 4);
        this.CourseCode = this.CourseArray[2];
      });
    };
  }

  Upload() {
    this.service.submitDataStudents(this.Students, this.CourseCode);
    this.service.submitDataCourse(this.Course);
  }
}
