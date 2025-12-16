import { Component, input, output, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from '../../client';
import { ClientType } from '../../client-type';
import { PrimeNgSharedModule } from '../../shared/primeng-shared.module';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgSharedModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent {
  clientEntries = input<Client[]>([]);
  clientDeleted = output<number>();
  clientUpdated = output<{ index: number; client: Client }>();
  // @Input() clientEntries: Client[] = [];
  // @Output() clientDeleted = new EventEmitter<number>();
  // @Output() clientUpdated = new EventEmitter<{ index: number; client: Client }>();

  displayEditDialog = false;
  editingIndex: number | null = null;
  editingClientId: number | undefined;

  clientTypes: ClientType[] = [
    {
      label: 'Individual',
      value: 'Individual'
    },
    {
      label: 'Business',
      value: 'Business'
    }
  ];

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^(?!\s+$)[A-Za-z\s]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0][7][0-9]{8}$')]),
    bankBalance: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    outstandingLoan: new FormControl<number | null>(null, [Validators.min(0)]),
    clientType: new FormControl<string | null>(null, [Validators.required]),
    isActive: new FormControl(false),
    registrationDate: new FormControl<Date | null>(null, [Validators.required])
  });

  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  onEdit(client: Client, index: number): void {
    this.editingIndex = index;
    this.editingClientId = client.id;
    this.editForm.patchValue({
      name: client.name,
      email: client.email,
      phone: client.phone,
      bankBalance: client.bankBalance,
      outstandingLoan: client.outstandingLoan,
      clientType: client.clientType,
      isActive: client.isActive,
      registrationDate: client.registrationDate ? new Date(client.registrationDate) : null
    });
    this.displayEditDialog = true;
  }

  confirmDelete(event: Event, index: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      accept: () => {
        this.clientDeleted.emit(index);
      },
      reject: () => {
        // Optional: User clicked cancel
        // this.messageService.add({ 
        //     severity: 'info', 
        //     summary: 'Cancelled', 
        //     detail: 'Delete cancelled', 
        //     life: 3000 
        // });
      }
    });
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingIndex !== null) {
      const updatedClient: Client = {
        ...this.editForm.value as Client,
        id: this.editingClientId
      };
      this.clientUpdated.emit({ index: this.editingIndex, client: updatedClient });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Client record updated successfully',
        life: 3000
      });
      this.displayEditDialog = false;
      this.editingIndex = null;
      this.editingClientId = undefined;
    }
  }

  cancelEdit(): void {
    this.displayEditDialog = false;
    this.editingIndex = null;
    this.editingClientId = undefined;
    this.editForm.reset();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.editForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.editForm.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }
    if (control.errors['pattern']) {
      if (fieldName === 'name') {
        return 'Cannot contain numbers or special characters';
      }
      if (fieldName === 'phone') {
        return 'Must begin with 07 and be exactly 10 digits';
      }
    }
    if (control.errors['min']) {
      return `${this.getFieldLabel(fieldName)} must be a positive number`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      bankBalance: 'Bank Balance',
      outstandingLoan: 'Outstanding Loan',
      clientType: 'Client Type',
      registrationDate: 'Registration Date'
    };
    return labels[fieldName] || fieldName;
  }
}
