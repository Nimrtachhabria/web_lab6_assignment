//for task1
function set_background(){
    let a=document.getElementsByTagName('p');
    for(let i=0 ;i<a.length;i++)
    {
        a[i].style.backgroundColor="aqua";
    }
         }
//for task2
function getAttributes() {
    var link = document.getElementById("w3r");
    if (link) {
      // Get the values of the specified attributes
      var href = link.getAttribute("href");
      var hreflang = link.getAttribute("hreflang");
      var relValue = link.getAttribute("rel");
      var targetValue = link.getAttribute("target");
      var typeValue = link.getAttribute("type");
      alert("href: " + href + "\nhreflang: " + hreflang+ "\nrel: " + relValue + "\ntarget: " + targetValue + "\ntype: " + typeValue);
    }
  }
//   for task3
function js_style(){
    let s = document.getElementById("text");
    if(s){
       s.style.fontSize="25px";
       s.style.fontFamily='Arial';
       s.style.color="orange";
    }
}
// for task4
function insert_Row(){
    let row=document.getElementById("sampleTable");
    var newrow=row.insertRow(-1);
    var cell1 = newrow.insertCell(0);
    var cell2 = newrow.insertCell(1);
    cell1.innerHTML = "Row3 cell1";
    cell2.innerHTML = "Row3 cell2";
}
//for task5
document.addEventListener("DOMContentLoaded", function() {
// 1. 
var containerWithoutQuerySelector = document.getElementById("container");
// 2.  
var containerWithQuerySelector = document.querySelector("#container");
// 3. 
var second = document.getElementsByClassName("second");

// 4. 
var thirdListItemInOl = document.querySelector("ol .third");

// 5.
containerWithQuerySelector.textContent = "Hello!";

// 6. 
var footer = document.querySelector(".footer");
footer.classList.add("main");
// 7. 
footer.classList.remove("main");
// 8.
var newLi = document.createElement("li");
// 9. 
newLi.textContent = "four";
// 10. 
var ul = document.querySelector("ul");
 ul.appendChild(newLi);

// 11. 
var ListItems = document.querySelectorAll("ol li");
for (var i = 0; i < ListItems.length; i++) {
 ListItems[i].style.backgroundColor = "green";
}
// 12.
footer.parentNode.removeChild(footer); });

//for task6
window.addEventListener('load', () => {
  loadTodos();
});
function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
      const todoList = document.getElementById('todo-list');
      const li = document.createElement('li');
      li.innerHTML = `
          <input type="checkbox">
          <span>${todoText}</span>
          <button onclick="removeTodo(this)">Delete</button>
      `;
      todoList.appendChild(li);
      saveTodos();
      todoInput.value = '';
  }
}
function removeTodo(button) {
  const todoList = document.getElementById('todo-list');
  const li = button.parentElement;
  todoList.removeChild(li);
  saveTodos();
}

function saveTodos() {
  const todoList = document.getElementById('todo-list');
  const todos = [];
  todoList.querySelectorAll('li').forEach((li) => {
      const text = li.querySelector('span').textContent;
      todos.push(text);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to load todos from local storage
function loadTodos() {
  const todoList = document.getElementById('todo-list');
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach((todoText) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <input type="checkbox">
          <span>${todoText}</span>
          <button onclick="removeTodo(this)">Delete</button>
      `;
      todoList.appendChild(li);
  });
}

// for task 7
var domElements = (function() {
  let squareList = Array.from(document.getElementsByClassName('game-square'));
  let currentPlayer = document.getElementById('current-player');
  let resetButton = document.getElementById('reset-button');

  return {
      squareList: squareList,
      currentPlayer: currentPlayer,
      resetButton: resetButton
  };
})();

const Player = function(sign) {
  this.sign = sign;
  this.choices = [];
}

var gameBoard = (function() {
  let board = ['', '', '', '', '', '', '', '', ''];

  function populateBoard() {
      for (let i = 0; i < domElements.squareList.length; i++) {
          domElements.squareList[i].textContent = board[i];
      };
  }

  function resetGame() {
      for (let i = 0; i < board.length; i++) {
          board[i] = '';
      };
  }

  return {
      populateBoard: populateBoard,
      resetGame: resetGame,
      board: board
    };
})();

var displayController = (function() {
  function setChoice(index, sign) {
      if (gameBoard.board[index] == '') {
          gameBoard.board[index] = sign;
          gameBoard.populateBoard();
      };
  };

  return {
      setChoice: setChoice
  };
})();

var gameController = (function() {
  let playerX = new Player('X');
  let playerO = new Player('O');
  let round = 1;
  let isOver = false;
  const winConditions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
  ];

  (function playRound() {
      for (let i = 0; i < domElements.squareList.length; i++) {
          domElements.squareList[i].addEventListener('click', function() {
              if (!isOver && gameBoard.board[i] == '') {
                  if (round % 2 == 0) {
                      displayController.setChoice(i, playerO.sign);
                      playerO.choices.push(i);
                      domElements.currentPlayer.textContent = `Player ${playerX.sign}'s turn`;
                  } else {
                      displayController.setChoice(i, playerX.sign);
                      playerX.choices.push(i);
                      domElements.currentPlayer.textContent = `Player ${playerO.sign}'s turn`;
                  }
                  round++;
                  checkResult();
              }
          });
      };
  })();

  let checkResult = function() {
      if (round == 10) {
          domElements.currentPlayer.textContent = 'It\'s a draw!';
          isOver = true;
      }

      for (let i = 0; i < winConditions.length; i++) {
          if (winConditions[i].every(r => playerO.choices.includes(r))) {
              domElements.currentPlayer.textContent = 'Player O wins!';
              isOver = true;
          } else if (winConditions[i].every(r => playerX.choices.includes(r))) {
              domElements.currentPlayer.textContent = 'Player X wins!';
              isOver = true;
          }
      }
  };

  let resetGame = function() {
      round = 1;
      isOver = false;
      playerX.choices = [];
      playerO.choices = [];
  }

  domElements.resetButton.addEventListener('click', function() {
      gameBoard.resetGame();
      gameBoard.populateBoard();
      resetGame();
      domElements.currentPlayer.textContent = `Player ${playerX.sign}'s turn`;
  });
})();
