const express = require("express");
const { Product } = require("../db/models");
const {
  productCreate,
  productList,
  productDetail,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("../controllers/productControllers");
const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const foundProduct = await fetchProduct(productId, next);
  if (foundProduct) {
    req.product = foundProduct;
    next();
  } else {
    next({
      status: 404,
      message: "Product not found",
    });
  }
});

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
