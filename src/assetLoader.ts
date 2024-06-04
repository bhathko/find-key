import * as PIXI from 'pixi.js'

class AssetsLoader {
  private loader: PIXI.AssetsClass
  private textures!: Record<string, any>
  constructor() {
    this.loader = PIXI.Assets
  }
  async initializeAssets() {
    this.loader.add({
      alias: 'key',
      src: '/src/assets/icons/key.png',
    });
    this.loader.add({
      alias: 'character',
      src: '/src/assets/icons/mario.png',
    });
    this.textures = await this.loader.load(['key', 'character'])
  }

  getTexture(alias: string) {
    return this.textures[alias]
  }
}

let assetsLoader = new AssetsLoader()
await assetsLoader.initializeAssets()
export { assetsLoader }
