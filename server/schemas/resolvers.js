const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const resolvers = {
  Query: {
    me: async (parent, context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            return userData;
        }
        throw new AuthenticationError('Not logged in');
    }
  },
};

module.exports = resolvers;
