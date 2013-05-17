PJ.Views.ListJarsView = Backbone.View.extend({
  tagName: 'ul',
  className: 'jar_list',

  //This displays and holds a collection of Jar Views

  initialize: function(){
    var that = this;
    var renderCallback = that.render.bind(that);
    that.collection.on("add", renderCallback);
    that.collection.on("change", renderCallback);
    that.collection.on("remove", renderCallback);
    that.model.on("remove", renderCallback);
  },

  render: function(){
    var that = this;
    console.log(that.model);
    var renderedContent = JST['jars/list']({
      jars: that.collection
    });
    that.$el.html(renderedContent);
    if (that.model.first() != undefined) {
      that.$el.append("<a href='/#/jars/new'> Start a New Photo Jar </button>");
    } else {
      that.$el.append("<a href='/session/new'> Start a New Photo Jar </button>");
    }
    return that;
  },


});