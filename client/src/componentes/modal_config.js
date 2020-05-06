import React, { useEffect, useState } from 'react'
import { set } from 'mobx'


const Modal_config = (props) => {

	return props.open ? (
		<div className={props.className} >
			<ul>
				{props.children}
			</ul>
		</div>
	) : <></>
}


export default Modal_config