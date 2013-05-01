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
    that.clearTiles();
    that.collection.each( function(photo) {
      var targetDivID = photo.get('div_id');
      var photoURL = photo.get('filepicker_url');
      $tile = $('[data-id="' + targetDivID + '"]')
      $tile.append('<img src="' + photoURL + '/convert?w=430&h=321&fit=crop"/>');
      if(photo.get('div_class')) {
        console.log(photo.get('div_class'))
        $tile.parent().removeClass('tilespan3 tilespan6');
        $tile.parent().addClass(photo.get('div_class'));
        console.log($tile.parent())
      }
    });
  },

  clearTiles: function() {
    $('li#photocontent').children().empty(); 
  }
});