import React, { useEffect, useContext } from 'react'
import RegistrarPost from './registrarPost'
import PageletNavigation from './pageletNavigation'
import Layout from './layout'
import PostList from './postList'
import store from './store'


export default function GlobalContainer() {
	useEffect(() => {
		let pegarUser = localStorage.getItem('user')
		store.user = JSON.parse(pegarUser)
		if (!localStorage.getItem('token')) {
			localStorage.setItem('token', store.token)
			localStorage.setItem('user', JSON.stringify(store.user))
		}
	}, [])


	return (
		<Layout>
			<div className="Global-Container">
				<PageletNavigation />
				<div className="time-Line">
					<RegistrarPost />
					<PostList />
				</div>
			</div>
		</Layout>

	)

}
