PJ.Collections.Tags = Backbone.Collection.extend({
  model: PJ.Models.Tag,
  url: '/tags',
  comparator: function(tag) {
    return tag.get("name");
  }
});