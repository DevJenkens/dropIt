class Button{
    constructor (x,y,w,h,text,colBtn,colBorder) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.colBtn = colBtn;
        this.colBorder = colBorder;
    }
    show() {
        fill(this.colBtn);
        stroke(this.colBorder);
        rect(this.x,this.y,this.w,this.h);
        drawTitle(this.text,this.y,0.66,0);
    }
}