PJ.Views.NewTagView = Backbone.View.extend({

  render: function() {
    var that = this;
    var renderedContent = JST['tags/new']({
      tags: that.collection
    });
    that.$el.html(renderedContent);
    return that;
  },

  createTagField: function(){
    var that = this
    var setTagCallback = that.setTagCollection.bind(that);
    that.$('#tagsinput').tagsInput({
      'interactive': true,
      'defaultText': 'add a tag',
      'removeWithBackspace': true,
      'onChange': setTagCallback
    });
  },

  setTagCollection: function() {
    var that = this;
    $tagsinput = that.$("#tagsinput").siblings(".tagsinput").children(".tag");  
    var tags = [];  
    for (var i = $tagsinput.length; i--;) {  
      tags.push($($tagsinput[i]).text().substring(0, $($tagsinput[i]).text().length -  1).trim());  
    }
    // that.collection.add()
    that.collection.reset()
    _.each(tags, function(tag) {
      that.collection.add({name: tag})
    });
    console.log(that.collection)
  }
});