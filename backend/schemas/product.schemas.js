const { Schema } = require("mongoose");

// const imgSchema = new mongoose.Schema({
//   title:String,
//   description:String,
//   file:Array
// });

// module.exports = imgSchema;

const ProductSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

module.exports = ProductSchema;