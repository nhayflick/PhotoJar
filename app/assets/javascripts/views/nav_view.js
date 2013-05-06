PJ.Views.NavView = Backbone.View.extend({

  initialize: function() {
    var that = this;
    renderCallback = that.render.bind(that);
    that.collection.on("remove", renderCallback);
  },

  events: {
    'click #logout': 'logout'
  },

  render: function() {
    console.log("render!")
    var that = this;
    var renderedContent = JST['navbar/show']({
      user: that.collection
    });
    that.$el.html(renderedContent);
    return that;
  },

  logout: function(event) {
    event.preventDefault();
    var that = this;
    $.ajax({
                url: '/session',
                type: 'post',
                dataType: 'script',
                data: { '_method': 'delete' },
                success: function() {
                  that.collection.pop();
                }
            });
  }
})