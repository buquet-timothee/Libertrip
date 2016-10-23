var ListModel = Backbone.Model.extend({
	defaults: {
		id: 0,
		color: 'darkgrey',
		title: 'List',
	},
	initialize: function(){
	  	if( !this.get('itemsCollection') ){ 
	    	this.set({itemsCollection: new ItemsCollection()});
	  	}
	}
});