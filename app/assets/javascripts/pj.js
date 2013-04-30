window.PJ = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},

  initialize: function($sidebar, $content, user, jars, photos){
    var that = this;
    PJ.Store.CurrentUser = new PJ.Models.User(user);
    PJ.Store.CurrentUserJars = new PJ.Collections.Jars(jars);
    new PJ.Routers.JarsRouter($content);
    that.installSidebar($sidebar);
    Backbone.history.start();
  },

  installSidebar: function($sidebar) {
   var jarListView = new PJ.Views.ListJarsView({
    collection: PJ.Store.CurrentUserJars
   });
   $(sidebar).html(jarListView.render().$el);
  }
};