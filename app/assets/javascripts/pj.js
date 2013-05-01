window.PJ = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},

  initialize: function($sidebar, $content, $photoContent, $navbar, user, jars, photos){
    var that = this;
    PJ.Store.CurrentUser = new PJ.Models.User(user);
    PJ.Store.CurrentUserJars = new PJ.Collections.Jars(jars);
    new PJ.Routers.JarsRouter($content, $photoContent);
    console.log($photoContent)
    console.log($content)
    that.installSidebar($sidebar);
    that.installNavbar($navbar);
    Backbone.history.start();
  },

  installSidebar: function($sidebar) {
   var jarListView = new PJ.Views.ListJarsView({
    collection: PJ.Store.CurrentUserJars
   });
   $(sidebar).html(jarListView.render().$el);
  },

  installNavbar: function(navbar) {
    var navView = new PJ.Views.NavView({
      model: PJ.Store.CurrentUser
    });
    $(navbar).append(navView.render().$el);
  }
};