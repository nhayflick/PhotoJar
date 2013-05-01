PJ.Views.NavView = Backbone.View.extend({
  render: function() {
    var that = this;
    var renderedContent = JST['navbar/show']({
      user: that.model
    });
    that.$el.html(renderedContent);
    return that;
  }
});