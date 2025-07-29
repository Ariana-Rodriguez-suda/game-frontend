import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-level-1',
  templateUrl: './level-1.component.html',
  styleUrls: ['./level-1.component.scss'],
  imports: [ CommonModule ],
  standalone: true
})
export class Level1Component implements OnInit {
  showIntro = true;

  playerX = 100;
  playerY = 400;
  velocityY = 0;
  isJumping = false;

  blockX = 200;
  blockY = 400;

  gravity = 2;

  get playerStyle() {
    return {
      left: `${this.playerX}px`,
      bottom: `${this.playerY}px`
    };
  }

  get blockStyle() {
    return {
      left: `${this.blockX}px`,
      bottom: `${this.blockY}px`
    };
  }

  ngOnInit() {
    setInterval(() => this.updatePhysics(), 30);
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(e: KeyboardEvent) {
    if (this.showIntro && (e.key === 'Enter' || e.key === ' ')) {
      this.hideIntro();
      return;
    }

    if (e.key === 'ArrowRight') this.playerX += 10;
    if (e.key === 'ArrowLeft') this.playerX -= 10;

    if (e.key === ' ' && !this.isJumping) {
      this.velocityY = 20;
      this.isJumping = true;
    }

    if (e.key === 'e' || e.key === 'E') this.tryPushBlock();
  }

  hideIntro() {
    this.showIntro = false;
  }

  tryPushBlock() {
    const distance = Math.abs(this.playerX - this.blockX);
    if (distance < 70) {
      this.blockX += 64;
    }
  }

  updatePhysics() {
    // gravedad
    if (this.playerY > 0) {
      this.velocityY -= this.gravity;
      this.playerY += this.velocityY;
    }

    if (this.playerY <= 0) {
      this.playerY = 0;
      this.velocityY = 0;
      this.isJumping = false;
    }

    // caída al agujero
    if (
      this.playerX > 300 &&
      this.playerX < 364 &&
      this.playerY === 0 &&
      !(this.blockX === 300)
    ) {
      this.respawn();
    }
  }

  respawn() {
    this.playerX = 100;
    this.playerY = 400;
  }
}
