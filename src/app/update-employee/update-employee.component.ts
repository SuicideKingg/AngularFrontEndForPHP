import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Employee } from '../Employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee;

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private WebService: ApiService, private router: Router) { }

  employeeForm = this.fb.group(
    {
      ID:[0,Validators.required],
      EmployeeName: ['', Validators.required],
      EmployeeAddress: ['', Validators.required],
      Position: ['', Validators.required]
    }
  );

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.WebService.getEmployee(this.id).subscribe((employee: Employee[])=>{
      this.employee = employee[0];
      console.log(this.employee);
      this.onFinish();
    });
  }

  onSubmit(){
    if(this.employeeForm.status === "VALID"){
      this.WebService.updateEmployee(this.employeeForm.value).subscribe((employee : Employee)=>{
        console.log("Updated : " + this.employeeForm)
        this.router.navigateByUrl('/employee-list');
      });
    }
    else{
      console.log("Invalid : " + this.employeeForm);
    }
  }

  onFinish(){
    this.employeeForm = this.fb.group(
      {
        ID:[this.employee.ID,Validators.required],
        EmployeeName: [this.employee.EmployeeName, Validators.required],
        EmployeeAddress: [this.employee.EmployeeAddress, Validators.required],
        Position: [this.employee.Position, Validators.required]
      }
    );
  }

}
