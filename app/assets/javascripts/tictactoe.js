//TODO 1.Rand 1-9 									   	DONE
//     2.Elementarna postac tabeli 							   	DONE
//     3.Wstaw element do tabeli (przy pomocy jsDOM, prawdopodobnie child elementow tr/td) 	DONE
//     5.Rank do modelu i jego wyswietlanie na stronie userow
//     6.Poprawienie bledow przy kilkukrotnym kliknieciu					DONE/2

//$(document).ready(function(){
$( document ).on('turbolinks:load', function() {
  attachListeners();

});

var turn = 0;
var combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var currentGame = 0;

function doTurn(event) {
  updateState(event);
  if(checkWinner()) {
    resetState();
  } else if(checkTie(turn)) {
    resetState();
    alert('Remis!')
  } else {
    turn += 1;
  }
};

function checkTie(turn) {
  if (turn === 8) {
    return true;
  } else {
    return false;
  }
}

  function isEmpty( el ){
      return !$.trim(el.html())
  }

function attachListeners() {
  $("tbody").click(function(event) {
     if (isEmpty($(event.target)) || turn % 2 == 1) {
      doTurn(event)}
  });

  $('#previous').click(function(event) {
    getAllGames();
  });

  $('#save').click(function(event) {
    save();
  });

  $("#previous").click(function() {
    getAllGames();
  });
};

function player() {
  if (turn % 2 == 0) {
    return 'X'
  } else {
    return 'O'
  };
};

function checkCombo(combo, tdArr){
    if ((tdArr[combo[0]] === "X") && (tdArr[combo[1]] === "X") && (tdArr[combo[2]] === "X")){
      return true;
    }else if ((tdArr[combo[0]] === "O") && (tdArr[combo[1]] === "O") && (tdArr[combo[2]] === "O")) {
      return true;
    } else {
      return false;
    };
};

function checkWinner() {
  for(i = 0; i < combos.length; i++){
    if (checkCombo(combos[i], getMarks())){
      alert('Wygrywa gracz ' + player() + '!')
      return true;
    }
  }
  return false;
};

var resetState = function() {
  turn = 0;
  currentGame = 0;
  $('td').empty();
}

var updateState = function(event) {
if(turn % 2 == 0){


      $(event.target).html(player());

  
}


else{
  for(;;)
  {
    var x = Math.floor(Math.random() * 3);
    var y = Math.floor(Math.random() * 3);

    var t = document.getElementById("myTable");
    if(t.rows[x].cells[y].innerHTML != 'X' && t.rows[x].cells[y].innerHTML != 'O'){
      t.rows[x].cells[y].innerHTML = 'O';
    break;
  }
}

}
};

function getMarks() {
  var marks = []
   $("td").each(function(i) {
     marks.push($(this).text())
   })
  return marks;
};

function resumeGame(existingMarks, gameId) {
  resetState()
  var localExistingMarks = existingMarks.split(",")
  turn = localExistingMarks.filter(String).length
  var indexMatch = 0
  $("td").each(function() {
    this.append(localExistingMarks[indexMatch])
    indexMatch++
  })
  currentGame = gameId
}

var getAllGames = function() {
  $.getJSON("/games", function(data) {
    showGames(data.games)
  });
};

var showGames = function(games) {
  var dom = $()
  games.forEach(function(game) {
    dom = dom.add(showGame(game));
  })
  $("#games").html(dom);
}

var showGame = function(game) {
  var newGame = $('<button>', {'id': 'aGame', 'data-state': game.state, 'data-gameid': game.id, text: game.id});
  newGame.click(function() {
    resumeGame(this.getAttribute("data-state"), this.getAttribute("data-gameid"))
  });
  return newGame
}


var message = function(text) {
  $('#message').html(text);
}

