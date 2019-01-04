class Triangle extends Shape{
    constructor (x,y,r,sides,options) {
        super(r,r);
        this.r = this.s/2
        this.sides = sides;
        this.body = Bodies.polygon(x,y,this.sides,this.r,options);
        super.addToWorld();
    }
    show() {
        push();
        super.show();
        rotate(PI);
        polygon(0,0,this.r,this.sides)
        pop();
    }
}