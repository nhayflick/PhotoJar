PJ.Views.EditJarView = Backbone.View.extend({

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
    this.collection.on('change', renderCallback);
    this.collection.on('add', renderCallback);
    this.collection.on('remove', renderCallback);
    this.collection.on('save', parse);
  },

  render: function() {
    var that = this;
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
        $tile.parent().removeClass('tilespan0 tilespan3 tilespan6');
        $tile.parent().addClass(photo.get('div_class'));
      }
      $tile.append('<img src="' + photoURL + '/convert?w=430&h=' + height + '&fit=crop" class="rounded-photo"/>');
      $tile.append('<div class="hidden-menu"><ul class="palette" style=" list-style-type: none;"><li><a href="#" class="expand">Expand</a></li><li><a href="#" class="shrink">Shrink</a></li><li><a href="#" class="up">Up</a></li><li><a href="#" class="down">Down</a></li><li><a href="#" class="remove">Delete</a></li></ul></div>');
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