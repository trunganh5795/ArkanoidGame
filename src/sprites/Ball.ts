import { Size, Vector } from './../types';
export class Ball {
    private speed: Vector;
    private img: HTMLImageElement = new Image();
    private pos: Vector;
    private size: Size;
    constructor(speed: Vector, BALL_IMG: string, pos: Vector, size: Size) {
        this.speed = speed;
        this.img.src = BALL_IMG;
        this.pos = pos;
        this.size = size;
    }
    makeMove(): void {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    }
    setSpeed(speed: Vector) {
        this.speed = speed;
    }
    setPos(pos: Vector): void {
        this.pos = pos
    }
    get getSpeed(): Vector {
        return this.speed;
    }
    get getPos(): Vector {
        return this.pos;
    }
    get getSize(): Size {
        return this.size;
    }
    get getImg(): HTMLImageElement {
        return this.img;
    }
}