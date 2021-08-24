const jwt = require("jsonwebtoken");
const util = require("util");

jwt.sign = util.promisify(jwt.sign);

const signToken = (user) => {
  const data = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  return jwt.sign({ data }, process.env.SECRET, {
    expiresIn: "2h",
  });
};

module.exports = {
  signToken,
};
