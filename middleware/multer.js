const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media", //it starts from app.js thats why only one . for the path
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage }); //it let us upload our images

module.exports = upload;
