import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MapService {
  getAvailableWorlds() {
    return [
      { id: 1, name: 'Crazy Forest', unlocked: true },
      { id: 2, name: 'Mundo 2', unlocked: false },
      { id: 3, name: 'Mundo 3', unlocked: false },
    ];
  }
}
