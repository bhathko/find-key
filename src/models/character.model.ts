import { GAME_CONFIG } from '../const/config.const'

export class CharacterModel {
  public x: number
  public y: number
  public speed: number

  constructor(x?: number, y?: number) {
    this.x = x || 0
    this.y = y || 0
    this.speed = GAME_CONFIG.playerSpeed
  }
}

const characterModel = new CharacterModel()

export default characterModel
