const { GraphQLScalarType, Kind } = require("graphql");

// copied from https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/
// Uses milliseconds from unix epoch to serialize dates.
exports.dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Dates are serialized as a unix time stamp in milliseconds.",
  // Convert outgoing Date to integer for JSON
  serialize(value) {
    return value.getTime();
  },
  // Convert incoming integer to Date
  parseValue(value) {
    return new Date(value);
  },
  // Convert hard-coded AST string to integer and then to Date
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});
