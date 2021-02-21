const express = require("express");
const {
  productCreate,
  shopCreate,
  shopList,
  shopDetail,
  shopDelete,
  shopUpdate,
  fetchShop,
} = require("../controllers/shopControllers");
const router = express.Router();
const upload = require("../middleware/multer");

router.param("shopId", async (req, res, next, shopId) => {
  const foundShop = await fetchShop(shopId, next);
  if (foundShop) {
    req.shop = foundShop;
    next();
  } else {
    next({
      status: 404,
      message: "Shop not found",
    });
  }
});

//single means uploading one image only
//image: the name of the model feild
//ADD NEW SHOP
router.post("/", upload.single("image"), shopCreate);
//PRODUCT LIST
router.get("/", shopList);

//PRODUCT DETAIL
router.get("/:shopId", shopDetail);

//DELETE
router.delete("/:shopId", shopDelete);

//UPDATE
router.put("/:shopId", upload.single("image"), shopUpdate);

//ADD NEW PRODUCT
router.post("/:shopId/products", upload.single("image"), productCreate);

module.exports = router;
