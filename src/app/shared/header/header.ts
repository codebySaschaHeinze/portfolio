import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LangService } from '../../services/lang-service';

/**
 * Header component responsible for language switching,
 * displaying the navigation header, and controlling the
 * mobile navigation overlay.
 */
@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isOverlayOpen = false;

  /**
   * Injects the language service used to get and set the active language.
   * @param lang Service providing the current language state.
   */
  constructor(private readonly lang: LangService) {}

  /**
   * Sets the active language without modifying the overlay state.
   * @param event Click event from the language switch control.
   * @param l Language code to be set as active.
   */
  setLang(event: Event, l: 'de' | 'en'): void {
    event.preventDefault();
    this.lang.set(l);
  }
  /**
   * Checks whether the given language is currently active.
   * @param l Language code to compare against the active language.
   * @returns True if the given language is active, otherwise false.
   */
  is(l: 'de' | 'en'): boolean {
    return this.lang.get() === l;
  }

  /**
   * Sets the active language and closes the mobile overlay.
   * @param event Click event from the language switch control.
   * @param l Language code to be set as active.
   */
  setLangAndClose(event: Event, l: 'de' | 'en'): void {
    event.preventDefault();
    this.lang.set(l);
    this.closeOverlay();
  }

  /**
   * Toggles the visibility state of the mobile navigation overlay.
   */
  toggleOverlay(): void {
    this.isOverlayOpen = !this.isOverlayOpen;
  }

  /**
   * Closes the mobile navigation overlay.
   */
  closeOverlay(): void {
    this.isOverlayOpen = false;
  }

  /**
   * Handles global keydown events and closes the overlay
   * when the Escape key is pressed.
   * @param event Keyboard event dispatched on the window object.
   */
  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }
}
