PJ.Views.NewTagView = Backbone.View.extend({

  //Handles adding and deleting from the list of tags for an individual jars

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
    console.log($tagsinput)
    var tags = [];  
    for (var i = $tagsinput.length; i--;) {  
      tags.push($($tagsinput[i]).text().substring(0, $($tagsinput[i]).text().length -  1).trim());  
    }
    console.log(tags)
    that.collection.reset()
    _.each(tags, function(tag) {
      that.collection.add({name: (tag).toLowerCase()})
    });
    console.log(that.collection)
  }
});