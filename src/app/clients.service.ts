import { Injectable } from '@angular/core';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  url = 'http://localhost:3000/clients';
  constructor() { }

  async getAllClients(): Promise<Client[]> {
    const response = await fetch(this.url);
    return response.json();
  }
}
