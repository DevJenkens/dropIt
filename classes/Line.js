class Line{
    constructor (x) {
        this.x = x
        this.spd = 0;
    }
    show() {
        stroke(gameManager.palette[0]);
        line(0,this.x,width,this.x);
        this.x += this.spd;
        this.spd+=0.01;
    }
}