import React from 'react'
import { observer } from 'mobx-react'

const UserName = observer((props) => {
	const user = props.full.user
	let name = ""
	if (props.firstNameOnly) {
		name = user.firstName
	} else {
		name = `${user.firstName} ${user.lastName}`
	}
	return <span>{name}</span>
})

export default UserName