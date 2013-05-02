PJ.Views.ShowPhotosView = Backbone.View.extend({

  // initialize: function() {
  //   var that = this;
  //   var renderCallback = that.render.bind(that);
  //   this.collection.on('change', renderCallback);
  //   this.collection.on('add', renderCallback);
  //   this.collection.on('remove', renderCallback);
  // },

  render: function() {
    var that = this;
    renderedPhotos = JST["photos/show"]();
    that.$el.html(renderedPhotos);
    console.log(that.$el);
    return that;
  },
});