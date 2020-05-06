const mongoose = require('../database')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	profileImg: {
		name: String,
		size: Number,
		url: String,
		key: String
	},
},
	{
		timestamps: true
	})


UserSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash

	next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User