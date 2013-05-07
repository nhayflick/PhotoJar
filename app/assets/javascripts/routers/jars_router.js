PJ.Routers.JarsRouter = Backbone.Router.extend({

  initialize: function(content, photoContent) {
    this.$contentEl = $(content)
    this.$photoContentEl = $(photoContent)
  },

  routes: {
    '': 'index',
    'jars': 'index',
    'jars/new': 'new',
    'jars/:id': 'show',
    'users/:id': 'userShow',
    'tags/:id': 'tagShow'
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
    var jar = new PJ.Models.Jar({user_id: PJ.Store.CurrentUser.first().get('id')});
    var photos = jar.get('photos')
    // var tags = new PJ.Collections.Tags(jar.get('tags'));
    var tags = jar.get('tags');
    console.log(tags);
    var newJarView = new PJ.Views.NewJarView({
      model: jar,
      tags: tags
    });
    var newPhotoView = new PJ.Views.NewPhotoView({
      collection: photos
    });
    var newTagView = new PJ.Views.NewTagView({
      collection: tags
    });
    var editJarView = new PJ.Views.EditJarView({
      model: jar,
      collection: photos,
      tags: tags
    })
    that.$contentEl.html(newJarView.render().$el).append(newTagView.render().$el).append(newPhotoView.render().$el).append(editJarView.render().$el);
    newTagView.createTagField();
  },

  index: function() {
    var that = this;
    that.$contentEl.empty();
    console.log(PJ.Store.CurrentUserJars.sort());
    PJ.Store.CurrentUserJars.sort().each(function(jar) {
      var user = PJ.Models.User.findOrCreate({id: jar.get('user_id')});
      user.fetch({
        success: function() {
          jar.get('photos').fetch({
          success: function() {
            var showJarView = new PJ.Views.ShowJarView({
              //the jar object
              model: jar,
              //the jar's photos
              collection: jar.get('photos')
            })
            showJarView.clearTiles();
            that.$contentEl.prepend(showJarView.render().$el);
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
    user = PJ.Models.User.findOrCreate({id: id});
    user.fetch({
      success: function() {
        user.get('jars').each( function(jar) {
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
            }
          });  
        });
      }
    });
  },

  tagShow: function(id) {
    var that = this;
    that.$contentEl.empty();
    var taggedJars = new PJ.Collections.Jars();
    PJ.Store.CurrentUserJars.each(function(jar) {
      console.log(jar.get('tags'))
      if (jar.get('tags').where({name: id}).length > 0) {
        console.log(jar.get('tags').contains({name: id}))
        taggedJars.add([jar])
      }
    });
    console.log(that.taggedJars);
    taggedJars.each( function(jar) {
      var user = PJ.Models.User.findOrCreate({id: jar.get('user_id')});
      user.fetch({
        success: function() {
          jar.get('photos').fetch({
          success: function() {
            var showJarView = new PJ.Views.ShowJarView({
              //the jar object
              model: jar,
              //the jar's photos
              collection: jar.get('photos')
            })
            showJarView.clearTiles();
            that.$contentEl.prepend(showJarView.render().$el);
            showJarView.updateTiles();
            // showJarView.disableResize();
            }
          });
        }
      });
    });
  }

});