PJ.Collections.Tags = Backbone.Collection.extend({
  model: PJ.Models.Tag,
  url: function(){
    return '/tags'
  }
});