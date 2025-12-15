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

  async createClient(client: Client): Promise<Client> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
    });
    return response.json();
  }

  async updateClient(id: number, client: Client): Promise<Client> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(client)
    });
    return response.json();
  }

  async deleteClient(id: number): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    });
  }
}
