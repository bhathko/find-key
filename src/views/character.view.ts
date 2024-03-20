import * as PIXI from 'pixi.js';
import characterModel from '../models/character.model';


export class CharacterView {
  character: PIXI.Graphics;
  constructor() {
    this.character = new PIXI.Graphics();
    this.character.beginFill(0xFFFFFF);
    this.character.drawRect(0, 0, 100, 100);
    this.character.endFill();
    this.character.x = characterModel.x;
    this.character.y = characterModel.y;
  }

  render(): void {
    this.character.x = characterModel.x;
    this.character.y = characterModel.y;
  }

}