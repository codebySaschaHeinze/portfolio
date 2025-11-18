import { Component } from '@angular/core';
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

/**
 * Shape of the payload sent to the contact API.
 */
interface ContactPayload {
  name: string;
  email: string;
  message: string;
  website: string;
}

/**
 * Validates that the email domain part (after "@") contains at least one dot.
 * Used as an additional safeguard on top of the default Angular email validator.
 */
const dotAfterAtValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = String(control.value || '').trim();
  if (!value) return null;
  const atIndex = value.indexOf('@');
  if (atIndex < 0) return null;
  const domain = value.slice(atIndex + 1);
  return domain.includes('.') ? null : { dotAfterAt: true };
};

/**
 * Validates that the name contains at least two words
 * and each word has at least two alphabetic characters.
 */
const fullNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = String(control.value || '').trim();
  if (!value) return null;
  const words = value.split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return { fullName: true };
  }
  const wordPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ'-]{2,}$/;
  const allValid = words.every((word) => wordPattern.test(word));
  return allValid ? null : { fullName: true };
};

/**
 * Contact component providing a localized contact form
 * with client-side validation and submission to a backend API.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  readonly form: FormGroup;
  success = false;
  error = false;
  nameFocused = false;
  emailFocused = false;
  messageFocused = false;
  private readonly apiUrl = '/api/contact.php';

  /**
   * Initializes the contact form with validation rules.
   * @param fb FormBuilder instance used to construct the form group.
   */
  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120), fullNameValidator]],
      email: [
        '',
        [Validators.required, Validators.email, dotAfterAtValidator, Validators.maxLength(254)],
      ],
      message: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5000)]],
      consent: [false, [Validators.requiredTrue]],
    });
  }

  /**
   * Returns the AbstractControl instance for the name field.
   */
  get nameCtrl(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  /**
   * Returns the AbstractControl instance for the email field.
   */
  get emailCtrl(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }

  /**
   * Returns the AbstractControl instance for the message field.
   */
  get messageCtrl(): AbstractControl {
    return this.form.get('message') as AbstractControl;
  }

  /**
   * Handles focus events on form fields to control
   * when validation feedback is displayed.
   * @param field Name of the field that received focus.
   */
  onFocus(field: 'name' | 'email' | 'message'): void {
    if (field === 'name') this.nameFocused = true;
    if (field === 'email') this.emailFocused = true;
    if (field === 'message') this.messageFocused = true;
  }

  /**
   * Handles blur events on form fields and keeps focus flags
   * active only when the corresponding control is invalid.
   * @param field Name of the field that lost focus.
   */
  onBlur(field: 'name' | 'email' | 'message'): void {
    if (field === 'name') this.nameFocused = this.nameCtrl.invalid;
    if (field === 'email') this.emailFocused = this.emailCtrl.invalid;
    if (field === 'message') this.messageFocused = this.messageCtrl.invalid;
  }

  /**
   * Submits the contact form data to the backend API.
   * @param event Submit event triggered by the form element.
   */
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.form.invalid) return;
    const payload = this.buildPayload();
    await this.sendContactRequest(payload);
  }

  /**
   * Builds the payload object from the current form values.
   */
  private buildPayload(): ContactPayload {
    return {
      name: String(this.nameCtrl.value ?? ''),
      email: String(this.emailCtrl.value ?? ''),
      message: String(this.messageCtrl.value ?? ''),
      website: '',
    };
  }

  /**
   * Sends the contact request to the backend API and
   * updates the component state based on the response.
   * @param payload Data to be sent to the contact endpoint.
   */
  private async sendContactRequest(payload: ContactPayload): Promise<void> {
    try {
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      });
      const data = await this.parseResponse(res);
      if (this.isSuccessResponse(res, data)) {
        this.handleSuccess();
      } else {
        this.handleError();
      }
    } catch {
      this.handleError();
    }
  }

  /**
   * Safely parses the response body as JSON.
   * @param res Fetch response returned by the API.
   */
  private async parseResponse(res: Response): Promise<unknown> {
    try {
      return await res.json();
    } catch {
      return {};
    }
  }

  /**
   * Determines whether the API response indicates success.
   * @param res Fetch response returned by the API.
   * @param data Parsed JSON payload returned by the API.
   */
  private isSuccessResponse(res: Response, data: unknown): boolean {
    return res.ok && typeof data === 'object' && data !== null && (data as any).ok;
  }

  /**
   * Handles a successful contact submission by
   * resetting the form and updating UI state flags.
   */
  private handleSuccess(): void {
    this.success = true;
    this.error = false;
    this.form.reset({ consent: false });
    this.nameFocused = false;
    this.emailFocused = false;
    this.messageFocused = false;
  }

  /**
   * Handles an unsuccessful contact submission by
   * updating the error-related UI state flags.
   */
  private handleError(): void {
    this.success = false;
    this.error = true;
  }
}
