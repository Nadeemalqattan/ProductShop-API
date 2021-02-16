const express = require("express");
const {
  productList,
  productDetail,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("../controllers/productControllers");
const router = express.Router();
const upload = require("../middleware/multer");

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

//single means uploading one image only
//image: the name of the model feild

//PRODUCT LIST
router.get("/", productList);

//PRODUCT DETAIL
router.get("/:productId", productDetail);

//DELETE
router.delete("/:productId", productDelete);

//UPDATE
router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
