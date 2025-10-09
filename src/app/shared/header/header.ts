import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LangService } from '../../services/lang-service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private lang: LangService) {}

  is(l: 'de' | 'en') {
    return this.lang.get() === l;
  }

  set(e: Event, l: 'de' | 'en') {
    e.preventDefault();
    this.lang.set(l);
  }
  isOverlayOpen = false;

  toggleOverlay() {
    this.isOverlayOpen = !this.isOverlayOpen;
  }

  closeOverlay() {
    this.isOverlayOpen = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }
}
