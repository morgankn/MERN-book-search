const { User, Book } = require ('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { findOneAndUpdate, findOneAndRemove } = require('../models/User');


const resolvers = {
    Query: {
 
     me: async (parent, args, context) => {
        if (context.user) {
          return Profile.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
    Mutation: {
        async addUser(parent, args, context) {
            const user = await User.create(args);
        
            if (!user) {
              throw new AuthenticationError("Something went wrong")
            }
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({email});
            if (!user) {
              throw new AuthenticationError("Incorrect login")
            }
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent, { newBook }, context ) => {
            if (context.user) {
              const updatedUser = await findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: { bookId: bookId } } },
                { new: true }
              )
              return updatedUser;
            }
            throw new AuthenticationError("You must be logged in")
          },
          removeBook: async (parent, { newBook }, context ) => {
            if (context.user) {
              const updatedUser = await findOneAndRemove(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
              )
              return updatedUser;
            }
          },
    }
    }

module.exports = resolvers;