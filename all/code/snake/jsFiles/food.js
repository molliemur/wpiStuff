class Food{
    constructor(x,y,color){
        this.x=x;
        this.y=y;
        this.color=color;
    }


    changeFoodPosition(side){
        this.x=Math.floor(Math.random()*side)+1;
        this.y=Math.floor(Math.random()*side)+1;

    }
    changeColor(color){
        this.color=color;
    }
}