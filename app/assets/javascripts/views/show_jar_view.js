PJ.Views.ShowJarView = Backbone.View.extend({

  //Shows a single jar with all relevant meta data

  events: {
    "click .like": "like",
    "click .unlike": "unlike"
  },

  render: function() {
    var that = this;
          // console.log(that.model);
    var renderedContent = JST["jars/show"]({
      jar: that.model
    });
    that.$el.html(renderedContent);
    return that;
  },

  updateTiles: function() {
    var that = this;
    that.clearTiles();
    that.collection.each(function(photo) {
      var targetDivID = photo.get('div_id');
      var photoURL = photo.get('filepicker_url');
      if (photo.get('div_class') == "tilespan3") {
           var height = 321;
        } else {
           var height = 157;
        }
      $tile = that.$('[data-id="' + targetDivID + '"]')
      if(photo.get('div_class')) {
        // console.log(photo.get('div_class'))
        $tile.parent().removeClass('tilespan3 tilespan6  tilespan0');
        $tile.parent().addClass(photo.get('div_class'));
        // console.log($tile.parent());
      }
      $tile.append('<img src="' + photoURL + '/convert?w=430&h=' + height + '&fit=crop" class="rounded-photo"/>');
    });
  },

  clearTiles: function() {
    var that = this;
    that.$('li#photocontent').children().empty(); 
  },

  like: function(event) {
    event.preventDefault();
    var that = this;
    var like = new PJ.Models.JarLike()
    console.log(that.model.get('id'));
    like.save({user_id: PJ.Store.CurrentUser.first().id, jar_id: that.model.id}, {success: function() {
      console.log("liked")
      that.render();
      that.updateTiles();
      that.$('.like').removeClass('like btn-inverse').addClass('unlike btn-danger');
    }})
  },

  unlike: function(event) {
    event.preventDefault();
    var that = this;
    var like = that.model.get('jarLikes').findWhere({user_id: PJ.Store.CurrentUser.first().id})
    console.log(like)
    like.destroy({success: function() {
      console.log("destroyed")
      that.render();
      that.updateTiles();
      that.$('.like').removeClass('unlike btn-danger').addClass('like btn-inverse');
    }})
  },

})