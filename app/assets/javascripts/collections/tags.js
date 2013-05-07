PJ.Collections.Tags = Backbone.Collection.extend({
  model: PJ.Models.Tag,
  url: '/tags',
  comparator: function(tag) {
    return tag.get("name");
  },

  toJSON:
    _.cloneAttributes();

  _cloneAttributes: ->
    attributes = _.clone(@attributes)
    for sa in @secureAttributes
      delete attributes[sa]
    _.clone(attributes)
});