function notify(str){
  $("#notification").html(str)
}

Array.prototype.linearize = function(){
  var linearArray = []
  for (var i in this){
    if(this.hasOwnProperty(i)){ linearArray = linearArray.concat(this[i]) }
  }
  return linearArray
}
Array.prototype.lowestArrayElement = function(){
  return this.linearize().sort()[0]
}
Array.prototype.highestArrayElement = function(){
  return this.linearize().sort()[this.length - 1]
}

function Game(){
  this.board = function(){ return $("table").arr() }
  this.player1 = {mark: "x", value: 1}
  this.player2 = {mark: "o", value: 2}
  this.turn = 1
  this.currentPlayer = function(){ return this["player"+(this.turn%2 ? 1 : 2)] }
}

Game.prototype.boardIsFull = function(){
  var temp = this.board().lowestArrayElement()
  if( temp === 0 ){
    return false
  }else if( temp === 1 || temp === 2){
    return true
  }
}
Game.prototype.aPlayerWin = function(){
  var $table = $("table")
  var temp = {
    row0: $table.row(0).arr(),
    row1: $table.row(1).arr(),
    row2: $table.row(2).arr(),

    col0: $table.col(0).arr(),
    col1: $table.col(1).arr(),
    col2: $table.col(2).arr(),

    diag0: [$table.row(0).col(0).arr()[0], $table.row(1).col(1).arr()[0], $table.row(2).col(2).arr()[0]],
    diag1: [$table.row(0).col(2).arr()[0], $table.row(1).col(1).arr()[0], $table.row(2).col(0).arr()[0]],
  }
  function checkWin(array){
    if (array.lowestArrayElement() === array.highestArrayElement() && array.lowestArrayElement() !== 0){
      return true
    }else{
      return false
    }
  }

  for(var i in temp){
    if( checkWin(temp[i]) ){
      return true
    }
  }
  return false
}

$(function(){
  $("#generator").submit(function(){
    $("table").remove()
    var $table = generateTable(3,3)
    $("body").append( $table )

    var game = new Game
  
    notify("Player "+ (game.turn%2 ? 1 : 2) +" turn.")

    $("td").click(function(event){
      if(!this.className) {
        $(this).addClass(game.currentPlayer().mark).html(game.currentPlayer().value)
        game.turn += 1
        notify("Player "+ (game.turn%2 ? 1 : 2) +" turn.")
      }else{
        notify("Please click on an empty cell.")
      }

      if(game.boardIsFull()){
        notify("The board is full. Tie Game!")
        $("td").off("click")
      }else if(game.aPlayerWin()){
        notify("Game over. Player "+ (game.turn%2 + 1) + " win!")
        $("td").off("click")
      }
    })
    
    event.preventDefault()
  })
})