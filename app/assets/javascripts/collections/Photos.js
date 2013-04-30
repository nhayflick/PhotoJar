PJ.Collections.Photos = Backbone.Collection.extend({
  model: PJ.Models.Photo,
  initialize: function(models, options) {
    this.jar = options.jar;
  },
  url: function() {
    console.log("here in collections");
    return '/jars/' + this.jar.id + '/photos';
  }
});