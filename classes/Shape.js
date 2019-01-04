class Shape{
    constructor (w,h) {
        this.w = w;
        this.h = h;
        this.s = w + h;
    }
    addToWorld(){
        World.add(world, this.body);
    }
    show() {
        var pos = this.body.position;
        var angle = this.body.angle;
        translate(pos.x,pos.y);
        rotate(angle);
        fill(0);
        if(this.body.isSleeping){
            stroke(gameManager.palette[2]);
        }else{
            stroke(gameManager.palette[1]);
        }
    }
}