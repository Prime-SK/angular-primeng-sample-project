import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TagModule } from 'primeng/tag';
import { Client } from '../../client';
import { ClientType } from '../../client-type';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    CheckboxModule,
    DatePickerModule,
    InputNumberModule,
    FloatLabelModule,
    TagModule
  ],
  providers: [MessageService],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent {
  @Input() clientEntries: Client[] = [];
  @Output() clientDeleted = new EventEmitter<number>();
  @Output() clientUpdated = new EventEmitter<{ index: number; client: Client }>();

  displayEditDialog = false;
  editingIndex: number | null = null;

  clientTypes: ClientType[] = [
    { label: 'Individual', value: 'Individual' },
    { label: 'Business', value: 'Business' }
  ];

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    bankBalance: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    outstandingLoan: new FormControl<number | null>(null, [Validators.min(0)]),
    clientType: new FormControl<string | null>(null, [Validators.required]),
    isActive: new FormControl(false),
    registrationDate: new FormControl<Date | null>(new Date(), [Validators.required])
  });

  constructor(private messageService: MessageService) {}

  onEdit(client: Client, index: number): void {
    this.editingIndex = index;
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

  onDelete(index: number): void {
    this.clientDeleted.emit(index);
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingIndex !== null) {
      const updatedClient = this.editForm.value as Client;
      this.clientUpdated.emit({ index: this.editingIndex, client: updatedClient });
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Client record updated successfully',
        life: 3000
      });
      this.displayEditDialog = false;
      this.editingIndex = null;
    }
  }

  cancelEdit(): void {
    this.displayEditDialog = false;
    this.editingIndex = null;
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
      if (fieldName === 'phone') {
        return 'Phone number must be exactly 10 digits';
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
