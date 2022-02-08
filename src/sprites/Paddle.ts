import { Size, Vector } from './../types';
export class Paddle {
    private speed: Vector;
    private img: HTMLImageElement = new Image();
    private pos: Vector;
    private size: Size;
    private moveLeft: boolean;
    private moveRight: boolean;

    constructor(speed: Vector, PADDLE_IMG: string, pos: Vector, size: Size) {
        this.speed = speed;
        this.img.src = PADDLE_IMG;
        this.pos = pos;
        this.size = size;
        this.moveLeft = false;
        this.moveRight = false;
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft") {
                this.moveLeft = true;
            } else if (e.code === "ArrowRight") {
                this.moveRight = true;
            }
        })
        document.addEventListener("keyup", (e) => {
            this.moveLeft = this.moveRight = false;
        })
    }
    setSpeed(speed: Vector) {
        this.speed = speed;
    }
    makeMove(speed: Vector): void {
        this.pos.x += speed.x;
    }
    get getSize(): Size {
        return this.size;
    }
    get getSpeed(): Vector {
        return this.speed;
    }
    get getPos(): Vector {
        return this.pos
    }
    get getImg(): HTMLImageElement {
        return this.img;
    }
    get getMoveLeft(): boolean {
        return this.moveLeft
    }
    get getMoveRight(): boolean {
        return this.moveRight
    }
}