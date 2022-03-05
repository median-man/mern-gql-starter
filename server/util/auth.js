const jwt = require("jsonwebtoken");
const util = require("util");

const { SECRET, TOKEN_EXP } = process.env;

jwt.sign = util.promisify(jwt.sign);
jwt.verify = util.promisify(jwt.verify);

const signToken = (user) => {
  // TODO: customize the data encoded within the token
  const data = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  return jwt.sign({ data }, SECRET, {
    expiresIn: TOKEN_EXP,
  });
};

const authMiddleware = async ({ req }) => {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // Split the token string into an array and return actual token
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
  try {
    const { data } = await jwt.verify(token, SECRET, { maxAge: TOKEN_EXP });
    req.user = data;
  } catch (err) {
    console.log(`Invalid token received. Token: "${token}"`);
  }

  // return the request object so it can be passed to the resolver as `context`
  return req;
};

module.exports = {
  signToken,
  authMiddleware,
};
