import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';

interface ClientType {
  label: string;
  value: string;
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
    ButtonModule,
    CardModule,
    InputNumberModule
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  clientTypes: ClientType[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeClientTypes();
  }

  initializeForm(): void {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      bankBalance: [0, [Validators.required, Validators.min(0)]],
      outstandingLoan: [0, [Validators.required, Validators.min(0)]],
      clientType: [null, Validators.required],
      isActive: [false],
      registrationDate: [new Date(), Validators.required]
    });
  }

  initializeClientTypes(): void {
    this.clientTypes = [
      { label: 'Individual', value: 'individual' },
      { label: 'Business', value: 'business' }
    ];
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      console.log('Form Submitted:', this.clientForm.value);
      // Handle form submission logic here
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.clientForm);
    }
  }

  onReset(): void {
    this.clientForm.reset({
      bankBalance: 0,
      outstandingLoan: 0,
      isActive: false,
      registrationDate: new Date()
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get f() {
    return this.clientForm.controls;
  }
}
