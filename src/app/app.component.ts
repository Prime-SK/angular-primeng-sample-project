import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ClientsService } from './clients.service';
import { Client } from './client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ClientFormComponent, 
    ClientTableComponent, 
    ToastModule
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

  // 2. The New Way: Inject services as properties
  private messageService = inject(MessageService);
  private clientsService = inject(ClientsService);

  constructor() {}

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

  onClientSubmitted(client: any): void {
    this.clients = [...this.clients, client];
    console.log('All Clients:', this.clients);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Client record saved successfully',
      life: 3000
    });
  }

  onClientDeleted(index: number): void {
    if (index >= 0 && index < this.clients.length) {
      this.clients = this.clients.filter((_, i) => i !== index);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Client record deleted successfully',
        life: 3000
      });
    }
  }

  onClientUpdated(event: { index: number; client: any }): void {
    if (event.index >= 0 && event.index < this.clients.length) {
      this.clients = this.clients.map((c, i) => i === event.index ? event.client : c);
      console.log('Client updated:', this.clients);
    }
  }
}
