class Box extends Shape{
    constructor (x,y,w,h,options) {
        super(w,h);
        this.body = Bodies.rectangle(x,y,this.w,this.h,options);
        super.addToWorld();
    }
    show() {
        push();
        super.show();
        rect(0,0,this.w,this.h)
        pop();
    }
}