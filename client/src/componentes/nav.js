
import React, { useState, useEffect } from 'react';
import context from './globalContext'
import './css/nav.css'
import gato from './img/gato_site.png'
import useReactRouter from 'use-react-router';
import { observer } from 'mobx-react'
import UserName from './userConfig'
import store from './store'
import Modal_config from './modal_config'

export default function Nav() {
	const { history, location, match } = useReactRouter()
	const [config_subMenu, setConfig_subMenu] = useState(false)


	function abrir_config() {
		if (store.currentModal) {
			store.currentModal(false)
		}
		if (!config_subMenu) {
			store.currentModal = setConfig_subMenu
		}

		setConfig_subMenu(!config_subMenu)
	}

	function logOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		history.push('/')
	}


	useEffect(() => {

	}, [])

	return (
		<div className="containerNav">
			<div className="nav">
				<div className="pesquisar">
					<div className="icon-face"></div>

					<div className="container-pesquisa" >
						<input className="navInput"
							placeholder="Pesquisar"
							onSearch={value => console.log(value)}
						/>
					</div>
				</div>

				<div className="profile">
					<div className="usuario profile-alinhamento">
						<img alt='' src={gato} className="img-Profile" />
						<UserName full={store} firstNameOnly={true} />
					</div>

					<div className="usuario profile-alinhamento">
						Página inicial
						</div>

					<div className="usuario profile-alinhamento">
						Criar
						</div>
				</div>

				<div className="profile comunicacao">
					<div className=" comunicacao-alinhamento">
						<div className="friends"></div>
					</div>

					<div className=" comunicacao-alinhamento">
						<div className="messenger"></div>
					</div>

					<div className=" comunicacao-alinhamento">
						<div className="notificacao"></div>
					</div>


					<div className="profile config">
						<div className="help">
						</div>

						<div className="config_sair" onClick={abrir_config}>
							<Modal_config open={config_subMenu} className={'config_sair_click'}>
								<li><span>Gerenciar página</span></li>
								<li><span>Gerenciar grupos</span></li>
								<li><span>Publicidade no Facebook</span></li>
								<li><span>Registro de atividades</span></li>
								<li><span>Registro de atividades</span></li>
								<li><span>Preferencias do feed de noticias</span></li>
								<li><span>Configuracoes</span></li>
								<li className="sair" onClick={logOut}>Sair</li>
							</Modal_config>

						</div>
					</div>

				</div>

			</div>

		</div>



	);
}


