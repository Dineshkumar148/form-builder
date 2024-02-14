import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { FilterPipe } from "../filter.pipe";

@Component({
    selector: 'app-create-client',
    standalone: true,
    templateUrl: './create-client.component.html',
    styleUrl: './create-client.component.css',
    imports: [CommonModule, ReactiveFormsModule, FilterPipe]
})
export class CreateClientComponent {
  #service = inject(ServiceService);
  clientformgroup: FormGroup;
  usersArray: any[] = [];
  searchtext: any;
  constructor(private formbuilder: FormBuilder, private http: HttpClient) {
    this.clientformgroup = this.formbuilder.group({
      id: ['0'],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]+')]],
      websites: ['', [Validators.required]]
    })
    this.getuserlist(); 
    // this.getalluser();
  }

  // getalluser() {
  //   this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((res: any) => {
  //     this.usersArray = res;
  //   })
  // }
  // saveuser() {
  //   const obj = this.clientformgroup.value;
  //   this.http.post("https://jsonplaceholder.typicode.com/users", obj).subscribe((res: any) => {
  //     alert('user created');
  //   })
  //   console.log(this.clientformgroup.value);
  // }
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

  createclient() {
    const clientcreatedata = this.clientformgroup.value;
    this.#service.createclient(clientcreatedata).subscribe((res: any) => {
      console.log(res);
    })
  }

  getuserlist() {
    this.#service.getclient().subscribe((res: any) => {
      this.usersArray = res;
    })
  }

  searchName(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    if (!searchText) {
      this.getuserlist();
    } else {
      this.usersArray = this.usersArray.filter(user => {
        return user.name.toLowerCase().includes(searchText.toLowerCase());
      });
    }
  }
  
  searchPhone(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    if (!searchText) {
      this.getuserlist();
    } else {
      this.usersArray = this.usersArray.filter(user => {
        return user.phone.toLowerCase().includes(searchText.toLowerCase());
      });
    }
  }
  

  // search(){
  //   if (this.name == "") {
  //     this.getuserlist();
      
  //   }else{
  //     this.usersArray = this.usersArray.filter(res =>{
  //       return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
  //     });
  //   }
  // }
}
