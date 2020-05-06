import { observer } from "mobx-react"
import { observable, autorun } from 'mobx'

const store = observable({
	user: {
		firstName: '',
		lastName: ''
	},
	posts: [],
	token: '',
	currentModal: false
})

export default store