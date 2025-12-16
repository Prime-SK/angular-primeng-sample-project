import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { MessageService } from 'primeng/api';
import { ClientsService } from './clients.service';
import { Client } from './client';
import { PrimeNgSharedModule } from './shared/primeng-shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ClientFormComponent,
    ClientTableComponent,
    PrimeNgSharedModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Angular & PrimeNG Sample Project';
  clients: Client[] = [];

  // The New Way: Inject services as properties
  private messageService = inject(MessageService);
  private clientsService = inject(ClientsService);

  async ngOnInit(): Promise<void> {
    await this.loadClients();
  }

  async loadClients(): Promise<void> {
    try {
      this.clients = await this.clientsService.getAllClients();
      console.log('Clients loaded:', this.clients);
    } catch (error) {
      console.error('Error loading clients:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load clients from server',
        life: 3000
      });
    }
  }

  async onClientSubmitted(client: Client): Promise<void> {
    try {
      const newClient = await this.clientsService.createClient(client);
      this.clients = [...this.clients, newClient];
      console.log('All Clients:', this.clients);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Client record saved successfully',
        life: 3000
      });
    } catch (error) {
      console.error('Error creating client:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to save client record',
        life: 3000
      });
    }
  }

  async onClientDeleted(index: number): Promise<void> {
    if (index >= 0 && index < this.clients.length) {
      const client = this.clients[index];
      if (client.id) {
        try {
          await this.clientsService.deleteClient(client.id);
          this.clients = this.clients.filter((_, i) => i !== index);
          console.log('Client deleted. Remaining clients:', this.clients);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Client record deleted successfully',
            life: 3000
          });
        } catch (error) {
          console.error('Error deleting client:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete client record',
            life: 3000
          });
        }
      }
    }
  }

  async onClientUpdated(event: { index: number; client: Client }): Promise<void> {
    if (event.index >= 0 && event.index < this.clients.length) {
      const existingClient = this.clients[event.index];
      if (existingClient.id) {
        try {
          const updatedClient = await this.clientsService.updateClient(existingClient.id, event.client);
          this.clients = this.clients.map((c, i) => i === event.index ? updatedClient : c);
          console.log('Client updated:', this.clients);
        } catch (error) {
          console.error('Error updating client:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update client record',
            life: 3000
          });
        }
      }
    }
  }
}
