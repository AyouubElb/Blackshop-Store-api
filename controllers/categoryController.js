const categoryModel = require("../models/categoryModel");
const fs = require("fs");
const mongoose = require("mongoose");

exports.allCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      res.status(404).json({
        error: "categories not found !",
      });
    }
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.findCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findById(id);
    if (!category) {
      res.status(404).json({ error: "Category not found !" });
    }
    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file.filename;
    const category = new categoryModel({ name, description, image });
    await category.save();
    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (req.file) {
      req.body.image = req.file.filename;
      if (category.image) {
        fs.unlinkSync(`public/Images/${category.image}`);
      }
    }
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true }
    );

    res.send(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// exports.deleteCategory = async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log("id", id);
//     const category = await categoryModel.findOne({ _id: id });
//     await categoryModel.findByIdAndDelete(id);
//     fs.unlinkSync(`public/Images/${category.image}`);
//     res.send("Category deleted successfully !!");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

exports.deleteCategory = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const id = req.params.id;
    const category = await categoryModel.findById(id).session(session);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await categoryModel.findByIdAndDelete(id).session(session);
    fs.unlinkSync(`public/Images/${category.image}`);

    await session.commitTransaction();
    session.endSession();

    res.send("Category deleted successfully !!");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(error);
    res.status(500).json(error);
  }
};
