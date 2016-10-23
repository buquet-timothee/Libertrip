var AppModel = Backbone.Model.extend({
	defaults: {
   		title: 'EvaluationBackboneJS',
  	},
  	initialize: function(){
	  	if( !this.get('listsCollection') ){ 
	    	this.set({listsCollection: new ListsCollection()});
	  	}
	}

});