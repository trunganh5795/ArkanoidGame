import { Size, Vector } from './../types';
export class Brick {
    private img: HTMLImageElement = new Image();
    private pos: Vector;
    private size: Size;
    private level: number;
    constructor(BRICK_IMG: string, pos: Vector, size: Size, level: number) {
        this.img.src = BRICK_IMG;
        this.pos = pos;
        this.size = size;
        this.level = level
    }
    setLevel(): void {
        this.level -= 1;
    }
    setImage(path: string): void {
        this.img.src = path
    }
    get getSize(): Size {
        return this.size;
    }
    get getLevel(): number {
        return this.level;
    }
    get getPos(): Vector {
        return this.pos
    }
    get getImg(): HTMLImageElement {
        return this.img;
    }
}