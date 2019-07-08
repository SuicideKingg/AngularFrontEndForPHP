import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1/AngularPHPCrud/front-end2/back-end";
  constructor(private httpClient : HttpClient) { 

  }

  employeeList() : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.PHP_API_SERVER}/api/employeelist.php`);
  }

  addEmployee(employee : Employee) : Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.PHP_API_SERVER}/api/insert.php`,employee);
  }

  getEmployee(id: number) : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.PHP_API_SERVER}/api/getEmployee.php?id=${id}`);
  }

  updateEmployee(employee : Employee){
    return this.httpClient.put<Employee>(`${this.PHP_API_SERVER}/api/update.php`,employee);
  }

  deleteEmployee(id : number){
    return this.httpClient.delete<Employee>(`${this.PHP_API_SERVER}/api/delete.php/?ID=${id}`);
  }

}
