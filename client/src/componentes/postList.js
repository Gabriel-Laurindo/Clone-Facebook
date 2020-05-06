import React, { useEffect, useState } from 'react'
import './css/postList.css'
import gato from './img/gato_site.png'
import Modal_config from './modal_config'
import store from './store'
import socket from './socketConnection'



let i = 0;

export default function PostList() {
	const [publications, setPublications] = useState([''])
	const handleNewPost = newPost => {
		setPublications([...publications, newPost])
	}

	const handleDeletPost = deletPost => {
		console.log('teste1')
		let index = publications.findIndex(x => x._id == deletPost.id)
		let pubCopy = Object.assign([], publications)
		pubCopy.splice(index, 1)
		setPublications(pubCopy)
	}

	const handleComment = newComment => {
		let index = publications.findIndex(x => x._id == newComment._id)
		let pubCopy = Object.assign([], publications)
		pubCopy[index] = newComment
		console.log(newComment)
		setPublications(pubCopy)
	}
	const handleDeleteComment = comment => {
		let index = publications.findIndex(x => x._id == comment._id)
		let pubCopy = Object.assign([], publications)
		pubCopy[index] = comment
		setPublications(pubCopy)
	}

	useEffect(() => {
		socket.on('newPost', handleNewPost)
		socket.on('deletedPost', handleDeletPost)
		socket.on('newComment', handleComment)
		socket.on('deletedComment', handleDeleteComment)
		return () => {
			socket.off('newPost', handleNewPost)
			socket.off('deletedPost', handleDeletPost)
			socket.off('newComment', handleComment)
			socket.off('deletedComment', handleDeleteComment)
		}
	}, [publications])

	useEffect(() => {
		let url = 'http://localhost:3001/auth/post'
		const config = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}

		fetch(url, config)
			.then((resp) => resp.json())
			.then((resp) => {
				if (resp.error) {
					alert(resp.error)
				} else {
					setPublications(resp)
				}
			})
	}, [])

	if (publications[0] === '') {
		return <span>"loading..."</span>
	}
	return (
		publications.map(posts => (
			< Posts posts={posts} />
		))
	)
}



const Posts = (props) => {
	const editPost = (Post) => {
		const { post_id, decision, item } = Post
		if (decision === 'excluir' && item === 'post') {
			let url = 'http://localhost:3001/auth/post'
			let formDataJson = {
				id: post_id
			}

			let config = {
				method: 'DELETE',
				body: JSON.stringify(formDataJson),
				headers: {
					'Content-Type': 'application/json'
				}
			}

			fetch(url, config)
				.then((resp) => resp.json())
				.then((resp) => {
					if (resp.error) {
						alert(resp.error)
					} else {
						alert('excluido com sucesso')
					}
				})
		}
	}

	const editComment = (comment) => {
		let { commentId, post_id, decision } = comment
		if (decision === 'excluir') {
			let url = 'http://localhost:3001/auth/comment'
			let formDataJson = {
				commentId: commentId,
				postId: post_id
			}

			let config = {
				method: 'delete',
				body: JSON.stringify(formDataJson),
				headers: {
					'Content-Type': 'application/json'
				}
			}

			fetch(url, config)
				.then((resp) => resp.json())
				.then((resp) => {
					if (resp.error) {
						alert(resp.error)
					}
				})
		}
	}


	const registerComment = (text, post_id) => {
		if (text) {
			let url = 'http://localhost:3001/auth/comment'
			let token = localStorage.getItem('token')
			let formDataJson = {
				token: token,
				text: text,
				postId: post_id
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
				})
		}
	}

	let post_id = props.posts._id
	const [modal, setModal] = useState(false)
	const [modalComment, setModalComment] = useState({})

	const x = (props) => {
		let { item, id } = props
		let tmp = {}
		if (item === 'post') {
			if (store.currentModal) {
				store.currentModal(false)
			}
			if (!modal) {
				store.currentModal = setModal
			}
			setModal(!modal)
		}


		if (item === 'comentario') {
			tmp[id] = true
			if (modalComment[id]) {
				tmp[id] = false
			}
			setModalComment(tmp)
		}
	}

	return (
		<div key={props.posts._id} className="post" >
			<div className="post_handle_user">
				<div className="post_usuario" >
					<img className="img-profile" src={gato} />
					<a href="#">{props.posts.firstName} {props.posts.lastName}</a>
				</div>
				<div className="dot" onClick={() => x({ item: 'post' })}>
					<Modal_config open={modal} className={'config_sair_click_post config_sair_click'}>
						<li>Salvar Publicacão</li>
						<li onClick={() => editPost({ post_id, decision: 'editar', item: 'post' })}>Editar Publicacão</li>
						<li>Alterar Data</li>
						<li>Desativar Notificacoes</li>
						<li>Ocultar Na Linha do tempo</li>
						<li onClick={() => editPost({ post_id, decision: 'excluir', item: 'post' })}>Excluir Publicacão</li>
					</Modal_config>
				</div>
			</div>

			<div className="post_conteudo">
				<div className="post_text">
					<p>{props.posts.text}</p>
				</div>
				{props.posts.img ? (
					<div className="post_img">
						<img width="100%" height="100%" src={props.posts.img.url} />
					</div>
				) : <></>
				}
			</div>

			<div className="post_interaco">
				<ul>
					<li><div className="post_curtir post_sub_handler">Curtir</div></li>
					<li><div className="post_comentar post_sub_handler">Comentar</div></li>
					<li><div className="post_compartilhar post_sub_handler">Compartilhar</div></li>
				</ul>
			</div>
			<div className="post_comentario">
				{props.posts.comment.map(comment => (
					< div className="post_comentario_uni" key={comment._id} >
						<div className="box_conteudo">
							<div className="box_img">
								<img src={gato} width="35px" height="35px" />
							</div>
							<div className="box_texto">
								<p><a className="op_comentario">{comment.firstName + ' ' + comment.lastName}</a>
									{comment.text}
								</p>

							</div>
						</div>
						<div className="post_comentario_opcoes">
							<span className="dot_comentario" onClick={() => x({ item: 'comentario', id: comment._id })}><p>...</p>
								<Modal_config open={modalComment[comment._id]} className={'config_sair_click_comentario config_sair_click'}>
									<li onClick={() => editComment({ post_id, commentId: comment._id, decision: 'editar' })}>Editar...</li>
									<li onClick={() => editComment({ post_id, commentId: comment._id, decision: 'excluir' })}>Excluir...</li>
								</Modal_config>
							</span>
						</div>
					</div>
				))}

			</div>
			<div className="post_comentarios">
				<div className="box_img">
					<img src={gato} width="35px" height="35px" />
				</div>
				<div className="box_input">
					<div>

					</div>
					<input
						className="post_comentarios_text"
						placeholder="Escreva um comentario..."
						onKeyPress={
							e => {
								if (e.key === "Enter") {
									registerComment(e.target.value, post_id);
									e.target.value = ''
								}
							}
						}
					/>
				</div>
			</div>
		</div >
	)
}


