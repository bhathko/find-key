import { Sprite, Texture } from 'pixi.js'
import { KeyModel } from '../models/key.model'
import { assetsLoader } from '../assetLoader'

export class KeyView {
  private key: KeyModel
  private texture!: Texture
  keyView!: Sprite
  constructor(key: KeyModel) {
    this.key = key
    this.texture = assetsLoader.getTexture('key')
    this.render()
  }

  render(): void {
    const key = new Sprite(this.texture)
    key.x = this.key.x
    key.y = this.key.y
    key.width = 40
    key.height = 40
    this.keyView = key
  }
}
