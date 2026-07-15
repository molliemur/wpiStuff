class SnakeGame{
    constructor(){
        this.canvas = document.getElementById("gameboard")
        this.scoreTag=document.getElementById("currentScore")
        this.highScoreTag = document.getElementById("highScore")


        this.gridSide = 16;

        this.score = 0;
        this.highScore=localStorage.getItem("highScore")||0
        this.highScoreTag.innerText = `high score: ${this.highScore}`
        this.timerId=null;

        this.snakeX =this.randomPostition();
        this.snakeY = this.randomPostition();
        this.vx=0;
        this.vy=0
        this.snakeSpeed = 120;//if want faster do lower if want slower do higher

        this.foodX=this.randomPostition();
        this.foodY=this.randomPostition();
        if(this.foodX===this.snakeX && this.foodY===this.snakeY){
          this.foodX=this.randomPostition();
          this.foodY=this.randomPostition();
        }

        this.createObjects();
        this.controls = new SnakeControls(this.snake)
        this.draw;
        this.start;
    }
randomPostition(){
    return Math.floor((Math.random()* this.gridSide)+1);
}
createObjects(){
    this.snake=new Snake(
        this.snakeX,
        this.snakeY,
        this.vx,
        this.vy,
        "#ff0075"
    );
    this.food=new Food(
        this.foodX,
        this.foodY,
        "#b81c1c"
    );
}
draw(){
    let foodHtml = `<div style="background-color: ${this.food.color}; grid-area:${this.food.y}/${this.food.x}"></div>`;
    this.canvas.innerHTML = foodHtml+this.drawSnake();
}
drawSnake(){
    let snakeHtml="";
    let snakeBody=this.snake.snakeBody
    for(let i =0; i<snakeBody.length; i++){
        if(i !==0 && snakeBody[0][1]===snakeBody[i][1]&& snakeBody[0][0]===snakeBody[i][0]){
            this.gameOver();
        }
        snakeHtml+=`<div style="background-color: ${this.snake.color}; grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
    }
    return snakeHtml;
}
gameOver(){
    if(this.timerId!==null){
        clearInterval(this.timerId);
        this.timerId=null;
    }
    alert("Game Over!")
    location.reload();
}
start(){
    this.timerId=setInterval(()=>this.gameLoop(this.gridSide), this.snakeSpeed);
}
gameLoop(side){
    if(this.snake.move(side)){
        this.gameOver();
    }
    this.draw();
    if(this.snake.headX===this.food.x && this.snake.heady === this.food.y){
        this.food.changeFoodPosition(this.gridSide);
        this.snake.growSnake(this.food.x,this.food.y);
    }
  }
}
window.addEventListener("DOMContentLoaded",()=>{
    new SnakeGame();
})