class Circle extends Shape{
    constructor (x,y,r,options) {
        super(r,r);
        this.r = this.s/2
        this.body = Bodies.circle(x,y,this.r, options);
        super.addToWorld();
    }
    show() {
        push();
        super.show();
        ellipse(0,0,this.r,this.r)
        pop();
    }
}