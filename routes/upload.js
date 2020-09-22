const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const multerUpload = require("../utils/handlers/multer");
require("../utils/handlers/cloudinary");

router.post("/", multerUpload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    res.json({
      success: 1,
      file: {
        url: `${result.url}`,
      },
    });
  } catch {
    res.json({ sucess: 0 });
    console.log("error while uploading");
    res.status(400);
  }
});

module.exports = router;
