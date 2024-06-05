import { Application, Graphics, Text } from 'pixi.js'
import { Keyboard, KeyboardEventEnum } from './enums/keyboard.enum'
import { CharacterController } from './controllers/character.controller'
import { CharacterView } from './views/character.view';
import { GROUND_MAP } from './const/ground.const'
import { GroundModel } from './models/ground.model'
import { GroundView } from './views/ground.view'
import { GAME_CONFIG } from './const/config.const'
import { KeyView } from './views/key.view'
import { KeyModel } from './models/key.model'
import { GAME_STATE } from './enums/game.enum';

export class Game {
  private app: Application
  private player = new CharacterController()
  private view = new CharacterView()
  private groundMap = GROUND_MAP
  private groundViewMap: Array<Array<GroundView>> = new Array(GROUND_MAP.length)
    .fill([])
    .map(() => new Array(GROUND_MAP[0].length).fill(null));

  private timer: NodeJS.Timeout | null = null;
  private costSeconds = 0;
  private timerText!: Text;

  private gameStatus = GAME_STATE.MENU;

  private menuText!: Text;
  private menuBackground!: Graphics;


  constructor(application: Application) {
    this.app = application
  }
  public init(): void {
    this.onInitialGround();
    this.onInitialKey();
    this.onInitPlayer();
    this.onEventDetected();
    this.onInitMenu();

  }

  public start(): void {
    this.player.resetToDefaultPosition();
    this.onTimer();
  }

  public stop(): void {
    clearInterval(this.timer as NodeJS.Timeout);
    this.gameStatus = GAME_STATE.WIN;
    this.menuText.text = `You win! Time: ${this.timerTextFormat(this.costSeconds)} \n Press enter to restart the game`;
    this.app.stage.addChild(this.menuBackground);
    this.app.stage.addChild(this.menuText);

  }

  public update(): void {
    this.view.render()
  }

  private keyDownHandler(event: KeyboardEvent): void {
    if (this.gameStatus === GAME_STATE.WIN || this.gameStatus === GAME_STATE.MENU) {
      this.onMenuAction(event);
    } else {
      this.onPlayerMove(event)
      this.onGroundCheck()
    }
    
  }

  onInitialGround(): void {
    for (let i = 0; i < this.groundMap.length; i++) {
      for (let j = 0; j < this.groundMap[i].length; j++) {
        const groundModel = new GroundModel(
          j,
          i,
          this.groundMap[i][j] === 0,
          this.groundMap[i][j] === 2,
          this.groundMap[i][j] === 3,
        )
        const ground = new GroundView(groundModel)
        this.groundViewMap[i][j] = ground
        this.app.stage.addChild(ground.groundView)
      }
    }
  }
  onInitPlayer(): void {
    this.app.ticker.add(this.update.bind(this))
    this.player.resetToDefaultPosition()
    this.app.stage.addChild(this.view.character)
  }

  onInitialKey(): void {
    const key = new KeyView(new KeyModel(4 + GAME_CONFIG.groundHeight * 8, 4 + GAME_CONFIG.groundWidth * 4))
    this.app.stage.addChild(key.keyView)
  }

  onPlayerMove(event: KeyboardEvent): void {
    switch (event.key) {
      case Keyboard.Up:
        this.player.moveUp()
        break
      case Keyboard.Down:
        this.player.moveDown()
        break
      case Keyboard.Left:
        this.player.moveLeft()
        break
      case Keyboard.Right:
        this.player.moveRight()
        break
    }
  }

  onGroundCheck(): void {
    const { y, x } = this.player.position
    if (this.groundMap[Math.floor(y / GAME_CONFIG.groundHeight)][Math.floor(x / GAME_CONFIG.groundWidth)] === 1) {
      this.player.resetToDefaultPosition()
      this.groundViewMap[Math.floor(y / GAME_CONFIG.groundHeight)][Math.floor(x / GAME_CONFIG.groundWidth)].drawFakeGround()
    }
    if (this.groundMap[Math.floor(y / GAME_CONFIG.groundHeight)][Math.floor(x / GAME_CONFIG.groundWidth)] === 2) {

      this.stop();
    }
  }

  onEventDetected(): void {
    document.addEventListener(KeyboardEventEnum.KeyDown, this.keyDownHandler.bind(this))
  }

  onTimer(): void {
    this.timerText = new Text('00:00', { 
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 0x000, 
      align: 'center'
    })
    this.costSeconds = 0;
    this.timerText.x = this.app.screen.width - 95;
    this.timerText.y = 6;
    this.app.stage.addChild(this.timerText);
    this.timer = setInterval(() => {
      this.costSeconds += 1;
      this.timerText.text = this.timerTextFormat(this.costSeconds);
    }, 1000);
  }

  timerTextFormat(costSec: number): string {
    let min = Math.floor(costSec / 60);
    let sec = costSec % 60;
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  }

  onInitMenu(): void {
    this.menuText = new Text('Press enter to start the game', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
      align: 'center'
    });
    this.menuText.anchor.set(0.5);
    this.menuText.x = this.app.screen.width / 2;
    this.menuText.y = this.app.screen.height / 2;

    this.menuBackground = new Graphics();
    this.menuBackground.beginFill(0x000000);
    this.menuBackground.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    this.menuBackground.endFill();

    this.app.stage.addChild(this.menuBackground);
    this.app.stage.addChild(this.menuText);
  }

  onMenuAction(event: KeyboardEvent): void {
    if (event.key === Keyboard.Enter) {
      this.gameStatus = GAME_STATE.PLAYING;
      this.app.stage.removeChild(this.menuText);
      this.app.stage.removeChild(this.menuBackground);
      this.app.stage.removeChild(this.timerText);
      this.start();
    }
  }


}
