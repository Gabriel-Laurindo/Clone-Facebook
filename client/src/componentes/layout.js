import React from 'react'
import Nav from '../componentes/nav'

export default function Layout({ children }) {

	return (
		<div className="x" >
			<Nav></Nav>
			{children}
		</div>
	)
}