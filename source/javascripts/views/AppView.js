var AppView = Backbone.View.extend({

  el: 'body',
  template: _.template($('#appTemplate').html()),

  initialize: function(){
    this.render(); 
  },

  render: function(){
    this.$el.append(this.template());
    return this;
  },

  events: {
    'click #createList' : 'createList',
    'click #trace' : 'displayTrace'
  },

  createList: function(e) {
    var listId = this.model.get('listsCollection').length;
    var listModel = new ListModel({ id: listId, color: $('.jscolor').html()});
    var listView = new ListView( {model: listModel} );
    this.model.get('listsCollection').add(listModel);
    this.$el.append(listView.render().el);
    $('#'+listId).find('#createItem').focus();
  },

  displayTrace: function() {
    var items ='';
    console.log('----- TRACE ----- App contains: ', this.model.get('listsCollection').length, ' lists');
    this.model.get('listsCollection').each(function(listModel, index) {
        listModel.get('itemsCollection').each(function(itemModel, index) {
          items += itemModel.get('label') + ' ';
        });
        console.log('-- List n°', index, ': ', items, '('+listModel.get('itemsCollection').length+')');
        items = '';
      });

  }

});
