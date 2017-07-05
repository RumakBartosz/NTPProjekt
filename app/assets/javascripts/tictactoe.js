//TODO 1.Rand 1-9 									   	DONE
//     2.Elementarna postac tabeli 							   	DONE
//     3.Wstaw element do tabeli (przy pomocy jsDOM, prawdopodobnie child elementow tr/td) 	DONE
//     5.Rank do modelu i jego wyswietlanie na stronie userow					DONE/2
//     6.Poprawienie bledow przy kilkukrotnym kliknieciu					DONE

//$(document).ready(function(){
$( document ).on('turbolinks:load', function() {
  attachListeners();

});

var turn = 0;
var combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var currentGame = 0;
var flag = 0;
var rank = 0;

function doTurn(event) {
  updateState(event);
  if(checkWinner()) {
    save(true) 
    resetState();
  } else if(checkTie(turn)) {
    save(true) 
    resetState();
    alert('Remis!')
    return false;
  } else {
    turn += 1;
  }

  moveAI();
  if(checkWinner()) {
    save(true) 
    resetState();
  } else if(checkTie(turn)) {
    save(true) 
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

//  $('#previous').click(function(event) {
    getAllGames();
//  });

 // $("#previous").click(function() {
    getAllGames();
 // });
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
      //up_rank()
post_rank()
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

var moveAI = function(){

  for(;;)
  {
    var x = Math.floor(Math.random() * 3);
    var y = Math.floor(Math.random() * 3);

    var t = document.getElementById("myTable");
	if(t.rows[1].cells[1].innerHTML != 'O' && t.rows[1].cells[1].innerHTML != 'X'){
	  x = 1; y = 1;
	}
	else if(turn === 1 && t.rows[1].cells[1].innerHTML == 'X'){
	  x = 0; y = 2;
	}
	//poczatek if AI - check linii X - 0
	else if(t.rows[0].cells[0].innerHTML == 'O' && t.rows[0].cells[1].innerHTML == 'O' && 
		t.rows[0].cells[2].innerHTML != 'X' && t.rows[0].cells[2].innerHTML != 'O'){
	  x = 0; y = 2;
	}
	else if(t.rows[0].cells[1].innerHTML == 'O' && t.rows[0].cells[2].innerHTML == 'O' && 
		t.rows[0].cells[0].innerHTML != 'X' && t.rows[0].cells[0].innerHTML != 'O'){
	  x = 0; y = 0;
	}
	else if(t.rows[0].cells[0].innerHTML == 'O' && t.rows[0].cells[2].innerHTML == 'O' && 
		t.rows[0].cells[1].innerHTML != 'X' && t.rows[0].cells[1].innerHTML != 'O'){
	  x = 0; y = 1;
	}

	//check linii X - 1
	else if(t.rows[1].cells[0].innerHTML == 'O' && t.rows[1].cells[1].innerHTML == 'O' && 
		t.rows[1].cells[2].innerHTML != 'X' && t.rows[1].cells[2].innerHTML != 'O'){
	  x = 1; y = 2;
	}
	else if(t.rows[1].cells[1].innerHTML == 'O' && t.rows[1].cells[2].innerHTML == 'O' && 
		t.rows[1].cells[0].innerHTML != 'X' && t.rows[1].cells[0].innerHTML != 'O'){
	  x = 1; y = 0;
	}
	else if(t.rows[1].cells[0].innerHTML == 'O' && t.rows[1].cells[2].innerHTML == 'O' && 
		t.rows[1].cells[1].innerHTML != 'X' && t.rows[1].cells[1].innerHTML != 'O'){
	  x = 1; y = 1;
	}

	//check linii X - 2
	else if(t.rows[2].cells[0].innerHTML == 'O' && t.rows[2].cells[1].innerHTML == 'O' && 
		t.rows[2].cells[2].innerHTML != 'X' && t.rows[2].cells[2].innerHTML != 'O'){
	  x = 2; y = 2;
	}
	else if(t.rows[2].cells[1].innerHTML == 'O' && t.rows[2].cells[2].innerHTML == 'O' && 
		t.rows[2].cells[0].innerHTML != 'X' && t.rows[2].cells[0].innerHTML != 'O'){
	  x = 2; y = 0;
	}
	else if(t.rows[2].cells[0].innerHTML == 'O' && t.rows[2].cells[2].innerHTML == 'O' && 
		t.rows[2].cells[1].innerHTML != 'X' && t.rows[2].cells[1].innerHTML != 'O'){
	  x = 2; y = 1;
	}


	//check linii Y - 0
	else if(t.rows[0].cells[0].innerHTML == 'O' && t.rows[1].cells[0].innerHTML == 'O' && 
		t.rows[2].cells[0].innerHTML != 'X' && t.rows[2].cells[0].innerHTML != 'O'){
	  x = 2; y = 0;
	}
	else if(t.rows[0].cells[0].innerHTML == 'O' && t.rows[2].cells[0].innerHTML == 'O' && 
		t.rows[1].cells[0].innerHTML != 'X' && t.rows[1].cells[0].innerHTML != 'O'){
	  x = 1; y = 0;
	}
	else if(t.rows[2].cells[0].innerHTML == 'O' && t.rows[1].cells[0].innerHTML == 'O' && 
		t.rows[0].cells[0].innerHTML != 'X' && t.rows[0].cells[0].innerHTML != 'O'){
	  x = 0; y = 0;
	}



	//check linii Y - 1
	else if(t.rows[0].cells[1].innerHTML == 'O' && t.rows[1].cells[1].innerHTML == 'O' && 
		t.rows[2].cells[1].innerHTML != 'X' && t.rows[2].cells[1].innerHTML != 'O'){
	  x = 2; y = 1;
	}
	else if(t.rows[0].cells[1].innerHTML == 'O' && t.rows[2].cells[1].innerHTML == 'O' && 
		t.rows[1].cells[1].innerHTML != 'X' && t.rows[1].cells[1].innerHTML != 'O'){
	  x = 1; y = 1;
	}
	else if(t.rows[2].cells[1].innerHTML == 'O' && t.rows[1].cells[1].innerHTML == 'O' && 
		t.rows[0].cells[1].innerHTML != 'X' && t.rows[0].cells[1].innerHTML != 'O'){
	  x = 0; y = 1;
	}



	//check linii Y - 2
	else if(t.rows[0].cells[2].innerHTML == 'O' && t.rows[1].cells[2].innerHTML == 'O' && 
		t.rows[2].cells[2].innerHTML != 'X' && t.rows[2].cells[2].innerHTML != 'O'){
	  x = 2; y = 2;
	}
	else if(t.rows[0].cells[2].innerHTML == 'O' && t.rows[2].cells[2].innerHTML == 'O' && 
		t.rows[1].cells[2].innerHTML != 'X' && t.rows[1].cells[2].innerHTML != 'O'){
	  x = 1; y = 2;
	}
	else if(t.rows[2].cells[2].innerHTML == 'O' && t.rows[1].cells[2].innerHTML == 'O' && 
		t.rows[0].cells[2].innerHTML != 'X' && t.rows[0].cells[2].innerHTML != 'O'){
	  x = 0; y = 2;
	}

	else if(t.rows[0].cells[2].innerHTML == 'O' && t.rows[1].cells[2].innerHTML == 'O' && 
		t.rows[2].cells[2].innerHTML != 'X' && t.rows[2].cells[2].innerHTML != 'O'){
	  x = 2; y = 2;
	}
	else if(t.rows[0].cells[2].innerHTML == 'O' && t.rows[2].cells[2].innerHTML == 'O' && 
		t.rows[1].cells[2].innerHTML != 'X' && t.rows[1].cells[2].innerHTML != 'O'){
	  x = 1; y = 2;
	}

	else if(t.rows[0].cells[0].innerHTML == 'O' && t.rows[1].cells[1].innerHTML == 'O' && 
		t.rows[2].cells[2].innerHTML != 'X' && t.rows[2].cells[2].innerHTML != 'O'){
	  x = 2; y = 2;
	}
	else if(t.rows[2].cells[2].innerHTML == 'O' && t.rows[1].cells[1].innerHTML == 'O' && 
		t.rows[0].cells[0].innerHTML != 'X' && t.rows[0].cells[2].innerHTML != 'O'){
	  x = 0; y = 2;
	}

	else if(t.rows[0].cells[2].innerHTML == 'O' && t.rows[1].cells[1].innerHTML == 'O' && 
		t.rows[2].cells[0].innerHTML != 'X' && t.rows[2].cells[0].innerHTML != 'O'){
	  x = 2; y = 0;
	}
	else if(t.rows[2].cells[0].innerHTML == 'O' && t.rows[1].cells[1].innerHTML == 'O' && 
		t.rows[0].cells[2].innerHTML != 'X' && t.rows[0].cells[2].innerHTML != 'O'){
	  x = 0; y = 2;
	}

//poczatek if AI - check linii X - 0
	else if(t.rows[0].cells[0].innerHTML == 'X' && t.rows[0].cells[1].innerHTML == 'X' && 
		t.rows[0].cells[2].innerHTML != 'X' && t.rows[0].cells[2].innerHTML != 'O'){
	  x = 0; y = 2;
	}
	else if(t.rows[0].cells[1].innerHTML == 'X' && t.rows[0].cells[2].innerHTML == 'X' && 
		t.rows[0].cells[0].innerHTML != 'X' && t.rows[0].cells[0].innerHTML != 'O'){
	  x = 0; y = 0;
	}
	else if(t.rows[0].cells[0].innerHTML == 'X' && t.rows[0].cells[2].innerHTML == 'X' && 
		t.rows[0].cells[1].innerHTML != 'X' && t.rows[0].cells[1].innerHTML != 'O'){
	  x = 0; y = 1;
	}

	//check linii X - 1
	else if(t.rows[1].cells[0].innerHTML == 'X' && t.rows[1].cells[1].innerHTML == 'X' && 
		t.rows[1].cells[2].innerHTML != 'X' && t.rows[1].cells[2].innerHTML != 'O'){
	  x = 1; y = 2;
	}
	else if(t.rows[1].cells[1].innerHTML == 'X' && t.rows[1].cells[2].innerHTML == 'X' && 
		t.rows[1].cells[0].innerHTML != 'X' && t.rows[1].cells[0].innerHTML != 'O'){
	  x = 1; y = 0;
	}
	else if(t.rows[1].cells[0].innerHTML == 'X' && t.rows[1].cells[2].innerHTML == 'X' && 
		t.rows[1].cells[1].innerHTML != 'X' && t.rows[1].cells[1].innerHTML != 'O'){
	  x = 1; y = 1;
	}

	//check linii X - 2
	else if(t.rows[2].cells[0].innerHTML == 'X' && t.rows[2].cells[1].innerHTML == 'X' && 
		t.rows[2].cells[2].innerHTML != 'X' && t.rows[2].cells[2].innerHTML != 'O'){
	  x = 2; y = 2;
	}
	else if(t.rows[2].cells[1].innerHTML == 'X' && t.rows[2].cells[2].innerHTML == 'X' && 
		t.rows[2].cells[0].innerHTML != 'X' && t.rows[2].cells[0].innerHTML != 'O'){
	  x = 2; y = 0;
	}
	else if(t.rows[2].cells[0].innerHTML == 'X' && t.rows[2].cells[2].innerHTML == 'X' && 
		t.rows[2].cells[1].innerHTML != 'X' && t.rows[2].cells[1].innerHTML != 'O'){
	  x = 2; y = 1;
	}


	//check linii Y - 0
	else if(t.rows[0].cells[0].innerHTML == 'X' && t.rows[1].cells[0].innerHTML == 'X' && 
		t.rows[2].cells[0].innerHTML != 'X' && t.rows[2].cells[0].innerHTML != 'O'){
	  x = 2; y = 0;
	}
	else if(t.rows[0].cells[0].innerHTML == 'X' && t.rows[2].cells[0].innerHTML == 'X' && 
		t.rows[1].cells[0].innerHTML != 'X' && t.rows[1].cells[0].innerHTML != 'O'){
	  x = 1; y = 0;
	}
	else if(t.rows[2].cells[0].innerHTML == 'X' && t.rows[1].cells[0].innerHTML == 'X' && 
		t.rows[0].cells[0].innerHTML != 'X' && t.rows[0].cells[0].innerHTML != 'O'){
	  x = 0; y = 0;
	}



	//check linii Y - 1
	else if(t.rows[0].cells[1].innerHTML == 'X' && t.rows[1].cells[1].innerHTML == 'X' && 
		t.rows[2].cells[1].innerHTML != 'X' && t.rows[2].cells[1].innerHTML != 'O'){
	  x = 2; y = 1;
	}
	else if(t.rows[0].cells[1].innerHTML == 'X' && t.rows[2].cells[1].innerHTML == 'X' && 
		t.rows[1].cells[1].innerHTML != 'X' && t.rows[1].cells[1].innerHTML != 'O'){
	  x = 1; y = 1;
	}
	else if(t.rows[2].cells[1].innerHTML == 'X' && t.rows[1].cells[1].innerHTML == 'X' && 
		t.rows[0].cells[1].innerHTML != 'X' && t.rows[0].cells[1].innerHTML != 'O'){
	  x = 0; y = 1;
	}



	//check linii Y - 2
	else if(t.rows[0].cells[2].innerHTML == 'X' && t.rows[1].cells[2].innerHTML == 'X' && 
		t.rows[2].cells[2].innerHTML != 'X' && t.rows[2].cells[2].innerHTML != 'O'){
	  x = 2; y = 2;
	}
	else if(t.rows[0].cells[2].innerHTML == 'X' && t.rows[2].cells[2].innerHTML == 'X' && 
		t.rows[1].cells[2].innerHTML != 'X' && t.rows[1].cells[2].innerHTML != 'O'){
	  x = 1; y = 2;
	}
	else if(t.rows[2].cells[2].innerHTML == 'X' && t.rows[1].cells[2].innerHTML == 'X' && 
		t.rows[0].cells[2].innerHTML != 'X' && t.rows[0].cells[2].innerHTML != 'O'){
	  x = 0; y = 2;
	}

	else if(t.rows[0].cells[2].innerHTML == 'X' && t.rows[1].cells[2].innerHTML == 'X' && 
		t.rows[2].cells[2].innerHTML != 'X' && t.rows[2].cells[2].innerHTML != 'O'){
	  x = 2; y = 2;
	}
	else if(t.rows[0].cells[2].innerHTML == 'X' && t.rows[2].cells[2].innerHTML == 'X' && 
		t.rows[1].cells[2].innerHTML != 'X' && t.rows[1].cells[2].innerHTML != 'O'){
	  x = 1; y = 2;
	}

	else if(t.rows[0].cells[0].innerHTML == 'X' && t.rows[1].cells[1].innerHTML == 'X' && 
		t.rows[2].cells[2].innerHTML != 'X' && t.rows[2].cells[2].innerHTML != 'O'){
	  x = 2; y = 2;
	}
	else if(t.rows[2].cells[2].innerHTML == 'X' && t.rows[1].cells[1].innerHTML == 'X' && 
		t.rows[0].cells[0].innerHTML != 'X' && t.rows[0].cells[2].innerHTML != 'O'){
	  x = 0; y = 2;
	}

	else if(t.rows[0].cells[2].innerHTML == 'X' && t.rows[1].cells[1].innerHTML == 'X' && 
		t.rows[2].cells[0].innerHTML != 'X' && t.rows[2].cells[0].innerHTML != 'O'){
	  x = 2; y = 0;
	}
	else if(t.rows[2].cells[0].innerHTML == 'X' && t.rows[1].cells[1].innerHTML == 'X' && 
		t.rows[0].cells[2].innerHTML != 'X' && t.rows[0].cells[2].innerHTML != 'O'){
	  x = 0; y = 2;
	}

    if(t.rows[x].cells[y].innerHTML != 'X' && t.rows[x].cells[y].innerHTML != 'O'){
      t.rows[x].cells[y].innerHTML = 'O';
    break;
  }
}


};

var updateState = function(event) {
if(turn % 2 == 0){

      $(event.target).html(player());
  
}


else{
  
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
    resumeGame(this.getAttribute("data-state"), this.getAttribute("data-gameid"));
       
  });
  return newGame;
}

var save = function(resetCurrentGame) {
  var url, method;
  if(currentGame) {
    url = "/games/" + currentGame
    method = "PATCH"
  } else {
    url = "/games"
    method = "POST"
  };                               

  $.ajax({
    url: url,
    method: method,
    dataType: "json",
    data: {
      game: {
        state: getMarks()
      }
    },
    success: function(data) {
      if(resetCurrentGame) {        //if win or tie, true param is passed to reset board state
        resetState();
      } else {
        currentGame = data.game.id; //or to set currentGame
      }
    }
  });
};

////////////////////////////////
var up_rank = function() {
  
  $.ajax({
    url: "/users/",
    method: "GET",
    dataType: "json",
    success: function(user){
           rank = user.users[0].rank + 20;
	   alert(user.users[0].rank);
        }
  });
};
///////////////////////////////

var getRank = function() {
    var rank = 20;
	return rank;
};

var post_rank = function() {
  
    $.ajax({
    url: "/users/2",
    method: "PATCH",
    dataType: "json",
    data: {
      user: {
	rank: getRank()
        } 
      }
  });
};

var message = function(text) {
  $('#message').html(text);
}

