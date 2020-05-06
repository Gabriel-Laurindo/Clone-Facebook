import React, { useState, useContext } from 'react'
import './css/autenticacao.css'
import auth_img from './img/facebook_login.png'
import context from './globalContext'
import useReactRouter from 'use-react-router';
const meses = [`Jan`, `Fev`, `Mar`, `Abr`, `Mai`, `Jun`, 'Jul', 'Sete', 'Out', 'Nov', 'Dez']

export default function Auth() {
	const { history, location, match } = useReactRouter()
	const [myEmail, setMyEmail] = useState([''])
	const [myPassword, setMyPassword] = useState([''])
	const [newEmail, setNewEmail] = useState([''])
	const [firstName, setfirstName] = useState([''])
	const [lastName, setlastName] = useState([''])
	const [newPassword, setnewPassword] = useState([''])



	const dias = () => {
		var i = []
		for (var a = 1; a < 32; a++) {
			i[a] = a
		}
		return i
	}

	const ano = () => {
		var ano = []
		var x = 0;
		for (var ano0 = 1901; ano0 < 2020; ano0++) {

			x++
			ano[x] = ano0
		}
		return ano
	}



	const cadastrar = (event) => {
		event.preventDefault();

		const url = 'http://localhost:3001/auth/register'
		//VALIDACAO DE FORMULARIOS
		let validarfirstName = firstName.replace(/^\s|\s$/, '')
		let validarlasttName = firstName.replace(/^\s|\s$/, '')
		if (validarlasttName === '' && validarfirstName) {
			alert('Preencha o formulario corretamente')
		} else if (
			newEmail === '' ||
			newEmail.indexOf('@') === -1 ||
			newEmail.indexOf('.') === -1
		) {
			alert('Email digitado incorretamente')
		} else {
			let formDataJson = {
				"firstName": firstName,
				"lastName": lastName,
				"password": newPassword,
				"email": newEmail,
				"profileImg": {}
			}
			const config = {
				method: 'POST',
				body: JSON.stringify(formDataJson),
				headers: {
					'Content-Type': 'application/json'
				},
			}
			fetch(url, config)
				.then((resp) => resp.json())
				.then((resp) => {
					if (resp.error) {
						alert(resp.error)
					} else {
						alert('Cadastro corretamente')
					}
				})
		}
	}

	const logar = (event) => {
		event.preventDefault();
		const url = 'http://localhost:3001/auth/authenticate'
		if (
			myEmail === '' ||
			myEmail.indexOf('@') === -1 ||
			myEmail.indexOf('.') === -1
		) {
			alert('Email digitado incorretamente')
		} else {
			let formDataJson = {
				"email": myEmail,
				"password": myPassword
			}
			const config = {
				method: 'POST',
				body: JSON.stringify(formDataJson),
				headers: {
					'Content-Type': 'application/json'
				},
			}
			fetch(url, config)
				.then((resp) => resp.json())
				.then((resp) => {
					if (resp.error) {
						alert(resp.error)
					}
					else {
						context.user = resp.user
						context.token = resp.token
						localStorage.setItem('token', context.token)
						localStorage.setItem('user', JSON.stringify(context.user))
						history.push('/home')
					}
				})
		}
	}




	return (
		<context.Consumer>
			{full => (
				<div className="autenticacao_header">
					<div className="auth_body">
						<div className="auth_logo"></div>

						<form className="auth_entradas">
							<div className="auth_credenciais">
								<h2>Email ou telefone</h2>
								<input
									type="text"
									name="MyEmail"
									onChange={e => setMyEmail(e.target.value)}
									id="name"
								/>
							</div>

							<div className="auth_credenciais">
								<h2>Senha</h2>
								<input
									type="password"
									name="passwordExistente"
									onChange={e => setMyPassword(e.target.value)}
									id="password"
								/>
								<h3>Esqueceu a conta?</h3>
							</div>
							<button onClick={logar}>Logar</button>

						</form>
					</div>

					<div className="auth_registro">
						<div className="auth_img_global">
							<h2>O Facebook ajuda você a se conectar
								 e<br /> compartilhar com as pessoas que fazem parte<br /> da sua vida.</h2>
							<img alt='' src={auth_img} />
						</div>


						<div className="container_registro">
							<div>
								<h2>
									Abra uma conta

								</h2>
								<h3>
									É rápido e fácil.
							</h3>
							</div>

							<form>
								<div className="container_registro_nome">

									<input type="text"
										onChange={e => setfirstName(e.target.value)}
										name="firstName"
										id="nome"
										placeholder="Nome"
									/>


									<input type="text"
										onChange={e => setlastName(e.target.value)}
										name="lastName"
										id="sobrenome"
										placeholder="Sobrenome"
									/>

								</div>

								<input
									type="text"
									onChange={e => setNewEmail(e.target.value)}
									name="email" id="email"
									placeholder="Celular ou email"
								/>

								<input
									type="password"
									onChange={e => setnewPassword(e.target.value)}
									name="password" id="senha"
									placeholder="Nova senha"
								/>

								<h4 className="dataNascimento">Data de nascimento</h4>
								<select name="dia">
									{
										dias().map(diaDoMes => (
											<option key={diaDoMes}>{diaDoMes}</option>
										))
									}
								</select>
								<select name="mes">
									{
										meses.map(meses => (
											<option key={meses}>{meses}</option>
										))
									}
								</select>

								<select name="ano">
									{
										ano().map(ano => (
											<option key={ano}>{ano}</option>
										))
									}
								</select>

								<h4 className='dataNascimento'>
									Gênero
								</h4>

								<input type='radio' name="Masculino" id="Masculino" value="Masculino" />
								<label className="gender">Masculino</label>

								<input type='radio' name="Feminino" id="Feminino" value="Feminino" />
								<label className="gender">Feminino</label>
								<div className="auth_termos">
									<h5>
										Ao clicar em Cadastre-se, você concorda com nossos <a> Termos,
										Política de Dados e Política de Cookies.</a> Você pode receber
								notificações por SMS e pode cancelar isso quando quiser.
								</h5>
								</div>

								<button onClick={cadastrar} className="auth_cadastre">Cadastre-se</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</context.Consumer>
	)
}