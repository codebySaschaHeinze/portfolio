import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
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
