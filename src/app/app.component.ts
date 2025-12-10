import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientFormComponent, ClientTableComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular & PrimeNG Sample Project';
  clients: any[] = [];

  constructor(private messageService: MessageService) {}

  onClientSubmitted(client: any): void {
    this.clients.push(client);
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
      this.clients.splice(index, 1);
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
      this.clients[event.index] = event.client;
      console.log('Client updated:', this.clients);
    }
  }
}
