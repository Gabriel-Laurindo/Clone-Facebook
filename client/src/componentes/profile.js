import React, { useState, useContext, useEffect } from 'react'
import gato from './img/gato_site.png'
import './css/globalContainer.css'
import PostList from './postList'
import context from './globalContext'
import { observer } from 'mobx-react'
import Dropzone from 'react-dropzone'
import socket from './socketConnection'
import { set } from 'mobx'





export default function Profile() {

	const [pubImg, setPubImg] = useState('')
	const registrar_post_img = () => {

		let url = 'http://localhost:3001/auth/profileImg'
		let token = localStorage.getItem('token')
		const data = new FormData()
		console.log(pubImg)
		data.append('file', pubImg)
		data.append('token', token)
		const config = {
			method: 'POST',
			body: data,
		}
		if (pubImg) {
			fetch(url, config)
		}
	}

	useEffect(() => {
		registrar_post_img()
	}, [pubImg])


	return (
		<div>
			<input type="file" onChange={e => {
				setPubImg(e.target.files[0])
				console.log(e.target.files[0])
			}} />
		</div>
	)
}