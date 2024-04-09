const pageModel = require("../models/pageModel");

exports.allPages = async (req, res) => {
  try {
    const pages = await pageModel.find();
    if (!pages) {
      res.status(404).json({
        error: "Pages not found !",
      });
    }
    res.send(pages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.findPage = async (req, res) => {
  try {
    const id = req.params.id;
    const page = await pageModel.findById(id);
    if (!page) {
      res.status(404).json({ error: "Page not found !" });
    }
    res.send(page);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createPage = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    if (!name || !slug || !description) {
      res.status(404).json("All fields is required !");
    }
    const page = new pageModel({ name, slug, description });
    await page.save();
    res.send({ name, slug });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.updatePage = async (req, res) => {
  try {
    const pageId = req.params.id;
    const page = await pageModel.findById(pageId);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    const updatedPage = await pageModel.findByIdAndUpdate(pageId, req.body, {
      new: true,
    });
    res.send(updatedPage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deletePage = async (req, res) => {
  try {
    const id = req.params.id;
    await pageModel.findByIdAndDelete(id);
    res.send("Category deleted successfully !!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
