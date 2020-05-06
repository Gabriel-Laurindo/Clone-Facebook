const mongoose = require('../database')
const bcrypt = require('bcryptjs');
const MyImage = require('./img')
const MyPosts = new mongoose.Schema({
	text: {
		type: String,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	userId: {
		type: String,
	},
	img: {
		name: String,
		size: Number,
		url: String,
		key: String
	},
	comment: [{
		firstName: String,
		lastName: String,
		userId: String,
		text: String
	}
	],
},
	{
		timestamps: true
	})

const newPost = mongoose.model('newPost', MyPosts);

module.exports = newPost