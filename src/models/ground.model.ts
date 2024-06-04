import { GAME_CONFIG } from '../const/config.const'

export class GroundModel {
  public x: number
  public y: number
  public isFakeGround: boolean = false
  public isKey: boolean = false
  public isDoor: boolean = false
  constructor(x: number, y: number, isFakeGround: boolean, isKey: boolean, isDoor: boolean) {
    this.x = GAME_CONFIG.groundWidth * x
    this.y = GAME_CONFIG.groundHeight * y
    this.isFakeGround = isFakeGround
    this.isKey = isKey
    this.isDoor = isDoor
  }
}
