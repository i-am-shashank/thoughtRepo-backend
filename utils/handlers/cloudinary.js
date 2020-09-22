const cloudinary = require("cloudinary");
const { CLOUD_NAME, KEY, SECRET } = require("../../config");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: KEY,
  api_secret: SECRET,
});
