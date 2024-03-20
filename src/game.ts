import { Application } from 'pixi.js'
import { Keyboard, KeyboardEventEnum } from './enums/keyboard.enum';
import { CharacterController } from './controllers/character.controller';
import { CharacterView } from './views/character.view';
import { GROUND_MAP } from './const/ground.const';
import { GroundModel } from './models/ground.model';
import { GroundView } from './views/ground.view';


export class Game {
    private app: Application;
    private player = new CharacterController();
    private view = new CharacterView();
    constructor(application: Application) {
        this.app = application;

    }

    public start(): void {
        this.app.ticker.add(this.update.bind(this));
        this.initialGround();
        document.addEventListener(KeyboardEventEnum.KeyDown, this.keyDownHandler.bind(this));
        this.app.stage.addChild(this.view.character);
    }

    public stop(): void {
        console.log('Game stopped!');
    }

    public update(delta: number): void {
        this.view.render();
    }

    private keyDownHandler(event: KeyboardEvent): void {
        switch (event.key) {
            case Keyboard.Up:
                this.player.moveUp();
                break;
            case Keyboard.Down:
                this.player.moveDown();
                break;
            case Keyboard.Left:
                this.player.moveLeft();
                break;
            case Keyboard.Right:
                this.player.moveRight();
                break;
        }
    }

    initialGround(): void {
        const map = GROUND_MAP;
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                console.log(i, j)
                const groundModel = new GroundModel(j , i, !!map[i][j]);
                const ground = new GroundView(groundModel);
                this.app.stage.addChild(ground.groundView);
            }
        }
    
    }
}