PJ.Views.NewJarView = Backbone.View.extend({

  initialize: function() {
    this.photos = []
  },

  events: {
    'click button.submit': 'create'
  },

  render: function() {
    var that = this;
    var renderedContent = JST['jars/new']();
    that.$el.html(renderedContent);
    return that;
  },

  create: function() {
    var that = this;
    that.model.save({title: $('#jar_title').val()}, {success: function() {
        PJ.Store.CurrentUserJars.add(that.model);
        console.log(that.model)
        $('li#photocontent').resizable( "disable" );
        Backbone.history.navigate("#/jars/"+that.model.get('id'));
        console.log("Saved!")
      }, error: function() {
        console.log("Fail!")
      }
    });
  }

  // addPhotoForm: function() {
  //   var that = thisl
  //   that.photos.push(new PJ.Models.Photo);
  
  //   $el

  // }

});