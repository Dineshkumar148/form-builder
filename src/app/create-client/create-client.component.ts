import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {

  clientformgroup: FormGroup;
  usersArray: any[] = [];
  constructor(private formbuilder: FormBuilder, private http: HttpClient) {
    this.clientformgroup = this.formbuilder.group({
      id: ['0'],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      website: ['', [Validators.required]]
    })
    this.getalluser();
  }

  getalluser() {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
      this.usersArray = res;
    })
  }
  saveuser() {
    const obj = this.clientformgroup.value;
    this.http.post("https://jsonplaceholder.typicode.com/users", obj).subscribe((res: any) => {
      alert('user created')
    })
    console.log(this.clientformgroup.value);
  }
  // editclient(id: number) {
  //   this.http.get("https://jsonplaceholder.typicode.com/users" + id).subscribe((res: any) => {
  //     this.clientformgroup = new FormGroup({
  //       id: (res.id),
  //       name: (res.name),
  //       email: (res.email),
  //       phone: (res.phone),
  //       website: (res.website)
  //     })
  //   })
  // }

}
