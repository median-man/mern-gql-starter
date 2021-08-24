const jwt = require("jsonwebtoken");
const util = require("util");
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../util/auth");

const resolvers = {
  Query: {},
  Mutation: {
    createUser: (parent, args) => User.create({ ...args }),
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid username or password");
      }
      const authentic = await user.isCorrectPassword(password);
      if (!authentic) {
        throw new AuthenticationError("Invalid username or password");
      }
      const token = await signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
