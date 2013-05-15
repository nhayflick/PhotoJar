PJ.Views.NewJarView = Backbone.View.extend({

    //Encapsulates the jar creation module and handles form submission


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
        Backbone.history.navigate("#/jars/"+that.model.get('id'));
      }, error: function() {
        console.log("Fail!")
      }
    });
  }
});