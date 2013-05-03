PJ.Routers.JarsRouter = Backbone.Router.extend({

  initialize: function(content, photoContent) {
    this.$contentEl = $(content)
    this.$photoContentEl = $(photoContent)
  },

  routes: {
    'jars': 'index',
    'jars/new': 'new',
    'jars/:id': 'show',
    'users/:id': 'userShow' 
  },

  show: function(id){
    var that = this;
    var model = PJ.Store.CurrentUserJars.get(id)
    console.log(model)
    model.get('photos').fetch({
      success: function() {
        console.log(model.get('photos'));
        var showJarView = new PJ.Views.ShowJarView({
          //the jar object
          model: model,
          //the jar's photos
          collection: model.get('photos')
        })
        showJarView.clearTiles();
        that.$contentEl.html(showJarView.render().$el);
        showJarView.updateTiles();
        // showJarView.disableResize();
      }
    });  
  },

  new: function(){
    var that = this;
    var model = new PJ.Models.Jar({user_id: PJ.Store.CurrentUser.get('id')});
    var collection = model.get('photos')
    var newJarView = new PJ.Views.NewJarView({
      model: model
    });
    var newPhotoView = new PJ.Views.NewPhotoView({
      collection: collection
    });
    var editJarView = new PJ.Views.EditJarView({
      model: model,
      collection: collection
    })
    that.$contentEl.html(newJarView.render().$el).append(newPhotoView.render().$el).append(editJarView.render().$el);
    // showJarView.clearTiles();
  },

  index: function() {
    var that = this;
    that.$contentEl.empty();
    PJ.Store.CurrentUserJars.each(function(jar) {
      // that.show(jar.get("id")
      user = new PJ.Models.User({id: jar.get('user_id')});
      user.fetch({
        success: function() {
          console.log(user);
          jar.get('photos').fetch({
          success: function() {
            var showJarView = new PJ.Views.ShowJarView({
              //the jar object
              model: jar,
              //the jar's photos
              collection: jar.get('photos')
            })
            showJarView.clearTiles();
            that.$contentEl.append(showJarView.render().$el);
            showJarView.updateTiles();
            // showJarView.disableResize();
            }
          });
        }
      });  
    });
  },

  userShow: function(id) {
    var that = this;
    that.$contentEl.empty();
    user = new PJ.Models.User({id: id});
    user.fetch({
      success: function() {
        user.get('jars').each( function(jar) {
          console.log(jar);
          jar.get('photos').fetch({
            success: function() {
              console.log(jar.get('photos'));
              var showJarView = new PJ.Views.ShowJarView({
                //the jar object
                model: jar,
                //the jar's photos
                collection: jar.get('photos')
              })
              showJarView.clearTiles();
              that.$contentEl.append(showJarView.render().$el);
              showJarView.updateTiles();
              // showJarView.disableResize();
            }
          });  
        });
      }
    });
  }

});