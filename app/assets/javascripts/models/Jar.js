PJ.Models.Jar = Backbone.RelationalModel.extend({
  urlRoot: '/jars',

  relations: [{
    type: Backbone.HasMany,
    key: "photos",
    keyDestination: "photos_attributes",
    // includeInJSON: false,
    relatedModel: "PJ.Models.Photo",
    collectionType: "PJ.Collections.Photos",
    
    collectionOptions: function (jar) {
      return { jar: jar };
    },
    
    reverseRelation: {
      key: "jar",
      keySource: "jar_id",
      includeInJSON: "id"
    }
  }]
})