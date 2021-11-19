const mongoose = require("mongoose");
const express = require("express");
const body = require("body-parser");
const cors = require("cors");
const app = express();

app.use(body.json());
app.use(cors({ origin: "*" }));

const Database = require("./database");
const productSchema = require("../schemas/product.schemas");
const categorySchema = require("../schemas/category.schemas");


const db = new Database();

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);



// ROUTES
app.get('/', function (req, res) {
  res.send({ test: "test" });
})

app.get("/api/category", async (req, res) => {
  let result = await Category.find();
  res.send(result);
});
app.get("/api/product", async (req, res) => {
  let result = await Product.find();
  res.send({
    items: result,
  });
});

function sortByAlphabet(op = null, sort, skip, limit) {
  if (op == null) {

    return Product.find().sort({ title: sort }).skip(skip).limit(limit)
  } else {
    return Product.find({ category: op }).sort({ title: sort }).skip(skip).limit(limit)

  }
}
function sortByPrice(op, sort, skip, limit) {
  if (op == null) {
    return Product.find().sort({ price: sort }).skip(skip).limit(limit)
  } else {
    return Product.find({ category: op }).sort({ price: sort }).skip(skip).limit(limit)
  }
}

app.get("/api/product/:page", async (req, res) => {
  let { perItem, sort, sortPrice } = req.query;
  let page = req.params.page;
  let options = {
    limit: parseInt(perItem) || 10,
    page: parseInt(page),
    sort: sort || null,
    sortPrice: sortPrice || null
  }
  let result;
  let skip = (options.page - 1) * options.limit;
  if (options.sort == null && options.sortPrice == null) {
    result = await Product.find().skip(skip).limit(options.limit);
  } else if (options.sortPrice != null) {
    let temp = (options.sortPrice == "asc") ? 1 : -1;
    result = await sortByPrice(temp, skip, options.limit);
  } else if (options.sort != null) {
    let temp = (options.sort == "asc") ? 1 : -1;
    result = await sortByAlphabet(temp, skip, options.limit);
  }
  res.send(result);
});





app.get("/api/pcount", async (req, res) => {
  let result = await Product.countDocuments();
  res.send([result])
});

app.get("/api/ccount", async (req, res) => {
  let { id } = req.query;
  let result = await Product.find({category:id}).countDocuments();
  res.send([result])
});

app.post("/api/product", async (req, res) => {
  let { product } = req.body;
  // let category = product.category;
  // product.category = []
  // for (let i = 0; i < category.length; i++) {
  //   let result = await Category.find({ title: category[i].title })
  //   product.category.push(`${result[0]._id}`)
  // }
  const result = new Product(product);
  db.createTask(result);
  res.send({ message: result })
});

app.get("/api/product/category/:id/:page", async (req, res) => {
  let { id, page } = req.params;
  let { perItem, sort, sortPrice } = req.query;
  let options = {
    limit: parseInt(perItem) || 10,
    page: parseInt(page),
    sort: sort || null,
    sortPrice: sortPrice || null
  }
  let result;
  let skip = (options.page - 1) * options.limit;
  if (options.sort == null && options.sortPrice == null) {
    result = await Product.find({ category: id }).skip(skip).limit(options.limit);
  } else if (options.sortPrice != null) {
    let temp = (options.sortPrice == "asc") ? 1 : -1;
    result = await sortByPrice(id, temp, skip, options.limit);
  } else if (options.sort != null) {
    let temp = (options.sort == "asc") ? 1 : -1;
    result = await sortByAlphabet(id, temp, skip, options.limit);
  }
  res.send(result);
});

app.get("/api/product/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Product.find({ _id: id });
  res.send({
    items: result,
  });
});
app.get("/api/category/:id", async (req, res) => {
  let id = req.params.id;
  let result = await Category.find({ _id: id });
  res.send({
    items: result,
  });
});

app.post("/api/category", (req, res) => {
  let { category } = req.body;
  const newCate = new Product(category);
  db.createTask(newCate);
  res.send({ message: newCate })
});
// app.get("/tasks", async (req, res) => {
//   let result = await Task.find();
//   res.send({
//     items: result,
//   });
// });

// app.post("/createTasks", (req, res) => {
//   let { name, content } = req.body;
//   const task1 = new Task({
//     name: name,
//     content: content,
//     createDate: Date.now(),
//     deadLine: Date.now() + 1000 * 60 * 60 * 24,
//   });

//   db.createTask(task1);
//   res.send(`item ${name} was created`);
// });

// app.delete("/delete", async (req, res) => {
//   const { name } = req.query;
//   try {
//     await Task.findOneAndRemove(name);
//     res.send(`destroy ${name}`);
//   }catch(e){
//       res.send({
//           message: `can't delete ${name}`
//       })
//   }
// });

// app.put("/update",async(req,res)=>{
//     const{name}=req.query;

//     Task.findOneAndUpdate(name,{
//         content:"hello"
//     })

//     res.send(`update ${name}`)
// })

module.exports = app;
