class SnakeGame{
    constructor(){
        this.canvas = document.getElementById("gameboard")
        this.scoreTag=document.getElementById("currentScore")
        this.highScoreTag = document.getElementById("highScore")


        this.gridSide = 16;

        this.score = 0;
        this.highScore=Number(localStorage.getItem("highScore"))||0
        this.timerId=null;

        this.snakeX =this.randomPostition();
        this.snakeY = this.randomPostition();
        this.vx=0;
        this.vy=0
        this.snakeSpeed = 120;//if want faster do lower if want slower do higher

        this.foodX=this.randomPostition();
        this.foodY=this.randomPostition();

        this.createObjects();
        this.placeFood();
        this.controls = new SnakeControls(this.snake)
        this.draw();
        this.start();
    }
    updateScoreBoard(){
        this.scoreTag.innerText=`Score:${this.score}`;
        this.highScoreTag.innerText=`High Score: ${this.highScore}`;
    }
    increaseScore(points=1){
        this.score+=points;
        if(this.score>this.highScore){
            this.highScore=this.score;
            localStorage.setItem("highScore", String(this.highScore));
        }
        this.updateScoreBoard();
    }
randomPostition(){
    return Math.floor(Math.random()* this.gridSide)+1;
}
createObjects(){
    this.snake=new Snake(
        this.snakeX,
        this.snakeY,
        this.vx,
        this.vy,
        "#dabc45"
    );
    this.food=new Food(
        this.foodX,
        this.foodY,
        "#fdbcb4","#317873","#662aaa"
    );
}
placeFood(){
    do{
        this.foodX=this.randomPostition();
        this.foodY=this.randomPostition();
    }while(this.isOccupied(this.foodX,this.foodY))
        this.food.x=this.foodX;
        this.food.y=this.foodY;
}
isOccupied(x,y){
    return this.snake.snakeBody.some(([bodyX,bodyY])=>bodyX===x&&bodyY===y)
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
        return;
    }
    if(this.snake.headX===this.food.x && this.snake.headY === this.food.y){
        this.placeFood();
        this.snake.growSnake(this.food.x,this.food.y);
        this.increaseScore();
    }
    this.draw();
  }
}
window.addEventListener("DOMContentLoaded",()=>{
    new SnakeGame();
})