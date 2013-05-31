PJ.Models.JarLike = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasOne,
    key: "user",
    relatedModel: "PJ.Models.User",
    autoFetch: true,

    collectionOptions: function(jarLike) {
      return { jarLike: jarLike};
    }
  }]
});