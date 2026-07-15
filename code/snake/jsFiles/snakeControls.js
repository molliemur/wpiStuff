class SnakeControls{
    constructor(snake){
        this.snake=snake;
        this.UP_ARROW=`arrowUp`
        this.DOWN_ARROW=`arrowDown`
        this.LEFT_ARROW=`ArrowLeft`
        this.RIGHT_ARROW=`ArrowRight`

        window.addEventListener("keydown",(event)=>(event.preventDefault()));
                window.addEventListener("keyup",(event)=>(event.preventDefault(),this.keyUp(event)));

    }
    keyUp(event){
        if(event.key==this.UP_ARROW&&(this.snake.vy<=0)){
            this.snake.moveUp(0,1)
        }else if(event.key==this.DOWN_ARROW&&(this.snake.vy>=0)){
            this.snake.moveDown(0,1);
        } else if(event.key==this.LEFT_ARROW&&(this.snake.vy<=0)){
            this.snake.moveLeft(0,1);
        } else if(event.key==this.RIGHT_ARROW&&(this.snake.vy>=0)){
            this.snake.moveRight(0,1);
        }
    }
}