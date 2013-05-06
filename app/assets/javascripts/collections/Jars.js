PJ.Collections.Jars = Backbone.Collection.extend({
  model: PJ.Models.Jar,
  url: '/jars',
  // comparator: function(jar) {
  //   console.log (new Date(jar.get("created_at")))
  //   return new Date(jar.get("created_at"))
  // }
});