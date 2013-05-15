PJ.Collections.Tags = Backbone.Collection.extend({
  model: PJ.Models.Tag,
  url: '/tags',

  //Note tags are treated as a many-to-one relationship with photos in Backbone, 
  //not many-to-many as on the Rails side
  comparator: function(tag) {
    return tag.get("name");
  }
});