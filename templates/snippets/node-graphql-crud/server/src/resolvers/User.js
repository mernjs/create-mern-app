const User = require('../models/User')

const resolvers = {

  	Query: {
		users: async () => {
			const users = await User.find();
			return users;
		},
  	},

  	Mutation: {

		createUser: async (_, args) => {
			const user = await new User({ ...args}).save();
			return user;
		},

		updateUser: async (_, { _id, ...args }) => {
			const user = await User.findOneAndUpdate({ _id }, { $set: args }, { new: true });
			return user;
		},

		removeUser: async (_, args) => {
			await User.remove(args);
			return {
				_id: args._id,
			};
    	},

  	}

}

module.exports = resolvers