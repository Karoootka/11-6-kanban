//  obiekt tablicy

var board = {
  name: 'Kanban Board',
  addColumn: function(column) {
    this.element.appendChild(column.element);
    initSortable(column.id);
  },
  moveCard: function(colId, cardId) {
    var data = new FormData();
    data.append('bootcamp_kanban_column_id', colId);
    
    fetch(baseUrl + '/card/' + cardId, { method: 'PUT', headers: myHeaders, body: data})
  },
  element: document.querySelector('#board .column-container')
};

document.querySelector('#board .create-column').addEventListener('click', function() {
  var name = prompt('Enter a column name');
  var data = new FormData();

  data.append('name', name);

  fetch(baseUrl + '/column', { method: 'POST', headers: myHeaders, body: data})
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp) {
      var column = new Column(resp.id, name);
      board.addColumn(column);
    });
});


// CARDS SORTING

function initSortable(id) {
  var el = document.getElementById(id);
  var sortable = Sortable.create(el, {
    group: 'kanban',
    sort: true,
    animation: 100,
    onAdd: function(evt) {
      var colId = evt.target.id;
      var cardId = evt.item.querySelector('.card-style').id;
      board.moveCard(colId, cardId);
    }
  });
};
