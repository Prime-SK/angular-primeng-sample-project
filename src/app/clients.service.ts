import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  url = 'http://localhost:3000/clients';

  private http = inject(HttpClient);

  constructor() { }

  async getAllClients(): Promise<Client[]> {
    return firstValueFrom(this.http.get<Client[]>(this.url));
    // We use 'get<Client[]>' to tell Angular what data to expect.
    // 'firstValueFrom' converts the Angular Observable into the Promise your component expects.
    
    // const response = await fetch(this.url);
    // return response.json();
  }

  async createClient(client: Client): Promise<Client> {
    return firstValueFrom(this.http.post<Client>(this.url, client));
    // No need to manually set 'Content-Type' or JSON.stringify!
    // Angular handles that automatically.
    
    // const response = await fetch(this.url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(client)
    // });
    // return response.json();
  }

  async updateClient(id: number, client: Client): Promise<Client> {
    return firstValueFrom(this.http.put<Client>(`${this.url}/${id}`, client));
    // Similar to 'createClient', Angular manages headers and serialization.

    // const response = await fetch(`${this.url}/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(client)
    // });
    // return response.json();
  }

  async deleteClient(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.url}/${id}`));
    
    // await fetch(`${this.url}/${id}`, {
    //   method: 'DELETE'
    // });
  }
}
