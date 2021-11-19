const { Schema } = require("mongoose");

// const imgSchema = new mongoose.Schema({
//   title:String,
//   description:String,
//   file:Array
// });


// module.exports = imgSchema;


const CategorySchema = new Schema({
  title: String,
  description: String,
});

module.exports = CategorySchema;
