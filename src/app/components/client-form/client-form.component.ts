import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';

interface ClientType {
  label: string;
  value: string;
}

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

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    CalendarModule,
    DatePickerModule,
    ButtonModule,
    CardModule,
    InputNumberModule,
    FloatLabelModule,
    SelectModule,
    ToastModule,
    KeyFilterModule
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {
  @Output() clientSubmitted = new EventEmitter<Client>();

  clientTypes: ClientType[] = [
    { label: 'Individual', value: 'Individual' },
    { label: 'Business', value: 'Business' }
  ];

  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^(?!\s+$)[A-Za-z\s]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0][7][0-9]{8}$')]),
    bankBalance: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    outstandingLoan: new FormControl<number | null>(null, [Validators.min(0)]),
    clientType: new FormControl<string | null>(null, [Validators.required]),
    isActive: new FormControl(false),
    registrationDate: new FormControl<Date | null>(null, [Validators.required])
  });

  handleFormSubmit() {
    if (this.clientForm.valid) {
      this.clientSubmitted.emit(this.clientForm.value as Client);
      console.log('Form Submitted:', this.clientForm.value);
      this.handleReset();
    }
  }

  handleReset() {
    this.clientForm.reset({
      isActive: false,
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.clientForm.get(fieldName);
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

  isFieldInvalid(fieldName: string): boolean {
    const control = this.clientForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }
}
