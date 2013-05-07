PJ.Views.EditJarView = Backbone.View.extend({

  initialize: function() {
    this.photos = []
  },

  render: function() {
    var that = this;
    renderedContent = JST["jars/edit"]();
    that.$el.html(renderedContent);
    return that;
  },

  events: {
    'click button.submit': 'create'
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