const mongoose = require('mongoose')


mongoose.connect('mongodb://db/noderest', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;