import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  form: FormGroup;
  success = false;
  error = false;

  nameFocused = false;
  emailFocused = false;
  messageFocused = false;

  private apiUrl = '/api/contact.php';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      message: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5000)]],
      consent: [false, [Validators.requiredTrue]],
    });
  }

  get nameCtrl(): AbstractControl {
    return this.form.get('name')!;
  }
  get emailCtrl(): AbstractControl {
    return this.form.get('email')!;
  }
  get messageCtrl(): AbstractControl {
    return this.form.get('message')!;
  }

  onFocus(field: 'name' | 'email' | 'message') {
    if (field === 'name') this.nameFocused = true;
    if (field === 'email') this.emailFocused = true;
    if (field === 'message') this.messageFocused = true;
  }

  onBlur(field: 'name' | 'email' | 'message') {
    if (field === 'name') this.nameFocused = this.nameCtrl.invalid;
    if (field === 'email') this.emailFocused = this.emailCtrl.invalid;
    if (field === 'message') this.messageFocused = this.messageCtrl.invalid;
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    if (this.form.invalid) return;

    const payload = {
      name: this.nameCtrl.value,
      email: this.emailCtrl.value,
      message: this.messageCtrl.value,
      website: '',
    };

    try {
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      });
      const data: any = await res.json().catch(() => ({}));

      if (res.ok && data?.ok) {
        this.success = true;
        this.error = false;
        this.form.reset({ consent: false });
        this.nameFocused = this.emailFocused = this.messageFocused = false;
      } else {
        this.success = false;
        this.error = true;
      }
    } catch {
      this.success = false;
      this.error = true;
    }
  }
}
