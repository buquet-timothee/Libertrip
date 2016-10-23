var ListView = Backbone.View.extend({

	tagName: 'div',
	id: 'list',
	className: 'containList',

	template: _.template($('#listTemplate').html()),

	initialize: function(){
		this.el.id = this.model.id;
		this.render();
	},

	render: function(){
		this.$el.html(this.template());
		this.$el.find('h5').css('color', '#'+this.model.get('color'));
		this.dragAndDropable();
		return this;
	},

	events: {
		'keypress #createItem' : 'createItem'
	},

	contructItem: function(itemLabel) {
		var itemModel = new ItemModel({label : itemLabel});
		var itemView = new ItemView( {model: itemModel} );
		return itemView;
	},

	appendItem: function(itemView) {
		this.model.get('itemsCollection').add(itemView.model);
		this.$el.find('ol').append(itemView.render().el);
	},

	createItem: function(e) {
		if(e.keyCode == 13) {
			var input = this.$el.find('#createItem');
			this.appendItem(this.contructItem(input.val()));
			input.val('').focus();
		}
	},

	dragAndDropable: function() {
		var self = this;
		this.$el.find('ol').sortable({
			connectWith: ".sortable", 
			start: function(e, ui) {
				self.removeItem(ui.item[0].innerText);
				app.itemDraggedReceived = false;

			},
			receive: function(e, ui) {	
				self.addItem(self.el.id, ui.item[0].innerText, ui.item.index());
				app.itemDraggedReceived = true;
			},
			stop:function(e, ui) {
				if(!app.itemDraggedReceived) {
					self.addItem(self.el.id, ui.item[0].innerText, ui.item.index());
				}
			}
		});
	},

	removeItem: function(itemLabel) {
		var itemModel = this.model.get('itemsCollection').findWhere({label : itemLabel});
		this.model.get('itemsCollection').remove(itemModel);
	},

	addItem:function(listId, itemLabel, index) {
			var itemView = this.contructItem(itemLabel);
			this.model.get('itemsCollection').add(itemView.model, {at: index});
	}

});