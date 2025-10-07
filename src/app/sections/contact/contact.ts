import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
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

  onSubmit(ev: Event) {
    ev.preventDefault();
    if (this.form.valid) {
      return;
    }
    const order: Array<[AbstractControl, ElementRef | undefined]> = [
      [this.nameCtrl, this.nameEl],
      [this.emailCtrl, this.emailEl],
      [this.messageCtrl, this.msgEl],
      [this.consentCtrl, undefined],
    ];
    for (const [ctrl, el] of order) {
      if (ctrl.invalid) {
        if (el?.nativeElement) el.nativeElement.focus();
        break;
      }
    }
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
}
