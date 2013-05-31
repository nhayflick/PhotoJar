PJ.Collections.JarLikes = Backbone.Collection.extend({
  model: PJ.Models.JarLike,
  url: function(){
     return '/jars/' + this.jar.id + '/jar_likes';
  },
  idAttribute: "_id"
})