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
    renderedPhotos = JST["photos/show"]({
      photos: that.collection
    })
    that.$el.html(renderedPhotos);
    return that;
  },

  updateTiles: function() {
    var that = this;
    $('#photocontent').children().empty(); 
    that.collection.each( function(photo) {
      var targetDivID = photo.get('div_id');
      var photoURL = photo.get('filepicker_url');
      $('[data-id="' + targetDivID + '"]').append('<img src="' + photoURL + '"/>');
    });
  }, 

});