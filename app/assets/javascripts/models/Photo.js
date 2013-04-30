PJ.Models.Photo = Backbone.RelationalModel.extend({
  urlRoot: 'photos',



//     readFile: function(file) {
//     var reader = new FileReader();
//     // closure to capture the file information.
//     reader.onload = (function(theFile,that) {
//         return function(e) {
//             //set model
//             that.set({filename: theFile.name, data: e.target.result});

//         };
//     })(file,this);

//     // Read in the image file as a data URL.
//     reader.readAsDataURL(file);
// }   ,

//   toJSON: function() {
//     var json = _.clone(this.attributes);
//     json.file = this.readFile(json.file);
//     json.image_file_name = json.name;
//     delete json.name;
//     json.image_updated_at = json.lastModifiedDate;
//     console.log(json.lastModifiedDate);
//     console.log(json.image_updated_at);
//     delete json.lastModifiedDate;
//     delete json.webkitRelativePath;
//     json.image_content_type = json.type;
//     delete json.type;
//     json.image_file_size = json.size;
//     delete json.size;
//     console.log(json);
//     return {photos: json};
//   }

});