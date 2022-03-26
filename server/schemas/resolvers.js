const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const resolvers = {
  Query: {
    me: async (parent, context) => {
        if (context.user) {
            const foundUser = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            return foundUser;
        }
        throw new AuthenticationError('You are not logged in!!');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: {savedBooks: book} },
              { new: true }
          )
          return updatedUser;
      }
      throw new AuthenticationError('You have to be logged in!!')
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              {_id: context.user._id},
              { $pull: { savedBooks: { bookId: bookId }}},
              { new: true }
          )
          return updatedUser;
      }
    } 
  }

};

module.exports = resolvers;
