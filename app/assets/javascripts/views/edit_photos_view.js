PJ.Views.EditPhotosView = Backbone.View.extend({

  //This displays an individual photojar and allows for moving, styling of individual photo DIVs

  events: {
    'click .remove': 'remove',
    'click .expand': 'expand',
    'click .shrink': 'shrink',
    'click .down': 'down',
    'click .up': 'up'
  },

  initialize: function() {
    var that = this;
    var renderCallback = that.updateTiles.bind(that);
    var parse = that.parse.bind(that);
    that.collection.on('change', renderCallback);
    that.collection.on('add', renderCallback);
    that.collection.on('remove', renderCallback);
    that.collection.on('save', parse);
  },

  render: function() {
    var that = this;
    var renderedContent = JST["jars/show"]({
      jar: that.model
    });
    that.$el.html(renderedContent);
    return that;
  },

//Use as template
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
        $tile.parent().removeClass('tilespan0 tilespan3 tilespan6');
        $tile.parent().addClass(photo.get('div_class'));
      }
      $tile.append('<img src="' + photoURL + '/convert?w=430&h=' + height + '&fit=crop" class="rounded-photo"/>');
      if(photo.get('div_class') == "tilespan3") {
        $tile.append('<div class="hidden-menu"><ul class="palette" style=" list-style-type: none;"><li><a href="#" class="expand">Expand </a><i class="icon-resize-horizontal icon-white"></i></li><li><a href="#" class="shrink"> Shrink </a><i class="icon-resize-small icon-white"></i></li><li><a href="#" class="down">Swap Forward </a><i class="icon-arrow-right icon-white"></i></li><li><a href="#" class="up">Swap Back </a><i class="icon-arrow-left icon-white"></i></li><li><a href="#" class="remove">Remove </a><i class="icon-remove icon-white"></i></li></ul></div>');
      } else if(photo.get('div_class') == "tilespan6") {
        $tile.append('<div class="hidden-menu-wide"><ul class="palette" style=" list-style-type: none;"><li><a href="#" class="expand">Expand </a><i class="icon-resize-horizontal icon-white"></i></li><li><a href="#" class="shrink"> Shrink </a><i class="icon-resize-small icon-white"></i></li><li><a href="#" class="down">Swap Forward </a><i class="icon-arrow-right icon-white"></i></li><li><a href="#" class="up">Swap Back </a><i class="icon-arrow-left icon-white"></i></li><li><a href="#" class="remove">Remove </a><i class="icon-remove icon-white"></i></li></ul></div>');
      }
      console.log(photo.get('div_id'));
      if(photo.get('div_id') == 0){
        console.log($("a.down"))
        this.$("a.up").parent().remove();
      } else if (photo.get('div_id') == 3) {
        this.$("a.down").parent().remove();
      }
    });
  },

  remove: function(event) {
    event.preventDefault();
    var that = this;
    var divNum = $($(event.target).parents('.photo-tile')[0]).attr('data-id');
    toDelete = that.collection.findWhere({div_id: parseInt(divNum)});
    // filepicker.remove
    console.log(toDelete);
    that.collection.remove(toDelete);
    console.log(that.collection);
  },

  parse: function() {
    var that = this;
    var posArray = $("#photocontent").sortable( "toArray", {attribute: 'data-id'});
    _.each(posArray, function(pos, index) {
      if (that.collection.at(parseInt(pos))) {
        that.collection.at(parseInt(pos)).set({div_id: (index - 1)});
      }
    });
  },

  enableResize: function() {
    $("li#photocontent").resizable({
      grid: 220, handles: "e", minHeight: 200, minWidth: 200, maxWidth: 440
    });
  },

  clearTiles: function() {
    $('li#photocontent').children().empty(); 
  },

  expand: function(event) {
    event.preventDefault();
    var that = this;
    var divNum = $($(event.target).parents('.photo-tile')[0]).attr('data-id');
    var picModel = that.collection.findWhere({div_id: parseInt(divNum)});
    picModel.set({div_class: 'tilespan6'});
  },

  shrink: function(event) {
    event.preventDefault();
    var that = this;
    var divNum = $($(event.target).parents('.photo-tile')[0]).attr('data-id');
    var picModel = that.collection.findWhere({div_id: parseInt(divNum)});
    picModel.set({div_class: 'tilespan3'});
  },

  down: function(event) {
    event.preventDefault();
    var that = this;
    var divNum = $($(event.target).parents('.photo-tile')[0]).attr('data-id');
    var picModel1 = that.collection.findWhere({div_id: parseInt(divNum)});
    var picModel2 = that.collection.findWhere({div_id: (parseInt(divNum) + 1)});
    picModel1.set({div_id: (parseInt(divNum)+ 1)});
    if(picModel2) {
      picModel2.set({div_id: (parseInt(divNum))});
    }
  },

  up: function(event) {
    event.preventDefault();
    var that = this;
    var divNum = $($(event.target).parents('.photo-tile')[0]).attr('data-id');
    var picModel1 = that.collection.findWhere({div_id: parseInt(divNum)});
    var picModel2 = that.collection.findWhere({div_id: (parseInt(divNum) - 1)});
    picModel1.set({div_id: (parseInt(divNum) - 1)});
    picModel2.set({div_id: (parseInt(divNum))});
  }

});