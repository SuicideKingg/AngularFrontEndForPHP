import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Employee } from '../Employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder, private WebService: ApiService, private router: Router) { }

  employeeForm = this.fb.group(
    {
      EmployeeName: ['', Validators.required],
      EmployeeAddress: ['', Validators.required],
      Position: ['', Validators.required]
    }
  );

  public disabled: boolean = false;

  ngOnInit() {

  }

  onSubmit(){
    if(this.employeeForm.status === "VALID"){
      this.WebService.addEmployee(this.employeeForm.value).subscribe((employee : Employee)=>{
        console.log("Inserted : " + this.employeeForm)
        this.router.navigateByUrl('/employee-list');
      });
    }
    else{
      console.log("Invalid : " + this.employeeForm);
    }
  }

}
