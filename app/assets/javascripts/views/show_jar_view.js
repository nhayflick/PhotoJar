PJ.Views.ShowJarView = Backbone.View.extend({

  render: function() {
    var that = this;
    var renderedContent = JST["jars/show"]({
      jar: that.model
    });
    that.$el.html(renderedContent);
    return that;
  }



})