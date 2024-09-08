const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema(
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
		mobile: {
			type: String,
			required: false,
			default: null
		},
		gender: {
			type: String,
			required: false,
			default: null
		},
		skills: {
			type: [Schema.Types.Mixed],
			required: false,
			default: null
		},
		profilePic: {
			type: String,
			required: false,
			default: null
		},
		designation: {
			type: String,
			required: false,
			default: null
		},
		twitter: {
			type: String,
			required: false,
			default: null
		},
		instagram: {
			type: String,
			required: false,
			default: null
		},
		facebook: {
			type: String,
			required: false,
			default: null
		},
		linkedin: {
			type: String,
			required: false,
			default: null
		},
		description: {
			type: String,
			required: false,
			default: null
		}
	},
	{ timestamps: { currentTime: () => Date.now() } },
);

UserSchema.plugin(mongoosePaginate)

UserSchema.pre('save', async function (next) {
	try {
		if (this.isNew) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(this.password, salt);
			this.password = hashedPassword;
		}
		next();
	} catch (error) {
		next(error);
	}
});

UserSchema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw error;
	}
};

const User = mongoose.model('user', UserSchema);
module.exports = User;
