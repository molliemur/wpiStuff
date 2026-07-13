class Ball{
    constructor(x,y,vx,vy,radius,color){
        this.x=x
        this.y=y;
        this.radius=radius;
        this.color=color
    }
    draw(ctx){
        ctx.fillStyle=this.color
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.stroke();
        ctx.fill();
    }
    move(){
        this.x=this.vx+this.x;
        this.y+= this.vy;
    }
    bounceOffTopAndBottom(boardHeight){
        if(this.y-this.radius<0){
            this.vy=Math.abs(this.vy);
        }
        if(this.y+this.radius>boardHeight){
            this.vy=-Math.abs(this.vy);
        }
    }
    bounceOffLeftPaddle(paddle, paddleForce){
        const ballLeft = this.x-this.radius;
        const ballTop = this.y-this.radius;
        const ballBottom = this.y+this.radius;

        const paddleRight = paddle.x+paddle.lineWidth
        const paddleTop = paddle.y;
        const paddleBottom=paddle.y+paddle.height;
        if(ballLeft>paddleRight) return false;
        if(ballBottom<paddleTop) return false;
        if(ballTop>paddleBottom) return false;
        if(this.vx < 0){
            this.vx=Math.ads(this.vx);
        }
        return true
    }
    bounceOffRightPaddle(paddle, paddleForce){
        const ballRight = this.x+this.radius;
        const ballTop = this.y-this.radius;
        const ballBottom = this.y+this.radius;

        const paddleLeft = paddle.x-paddle.lineWidth;
        const paddleTop = paddle.y;
        const paddleBottom=paddle.y+paddle.height;
        if(ballRight>paddleLeft) return false;
        if(ballBottom<paddleTop) return false;
        if(ballTop>paddleBottom) return false;
        if(this.vx < 0){
            this.vx=Math.ads(this.vx);
        }
        return true
    }
}