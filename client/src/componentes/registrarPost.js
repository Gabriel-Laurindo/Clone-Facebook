import React, { useState, useContext, useEffect } from 'react'
import gato from './img/gato_site.png'
import './css/globalContainer.css'
import PostList from './postList'
import context from './globalContext'
import { observer } from 'mobx-react'
import Dropzone from 'react-dropzone'
import socket from './socketConnection'
import { set } from 'mobx'


const UserName = observer(({ full }) => <p> {full.user.firstName}</p>
)


export default function RegistrarPost() {
	const [publication, setPublication] = useState('')
	const [pubImg, setPubImg] = useState('')
	const [img, setImg] = useState('')
	// const [chave, setChave] = useState('')

	const registrar_post_img = (id) => {
		let url = 'http://localhost:3001/auth/postImg'
		const data = new FormData()
		data.append('file', pubImg)
		data.append('postId', id)
		console.log(data)
		const config = {
			method: 'POST',
			body: data,
		}
		fetch(url, config)
	}

	const registrarPost = (event) => {
		setImg('')
		event.preventDefault()
		let url = 'http://localhost:3001/auth/post'
		let token = localStorage.getItem('token')
		let formDataJson = {
			token: token,
			text: publication,
			imagem: pubImg
		}

		const config = {
			method: 'POST',
			body: JSON.stringify(formDataJson),
			headers: {
				'Content-Type': 'application/json'
			}
		}
		fetch(url, config)
			.then((resp) => {
				return resp.json()
			})
			.then((resp) => {
				if (resp.error) {
					alert(resp.error)
				}
				else {
					if (pubImg)
						registrar_post_img(resp._id)
				}
			})
	}


	return (
		<context.Consumer>
			{full => (
				<div className="criarPubli">
					<div className="criarPubli_titulo">
						<h1>Criar Publicacão</h1>
					</div>


					<div className="criarPubli_post">
						<Dropzone accept="image/*" onDropAccepted={() => { }}>
							{({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
								<div className="container_conteudo">
									<div className="criarPubli_escrever" {...getRootProps()}>
										<div className="criarPubli_foto">
											<img alt='' className="gato" src={gato}></img>
										</div>
										<form autocomplete="off" className="criarPubli_Text">
											<input
												placeholder='No que você esta pensando?'
												type='text'
												name="publicacao"
												onChange={e => setPublication(e.target.value)}
												id="publicacao"
											/>
											<button onClick={registrarPost}>Publicar</button>
										</form>
									</div>
									{img ? (
										<div className="boxes_preview">
											<div className="preview-img">
												<img src={img} width="100px" height="100px"></img>
											</div>
										</div>
									) : <></>
									}
								</div>
							)}
						</Dropzone>

						<div className="criarPubli_interacao">
							<ul>
								<input id='selecao-arquivo' type="file" onChange={e => {
									setPubImg(e.target.files[0])
									setImg(URL.createObjectURL(e.target.files[0]))

								}} />
								<li><label for='selecao-arquivo'><div className="foto"></div>Foto/video</label></li>
								{/* <li><div className="foto"></div>Foto/video</li> */}
								<li><div className="marcar"></div>Marcar amigos</li>
								<li><div className="sentimento"></div>Sentimento/...</li>
								<li className="pontos">...</li>
							</ul>
						</div>
					</div>


				</div>
			)}
		</context.Consumer>
	)
}
