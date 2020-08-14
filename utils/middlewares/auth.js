const jwt = require("express-jwt");
const { JWT_SECRET } = require("../../config");

const getTokenFromHeader = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    return req.headers.authorization.split(" ")[1];
  return null;
};

const auth = {
  required: jwt({
    secret: JWT_SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  }),

  optional: jwt({
    credentialsRequired: false,
    secret: JWT_SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeader,
    algorithms: ["HS256"],
  }),
};

module.exports = auth;
