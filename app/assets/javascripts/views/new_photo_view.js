PJ.Views.NewPhotoView = Backbone.View.extend({

  events: {
    'change input[type="file"]': 'create'
  },

  initialize: function() {
    this.photos = [];
  },

  render: function() {
    var that = this;
    var renderedContent = JST['photos/new']();
    that.$el.html(renderedContent);
    return that
  },

  create: function(event, name) {
    var that = this;
    if ($('input[type="file"]')[0].files[0]){
     var output = $("#ajax-upload-output")
      filepicker.store($('input[type="file"]')[0].files[0], {location: 'S3'}, function(fpfile){
          output.html('Uploaded: '+fpfile.filename+'');
          var photo = new PJ.Models.Photo({filepicker_url: fpfile.url, div_id: that.findEmptyDiv(), div_class: 
            'tilespan3'})
          that.collection.add(photo);
      }, function(fperror){
          output.text(fperror.toString());
      }, function(progress){
          output.text("Uploading... ("+progress+"%)");
      });
    }
  },

  findEmptyDiv: function() {
    var that = this;
    for(i=0; i < 3; i++) {
      if(!_.contains(that.collection.pluck('div_id'), i)){
        return i
      }
    }
    return 0
  },


  // Gotta clean up pics that are posted without a saved model...

});