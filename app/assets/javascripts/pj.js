window.PJ = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},

  initialize: function($sidebar, $content, $navbar, user, jars, tags){
    var that = this;
    PJ.Store.CurrentUser = new PJ.Collections.Users([user]);
    PJ.Store.CurrentUserJars = new PJ.Collections.Jars(jars);
    PJ.Store.Tags = new PJ.Collections.Tags(tags);
    PJ.Store.AllUsers = new PJ.Collections.Users([user]);
    new PJ.Routers.JarsRouter($content);
    that.installSidebar($sidebar);
    that.installNavbar($navbar);
    Backbone.history.start();
  },

  installSidebar: function($sidebar) {
   var jarListView = new PJ.Views.ListJarsView({
    collection: PJ.Store.CurrentUserJars,
    model: PJ.Store.CurrentUser
   });
   $(sidebar).html(jarListView.render().$el);
  },

  installNavbar: function(navbar) {
    var navView = new PJ.Views.NavView({
      collection: PJ.Store.CurrentUser
    });
    $(navbar).append(navView.render().$el);
  }
};