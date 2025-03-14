const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
  	{ timestamps: { currentTime: () => Date.now() } }
);

const User = mongoose.model('user', UserSchema);

module.exports = User;