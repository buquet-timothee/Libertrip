var ItemView = Backbone.View.extend({

	tagName: 'div',
	className: 'containItem',

	template: _.template("<a href='#'><%= label %></a>"),
	templateEdit: _.template("<input type='text' id='editItem' class='form-control input-sm' placeholder='<%= label %>'>"),

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html(this.template({label: this.model.get('label')}));
		return this;
	},

	events: {
		'dblclick a' : 'displayEditTemplate',
		'keypress #editItem' : 'editItem'
	},

	displayEditTemplate: function(){
		this.$el.html(this.templateEdit({label: this.model.get('label')}));
		this.$el.find('#editItem').focus();
	},

	editItem: function(e) {
		if(e.keyCode == 13) {
			var input = this.$el.find('#editItem');
			if(input.val()) {
				this.model.set({label: input.val()})
				this.render();
			}
			else {
				this.removeItem();
			}
		}
	},

	removeItem: function() {
		this.model.destroy();
		this.$el.remove();
	}
});