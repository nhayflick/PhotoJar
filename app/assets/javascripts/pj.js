window.PJ = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},

  initialize: function($content, $navbar, user, jars, tags){
    var that = this;
    PJ.Store.CurrentUser = new PJ.Collections.Users([user]);
    PJ.Store.CurrentUserJars = new PJ.Collections.Jars(jars);
    PJ.Store.Tags = new PJ.Collections.Tags(tags);
    PJ.Store.AllUsers = new PJ.Collections.Users([user]);
    new PJ.Routers.JarsRouter($content);
    that.installNavbar($navbar);
    Backbone.history.start();
  },

  installNavbar: function(navbar) {
    var navView = new PJ.Views.NavView({
      collection: PJ.Store.CurrentUser
    });
    $(navbar).append(navView.render().$el);
  }
};