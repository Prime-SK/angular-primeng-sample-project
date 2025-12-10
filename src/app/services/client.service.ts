import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Client {
  name: string | null;
  email: string | null;
  phone: string | null;
  bankBalance: number | null;
  outstandingLoan: number | null;
  clientType: null | string;
  registrationDate: Date | null;
  isActive: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsSubject = new BehaviorSubject<Client[]>([]);
  public clients$ = this.clientsSubject.asObservable();

  getClients(): Client[] {
    return this.clientsSubject.value;
  }

  addClient(client: Client): void {
    const currentClients = this.clientsSubject.value;
    this.clientsSubject.next([...currentClients, client]);
  }

  setClients(clients: Client[]): void {
    this.clientsSubject.next(clients);
  }
}
