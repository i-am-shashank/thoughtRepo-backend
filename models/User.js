const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema();
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const STRING_REQ = { type: String, required: true };

const UserSchema = new mongoose.Schema({
  username: { ...STRING_REQ, unique: true },
  email: { ...STRING_REQ, unique: true },
  bio: String,
  avatar: String,
  passwordHash: STRING_REQ,
  followingUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

UserSchema.methods.setPassword = async function (password) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id, username: this.username }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    avatar:
    this.avatar || `https://ui-avatars.com/api/?size=128&name=${this.username}`,
  };
};

UserSchema.methods.validPassword = function (password) {
  const valid = bcrypt.compareSync(password, this.passwordHash)
  return valid ? this.toAuthJSON() : null;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
