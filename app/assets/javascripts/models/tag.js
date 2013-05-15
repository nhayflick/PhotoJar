PJ.Models.Tag = Backbone.RelationalModel.extend({
  
  urlRoot: '/tags',

  // toJSON: function() {
  //   attrs = _(this.attributes).clone();
  //   delete attrs.jar_id;
  //   return attrs;
  // },

  //keeps tags unique

  add: function(tag) {
    var isDupe = this.any(function(_tag) { 
        return _tag.get('body') === truck.get('body');
    });
    if (isDupe) {
        return false;
    }
    Backbone.Collection.prototype.add.call(this, tag);
}

});