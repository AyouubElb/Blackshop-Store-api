const menuModel = require("../models/menuModel");

exports.allMenus = async (req, res) => {
  try {
    const menus = await menuModel.find().populate("links");
    if (!menus) {
      res.status(404).json({
        error: "Menus not found !",
      });
    }
    res.send(menus);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createMenu = async (req, res) => {
  try {
    const { name, links } = req.body;
    if (!name) {
      res.status(404).json("Name is required !");
    }
    const menu = new menuModel({ name, links });
    await menu.save();
    res.send({ name });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const menu = await menuModel.findById(menuId);
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    const updatedMenu = await menuModel.findByIdAndUpdate(menuId, req.body, {
      new: true,
    });
    res.send(updatedMenu);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
