const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Routes
const productRoutes = require("./routes/productRoute");
const categoryRoutes = require("./routes/categoryRoute");
const pageRoutes = require("./routes/pageRoute");
const menuRoutes = require("./routes/menuRoute");
const orderRoutes = require("./routes/orderRoute");

//config
const app = express();
require("dotenv").config();

// Middelware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes Middleware
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/orders", orderRoutes);

//Run the app
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("Database is connected ..."))
  .catch((err) => console.log(`Database could not connect ... ${err}`));

app.listen(port, () => console.log(`App is running on port : ${port}`));
