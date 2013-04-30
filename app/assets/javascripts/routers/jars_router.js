PJ.Routers.JarsRouter = Backbone.Router.extend({

  initialize: function(content) {
    this.$contentEl = $(content)
  },

  routes: {
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
    model.get('photos').fetch({
      success: function() {
        console.log(model.get('photos'));
        var showPhotosView = new PJ.Views.ShowPhotosView({
          collection: model.get('photos')
        })
        that.$contentEl.html(showJarView.render().$el).append(showPhotosView.updateTiles());
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
  }

});