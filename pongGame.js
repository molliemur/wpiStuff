class PongGame{
    constructor(){
        this.canvas = document.getElementById("gameboard");
        this.ctx=this.canvas.getContext("2d");
        this.scoreboard= document.getElementById("scoreboard");
        this.resetbutton=document.getElementById("reset");

        this.boardWidth = 814;
        this.boardHeight =622.594;

        this.paddleWidth = 25;
        this.paddleHeight = 100;
        this.paddleSpeed = 5;

        this.ballRadius =12.5;
        this.ballSpeed = 1;

        this.timerId=null;

        this.canvas.width =this.boardWidth;
        this.canvas.height=this.boardHeight;
       
        this.score=new Score();
        this.createObjects();

        this.controls = new KeyboardControls(this.leftPaddle,
        this.rightPaddle,
        this.paddleSpeed
    );
        this.resetbutton.addEventListener("click", () => this.resetGame());
        this.updateScore();
        this.draw();
        this.start();
    }   createObjects(){
        
        this.leftPaddle= new Paddle(
            0,
            this.boardHeight/2 - this.paddleHeight/2,
            this.paddleHeight,
            this.paddleWidth,
            "#FDBCB4",
            this.boardHeight
        );
    
        this.rightPaddle = new Paddle(
            this.boardWidth-this.paddleWidth,
            this.boardHeight/2 -this.paddleHeight /2,
            this.paddleHeight,
            this.paddleWidth,
            "#317873",
            this.boardHeight
        );
        this.resetBall();
    }
    resetBall(){
        const direction = Math.random()<0.5?-1:1;
        const verticalDirection = Math.random()<0.5?-1:1;

        this.ball= new Ball(
            this.boardWidth/2,
            this.boardHeight/2,
            this.ballSpeed* direction,
            this.ballSpeed*verticalDirection,
            this.ballRadius,
            "#DABC45"
        )
    }
    clearBoard(){
        this.ctx.fillStyle = "#494949"
        this.ctx.fillRect(0, 0, this.boardWidth, this.boardHeight);
    }
    draw(){
        this.clearBoard();
        this.ball.draw(this.ctx)
        this.leftPaddle.draw(this.ctx);
        this.rightPaddle.draw(this.ctx)
    }
    start(){
        this.timerId=setInterval(()=>this.gameLoop(),10);
    }
    stop(){
        if(this.timerId!==null){
            clearInterval(this.timerId)
            this.timerId=null
        }
    }
    gameLoop(){
        this.update();
        this.draw();
    }
    update(){
        this.leftPaddle.move();
        this.rightPaddle.move();
        this.ball.bounceOffTopAndBottom(this.boardHeight);
        this.ball.bounceOffLeftPaddle(this.leftPaddle);
        this.ball.bounceOffRightPaddle(this.rightPaddle);
        this.ball.move();
        this.checkScore();
    }
    updateScore(){
        this.scoreboard.innerHTML=this.score.getScore();
        }
        checkScore(){
            if(this.ball.isPastLeftWall()){
                this.score.rightScore();
                this.afterScore();
            }
            if(this.ball.isPastRightWall(this.boardWidth)){
                this.score.leftScore();
                this.afterScore();
            }
       
        }
        afterScore(){
                this.updateScore();
                this.resetPaddles();
                this.resetBall();
            }
        resetPaddles(){
                const centerY = this.boardHeight/2-this.paddleHeight/2;
                this.leftPaddle.reset(centerY);
                this.rightPaddle.reset(centerY);
            }
        resetGame(){
            this.stop()
            this.score.reset()
            this.updateScore()
            this.resetPaddles()
            this.resetBall()
            this.draw()
            this.start()
            }
}



window.addEventListener("DOMContentLoaded",()=>{
    new PongGame();
})