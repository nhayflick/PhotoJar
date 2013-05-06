PJ.Models.Jar = Backbone.RelationalModel.extend({
  urlRoot: '/jars',

  relations: [{
    type: Backbone.HasMany,
    key: "photos",
    keyDestination: "photos_attributes",
    relatedModel: "PJ.Models.Photo",
    collectionType: "PJ.Collections.Photos",
    
    collectionOptions: function(jar) {
      return { jar: jar };
    },
    
    reverseRelation: {
      key: "jar",
      keySource: "jar_id"
      // includeInJSON: "id"
    }
  },{
    type: Backbone.HasMany,
    key: "tags",
    relatedModel: "PJ.Models.Tag",
    collectionType: "PJ.Collections.Tags",
    keyDestination: "tags_attributes",

    collectionOptions: function(jar) {
      return { jar: jar};
    },

    reverseRelation: {
      key: "jar",
      keySource: "jar_id"
      // includeInJSON: "id"
    }
  }]
})