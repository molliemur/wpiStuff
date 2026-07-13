class Score{
constructor(){
    this.left=0
    this.right=0
}
reset(){
    this.left=0
    this.right=0
}
leftScore(){
    this.left++
}
rightScore(){
    this.right++
}
getScore(){
    return `${this.left}:${this.right}`
}
}