// // TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
// var todoColumn = new Column('Do zrobienia');
// var doingColumn = new Column('W trakcie');
// var doneColumn = new Column('Skończone');
//
// // DODAWANIE KOLUMN DO TABLICY
// board.createColumn(todoColumn);
// board.createColumn(doingColumn);
// board.createColumn(doneColumn);
//
// // TWORZENIE NOWYCH EGZEMPLARZY KART
// var card1 = new Card('Nowe zadanie');
// var card2 = new Card('stworzyc tablice kanban');
//
// // DODAWANIE KART DO KOLUMN
// todoColumn.createCard(card1);
// doingColumn.createCard(card2);

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3292',
  'X-Auth-Token': '1584c4535ce946a9f06b24a9d27e4527'
};

fetch(baseUrl + '/board', { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
  });


function setupColumns(columns) {
  columns.forEach(function(column) {
    var col = new Column(column.id, column.name);
    board.addColumn(col);
    setupCards(col, column.cards);
  });
};

function setupCards(col, cards) {
  cards.forEach(function(card) {
    var cardObj = new Card(card.id, card.name);
    col.addCard(cardObj);
  })
};

//
// function randomString() {
//     var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
//     var str = '';
//     for (var i = 0; i < 10; i++) {
//         str += chars[Math.floor(Math.random() * chars.length)];
//     }
//     return str;
// };

// GENEROWANIE TEMPLATKI
function generateTemplate(name, data, basicElement) {
  var template = document.getElementById(name).innerHTML;
  var element = document.createElement(basicElement || 'div');

  Mustache.parse(template);
  element.innerHTML = Mustache.render(template, data);

  return element;
};
