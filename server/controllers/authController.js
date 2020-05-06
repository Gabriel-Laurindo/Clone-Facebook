const express = require('express')
const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth')
const User = require('../models/user')
const newPost = require('../models/posts')
const jwt = require('jsonwebtoken')
const router = express.Router()
const io = require('../socketConnection')
const multer = require('multer')
const multerConfig = require('../config/multer')
const NewImg = require('../models/img')

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400
	})
}

router.post('/register', async (req, res) => {
	const { email } = req.body;
	console.log(req.body)
	try {
		if (await User.findOne({ email })) {
			return res.status(400).send({ error: 'User already exists' })
		}
		const user = await User.create(req.body);

		user.password = undefined

		return res.send({ user, token: generateToken({ id: user.id }) })
	}
	catch (err) {
		return res.status(400).send({ error: + err })
	}
})

router.delete('/post', async (req, res) => {
	const { id } = req.body;
	try {

		io.emit('deletedPost', { id })
		newPost.findByIdAndDelete(id, function (err) {
			if (err) {
				console.log(err)
			}
			else {
				console.log({ id })
			}
		})
	}
	catch (err) {
		return res.status(400).send({ error: + err })
	}
})

router.delete('/comment', async (req, res) => {
	const { postId, commentId } = req.body;
	try {
		await newPost.updateMany({ _id: postId }, { $pull: { comment: { _id: commentId } } }, { multi: true })
	}
	catch (err) {
		return res.status(400).send({ error: + err })
	}
	let comment = await newPost.findOne({ _id: postId })
	io.emit('deletedComment', comment)
})

router.post('/comment', async (req, res) => {
	let comment = await req.body;
	let token = await jwt.decode(comment.token)
	let id = token.id
	let { postId } = req.body
	try {
		let user = await User.findOne({ _id: id })
		let commentBody = {
			firstName: user.firstName,
			lastName: user.lastName,
			userId: user._id,
			text: comment.text,
		}
		await newPost.updateOne({ _id: postId }, { $push: { comment: commentBody } })
		let newComment = await newPost.findOne({ _id: postId })
		io.emit('newComment', newComment)
		return res.json(newComment)
	}
	catch (err) {
		return res.status(400).send({ error: err.message })
	}
})


router.post('/post', async (req, res) => {
	let post = await req.body;
	let token = await jwt.decode(post.token)
	let id = token.id
	try {
		let user = await User.findOne({ _id: id })
		let postData = {
			text: post.text,
			img: {},
			firstName: user.firstName,
			lastName: user.lastName,
			userId: user._id,
		}
		if (post.image) {
			const insertedPost = await newPost.create(postData);
			return res.json(insertedPost)
		}
		else {
			const insertedPost = await newPost.create(postData);
			io.emit('newPost', insertedPost)
			return res.json(insertedPost)
		}
	}
	catch (err) {
		console.log(err)
		return res.status(400).send({ error: err })
	}
})

router.post('/postImg', multer(multerConfig).single('file'), async (req, res) => {
	const { originalname: name, size, key } = req.file;
	const { postId } = req.body
	try {
		let img = {
			name,
			size,
			key,
			url: await `http://localhost:3001/files/${key}`,
		}
		let post = await newPost.findByIdAndUpdate({ _id: postId }, { img })
		post.img = img
		io.emit('newPost', post)
		return res.json(post)
	}
	catch (err) {
		return res.status(400).send({ error: err })
	}
})

router.post('/profile', multer(multerConfig).single('file'), async (req, res) => {
	console.log(req.file)
	const { originalname: name, size, key } = req.file;
	let { token } = req.body
	token = await jwt.decode(token)
	console.log(token)
	let id = token.id
	try {
		let img = {
			name,
			size,
			key,
			url: await `http://localhost:3001/files/${key}`,
		}
		let profileimg = await Users.findByIdAndUpdate({ _id: id }, { profileImg: img })

		return res.json(profileimg)
	}
	catch (err) {
		return res.status(400).send({ error: err })
	}
})

router.get('/post', async (req, res) => {
	try {
		let allPosts = await newPost.find({ user: Object })
		res.send(allPosts.reverse())
	}
	catch (err) {
		res.status(400).send({ error: err })
	}
})

router.post('/authenticate', async (req, res) => {

	const { email, password } = req.body

	const user = await User.findOne({ email }).select('+password')

	if (!user) {

		return res.status(400).send({ error: 'user not found' })
	}

	if (!await bcrypt.compare(password, user.password)) {
		return res.status(400).send({ error: 'invalid password' })
	}

	else {
		user.password = undefined
		res.send({ user, token: generateToken({ id: user.id }) })
	}

})

module.exports = app => app.use('/auth', router)