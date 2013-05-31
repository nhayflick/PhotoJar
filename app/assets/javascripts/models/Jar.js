PJ.Models.Jar = Backbone.RelationalModel.extend({
  urlRoot: '/jars',

  relations: [{
    type: Backbone.HasMany,
    key: "photos",
    autoFetch: true,
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
    autoFetch: true,
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
  },{
    type: Backbone.HasMany,
    key: "jarLikes",
    relatedModel: "PJ.Models.JarLike",
    autoFetch: true,
    collectionType: "PJ.Collections.JarLikes",

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