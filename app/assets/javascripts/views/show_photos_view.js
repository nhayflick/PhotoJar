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

  updateTiles: function() {
    var that = this;
    that.clearTiles();
    that.collection.each( function(photo) {
      var targetDivID = photo.get('div_id');
      var photoURL = photo.get('filepicker_url');
      if (photo.get('div_class') == "tilespan3") {
           var height = 321;
        } else {
           var height = 157;
        }
      $tile = $('[data-id="' + targetDivID + '"]')
      if(photo.get('div_class')) {
        console.log(photo.get('div_class'))
        $tile.parent().removeClass('tilespan3 tilespan6');
        $tile.parent().addClass(photo.get('div_class'));
        console.log($tile.parent())
      }
      $tile.append('<img src="' + photoURL + '/convert?w=430&h='+height+'&fit=crop" class="rounded-photo"/>');
    });
  },

  clearTiles: function() {
    $('li#photocontent').children().empty(); 
  }
});