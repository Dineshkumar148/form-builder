import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  #http = inject(HttpClient)
  constructor() { }

  // createclient(clientcreatedata: any) {
  //   return this.#http.post("https://jsonplaceholder.typicode.com/users", clientcreatedata)
  // }

  // getclient() {
  //   return this.#http.get("https://jsonplaceholder.typicode.com/users")
  // }

  createclient(clientcreatedata: any) {
    return this.#http.post("assets/client.json", clientcreatedata)
  }

  getclient() {
    return this.#http.get("assets/client.json")
  }
}



