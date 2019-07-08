import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  constructor(private apiService : ApiService,private router: Router) { }

  ngOnInit() {
    this.apiService.employeeList().subscribe((employees: Employee[])=>{this.employees = employees;console.log(this.employees);})
  }

  goToUpdate(id: number){
    this.router.navigateByUrl('/update-employee/' + id);
  }

  delete(id: number){
    this.apiService.deleteEmployee(id).subscribe(
      ()=>{
        this.apiService.employeeList().subscribe((employees: Employee[])=>{this.employees = employees;console.log(this.employees);})
      }
    );
  }
}
