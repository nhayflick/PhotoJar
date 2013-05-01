PJ.Routers.JarsRouter = Backbone.Router.extend({

  initialize: function(content, photoContent) {
    this.$contentEl = $(content)
    this.$photoContentEl = $(photoContent)
  },

  routes: {
    'jars/': 'index',
    'jars/new': 'new',
    'jars/:id': 'show' 
  },

  show: function(id){
    var that = this;
    var model = PJ.Store.CurrentUserJars.get(id)
    console.log(model)
    var showJarView = new PJ.Views.ShowJarView({
       model: model
    });
    showJarView.clearTiles();
    model.get('photos').fetch({
      success: function() {
        console.log(model.get('photos'));
        var showPhotosView = new PJ.Views.ShowPhotosView({
          collection: model.get('photos')
        })
        that.$contentEl.html(showJarView.render().$el);
        that.$photoContentEl.html(showPhotosView.render().$el);
        showPhotosView.updateTiles();
        // showJarView.disableResize();
      }
    });
  },

  new: function(){
    var that = this;
    var model = new PJ.Models.Jar({user_id: PJ.Store.CurrentUser.get('id'), title: PJ.Store.CurrentUser.get('user_name') + 'new jar'});
    var collection = model.get('photos')
    var newJarView = new PJ.Views.NewJarView({
      model: model
    });
    var newPhotoView = new PJ.Views.NewPhotoView({
      collection: collection
    });
    var editPhotosView = new PJ.Views.EditPhotosView({
      collection: collection
    })
    editPhotosView.render();
    that.$contentEl.html(newJarView.render().$el).append(newPhotoView.render().$el);
    editPhotosView.enableResize();
    editPhotosView.clearTiles();
  },

  index: function() {
    var that = this;
    console.log( PJ.Store.CurrentUserJars);
    // showJarView.clearTiles();
    that.$contentEl.empty();
    PJ.Store.CurrentUserJars.each(function(jar) {
      var showJarView = new PJ.Views.ShowJarView({
         model: jar
      });
      jar.get('photos').fetch({
      success: function() {
        console.log(jar.get('photos'));
        var showPhotosView = new PJ.Views.ShowPhotosView({
          collection: jar.get('photos')
        })
        that.$photoContentEl.html(showPhotosView.render().$el);
        showPhotosView.updateTiles();
        // showJarView.disableResize();
      }
    });
    })
  }

});