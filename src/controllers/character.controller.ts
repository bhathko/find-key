import { GAME_CONFIG } from '../const/config.const'
import { GROUND_MAP } from '../const/ground.const'
import characterModel from '../models/character.model'

export class CharacterController {
  constructor() {}

  moveUp(): void {
    if (characterModel.y <= 1) return
    characterModel.y -= characterModel.speed
  }

  moveDown(): void {
    if (characterModel.y >= GROUND_MAP.length * GAME_CONFIG.groundHeight - GAME_CONFIG.playerHeight) return
    characterModel.y += characterModel.speed
  }

  moveLeft(): void {
    if (characterModel.x <= 1) return
    characterModel.x -= characterModel.speed
  }

  moveRight(): void {
    if (characterModel.x >= GROUND_MAP[0].length * GAME_CONFIG.groundWidth - GAME_CONFIG.playerWidth) return
    characterModel.x += characterModel.speed
  }

  resetToDefaultPosition(): void {
    characterModel.x = 1;
    characterModel.y = 1;
  }

  get position(): { x: number; y: number } {
    return { x: characterModel.x, y: characterModel.y }
  }
}
