const { User } = require("../models");

const resolvers = {
  Query: {},
  Mutation: {
    createUser: (parent, args) => User.create({ ...args }),
  },
};

module.exports = resolvers;
