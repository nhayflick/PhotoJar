PJ.Collections.Jars = Backbone.Collection.extend({
  model: PJ.Models.Jar,
  url: '/jars',
  comparator: function(a, b) {
    return a.get("created_at") < b.get("created_at")
  }
});