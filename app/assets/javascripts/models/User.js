PJ.Models.User = Backbone.RelationalModel.extend({
  urlRoot: 'users',

  relations: [{
    type: Backbone.HasMany,
    key: "jars",
    // keyDestination: "photos_attributes",
    // includeInJSON: false,
    relatedModel: "PJ.Models.Jar",
    collectionType: "PJ.Collections.Jars",
    
    collectionOptions: function (user) {
      return { user: user };
    },
    
    reverseRelation: {
      key: "user",
      keySource: "user_id",
      includeInJSON: "id"
    }
  }]  
});