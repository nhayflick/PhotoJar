PJ.Views.EditPhotosView = Backbone.View.extend({

  events: {
    'click button.delete': 'delete'
  },

  initialize: function() {
    var that = this;
    var renderCallback = that.updateTiles.bind(that);
    var parse = that.parse.bind(that);
    this.collection.on('change', renderCallback);
    this.collection.on('add', renderCallback);
    this.collection.on('remove', renderCallback);
    this.collection.on('save', parse);

    $( "#photocontent" ).sortable();
    $( "#photocontent" ).disableSelection();
  },

  // render: function() {
  //   var that = this;
  //   console.log(that.collection);
  //   renderedPhotos = JST["photos/edit"]({
  //     photos: that.collection
  //   })
  //   that.$el.html(renderedPhotos);
  //   return that;
  // },

  updateTiles: function() {
    var that = this;
    $('#photocontent').children().empty(); 
    that.collection.each( function(photo) {
      var targetDivID = photo.get('div_id');
      var photoURL = photo.get('filepicker_url');
      $('[data-id="' + targetDivID + '"]').append('<img src="' + photoURL + '"/>');
    });
  },

  delete: function(event) {
    var that = this;
    toDelete = that.collection.get($(event.target).attr('data-id'));
    // filepicker.remove
    that.collection.remove(toDelete);

  },

  parse: function() {
    var that = this;
    var posArray = $("#photocontent").sortable( "toArray", {attribute: 'data-id'});
    _.each(posArray, function(pos, index) {
      console.log(pos);
      console.log(that.collection.at(parseInt(pos)));
      if (that.collection.at(parseInt(pos))) {
        console.log(index);
        that.collection.at(parseInt(pos)).set({div_id: (index - 1)});
      }
    });
  }

});