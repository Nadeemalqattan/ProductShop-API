const express = require("express");
const { Product } = require("../db/models");
const {
  productCreate,
  productList,
  productDetail,
  productDelete,
  productUpdate,
} = require("../controllers/productControllers");
const router = express.Router();

//ADD NEW PRODUCT
router.post("/", productCreate);
//PRODUCT LIST
router.get("/", productList);

//PRODUCT DETAIL
router.get("/:productId", productDetail);

//DELETE
router.delete("/:productId", productDelete);

//UPDATE
router.put("/:productId", productUpdate);

module.exports = router;
