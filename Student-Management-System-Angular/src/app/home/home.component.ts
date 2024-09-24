import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teachers: any[] = [];

  constructor(private service: HomeService) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.service.getAllTeachers().subscribe((res) => {
      console.log(res);
      this.teachers = res;
    })
  }

}
