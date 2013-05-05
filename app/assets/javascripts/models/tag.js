PJ.Models.Tag = Backbone.RelationalModel.extend({
  urlRoot: '/tags',

  relations: [{
    type: 'HasMany',
    key: 'taggings',
    relatedModel: 'PJ.Models.Tagging',
    collectionType: 'PJ.Collections.Taggings',
    reverseRelation: {
      key: 'tag',
      keySource: 'tag_id'
    },
    collectionOptions: function(tag) {
      return { tag: tag };
    },
  }],

});