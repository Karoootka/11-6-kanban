
function Card(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'No name given';
  this.element = generateTemplate('card-template', { description: this.name, id: this.id }, 'li');

  this.element.querySelector('.card-style').addEventListener('click', function (event) {
    event.stopPropagation();

    if (event.target.classList.contains('btn-delete')) {
      self.removeCard();
    }
    if (event.target.classList.contains('card-description')) {
      var newCardTitle = prompt('Enter new card title') || 'No name given';
      event.preventDefault();

      var data = new FormData();
      data.append('name', newCardTitle);

      fetch(baseUrl + '/card/' + self.id, { method: 'PUT', headers: myHeaders, body: data})
        .then(function(resp) {
          return resp.json();
        })
        .then(function(resp) {
          self.name = newCardTitle;
          self.element.querySelector('.card-description').innerHTML = self.name;
        })
    }
  });
};

Card.prototype = {
  removeCard: function() {
    var self = this;

    fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders})
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      })
  }
};
