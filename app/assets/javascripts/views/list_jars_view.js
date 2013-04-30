PJ.Views.ListJarsView = Backbone.View.extend({
  tagName: 'ul',
  className: 'jar_list',

  initialize: function(){
    var that = this;
    var renderCallback = that.render.bind(that);
    that.collection.on("add", renderCallback);
    that.collection.on("change", renderCallback);
    that.collection.on("remove", renderCallback);
  },

  render: function(){
    var that = this;
    var renderedContent = JST['jars/list']({
      jars: that.collection
    });
    that.$el.html(renderedContent);
    that.$el.append("<a href='/#/jars/new'> Start a New Photo Jar </button>");
    return that;
  },


});