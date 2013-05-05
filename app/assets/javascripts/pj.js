window.PJ = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},

  initialize: function($sidebar, $content, $navbar, user, jars, tags){
    var that = this;
    PJ.Store.CurrentUser = new PJ.Models.User(user);
    PJ.Store.CurrentUserJars = new PJ.Collections.Jars(jars);
    console.log(PJ.Store.CurrentUserJars)
    PJ.Store.Tags = new PJ.Collections.Tags(tags);
    PJ.Store.AllUsers = new PJ.Collections.Users();
    PJ.Store.AllUsers.add([PJ.Store.CurrentUser]);
    new PJ.Routers.JarsRouter($content);
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