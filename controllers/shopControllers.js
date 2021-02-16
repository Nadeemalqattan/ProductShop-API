const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    return foundShop;
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: req.body,
      include: {
        model: Product,
        as: "products",
        attributes: { exclude: ["createdAt", "updatedAt", "shopId"] },
      },
    });
    res.status(200).json(shops);
  } catch (error) {
    next(error);
  }
};

exports.shopDetail = async (req, res, next) => {
  res.json(req.shop);
};

exports.shopDelete = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.shopUpdate = async (req, res, next) => {
  try {
    await req.shop.update(req.body);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    req.body.shopId = req.shop.id;
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
