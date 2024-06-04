
import characterModel from '../models/character.model'
import { GAME_CONFIG } from '../const/config.const'
import { assetsLoader } from '../assetLoader'
import { Sprite, Texture } from 'pixi.js'

export class CharacterView {
  character!: Sprite
  texture!: Texture;
  constructor() {
    this.texture = assetsLoader.getTexture('character');
    this.character = new Sprite(this.texture);
    this.character.x = characterModel.x;
    this.character.y = characterModel.y;
    this.character.width = GAME_CONFIG.playerWidth;
    this.character.height = GAME_CONFIG.playerHeight;
  }

  render(): void {
    this.character.x = characterModel.x
    this.character.y = characterModel.y
  }
}
