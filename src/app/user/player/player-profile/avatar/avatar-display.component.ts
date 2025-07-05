// avatar-display.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `<img [src]="avatarUrl" alt="avatar" width="80" height="80" />`,
})
export class AvatarDisplayComponent {
  @Input() avatarUrl: string = 'assets/avatars/default.png';
}
