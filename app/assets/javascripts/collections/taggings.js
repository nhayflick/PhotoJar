PJ.Collections.Taggings = Backbone.Collection.extend({
  model: PJ.Models.Tagging,
  initialize: function(models, options) {
    this.jar = options.jar;
  },
});