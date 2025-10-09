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

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required, this.nameValidator()]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, this.messageValidator()]],
    consent: [false, [Validators.requiredTrue]],
  });

  nameFocused = false;
  emailFocused = false;
  messageFocused = false;

  @ViewChild('nameInput') nameEl!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailEl!: ElementRef<HTMLInputElement>;
  @ViewChild('msgInput') msgEl!: ElementRef<HTMLTextAreaElement>;

  get nameCtrl() {
    return this.form.controls.name;
  }
  get emailCtrl() {
    return this.form.controls.email;
  }
  get messageCtrl() {
    return this.form.controls.message;
  }
  get consentCtrl() {
    return this.form.controls.consent;
  }

  onFocus(field: 'name' | 'email' | 'message') {
    this[`${field}Focused`] = true;
  }
  onBlur(field: 'name' | 'email' | 'message') {
    this[`${field}Focused`] = false;
  }

  private nameValidator(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const v = String(c.value || '')
        .trim()
        .replace(/\s+/g, ' ');
      const parts = v.split(' ').filter(Boolean);
      if (parts.length < 2) return { name: true };
      const allowedWord = /^[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß'-]*$/;
      for (const w of parts) {
        const letters = w.replace(/[^A-Za-zÄÖÜäöüß]/g, '');
        if (letters.length < 2 || !allowedWord.test(w)) return { name: true };
      }
      return null;
    };
  }

  private messageValidator(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const v = String(c.value || '').trim();
      return /[A-Za-zÄÖÜäöüß]/.test(v) ? null : { msg: true };
    };
  }

  sending = false;
  success = false;
  error = false;

  async onSubmit(ev: Event) {
    if (!this.form.valid) {
      ev.preventDefault();
      return;
    }

    ev.preventDefault();
    this.sending = true;
    this.success = false;
    this.error = false;

    try {
      const formEl = ev.target as HTMLFormElement;
      const data = new FormData(formEl);

      const res = await fetch(formEl.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        this.success = true;
        this.form.reset();
        formEl.reset();
      } else {
        this.error = true;
      }
    } catch {
      this.error = true;
    } finally {
      this.sending = false;
    }
  }
}
