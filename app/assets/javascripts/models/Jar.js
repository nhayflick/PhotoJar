PJ.Models.Jar = Backbone.RelationalModel.extend({
  urlRoot: '/jars',

  relations: [{
    type: Backbone.HasMany,
    key: "photos",
    keyDestination: "photos_attributes",
    // includeInJSON: false,
    relatedModel: "PJ.Models.Photo",
    collectionType: "PJ.Collections.Photos",
    
    collectionOptions: function(jar) {
      return { jar: jar };
    },
    
    reverseRelation: {
      key: "jar",
      keySource: "jar_id",
      // includeInJSON: "id"
    }
  },{
    type: Backbone.HasMany,
    key: "taggings",
    relatedModel: "PJ.Models.Tagging",
    collectionType: "PJ.Collections.Taggings",

    collectionOptions: function(jar) {
      return { jar: jar};
    },

    reverseRelation: {
      key: "jar",
      keySource: "jar_id",
      // includeInJSON: "id"
    }
  }],

  toJSON: function(){
    var that = this;
    var tagsCollection = new PJ.Collections.Tags(that.get('taggings').reduce(function(a, b) { a.push(b.get('tag')); }, []))
    debugger
    console.log(tagsCollection);
    json = {jar : that.attributes};
    // return _.extend({}, json, {
    //   tags_attributes: tagsCollection.toJSON()
    // });
    return json
  }
})