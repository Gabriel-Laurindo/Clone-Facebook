const mongoose = require('../database')
const bcrypt = require('bcryptjs');

const MyImg = new mongoose.Schema({
	name: {
		type: String,
	},
	size: {
		type: Number,
	},
	key: {
		type: String,
	},
	url: {
		type: String,
	},

},
	{
		timestamps: true
	})

MyImg.pre("save", function () {
	console.log(this.url)
	if (!this.url) {
		this.url = `localhost:3001/files/${this.key}`
	}
})

const NewImg = mongoose.model('newImg', MyImg);

module.exports = NewImg

