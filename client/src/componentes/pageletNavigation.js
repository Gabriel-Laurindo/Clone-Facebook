import React, { useContext } from 'react';
import gato from './img/gato_site.png'
import './css/pageletNavigation.css'
import context from './globalContext'
import { observer } from 'mobx-react'
import store from './store'
import UserName from './userConfig'

export default function pageletNavigation() {

	return (
		<div className="navigation">
			<ul>
				<ul>
					<li className="profile_name">
						<img alt='profile' src={gato} className="gato-navigation" />
						<UserName full={store} />
					</li>
					<li><div className="feed"></div>Feed De Noticias</li>
					<li><div className="navigation_messenger"></div>Messenger</li>
					<li><div className="navigation_watch" />Watch</li>
					<li><div className="navigation_market" />MarketPlace</li>
				</ul>


				<ul>
					<li className="navigation_statico">Atalhos</li>
					<li><div className="navigation_grupo" />GRUPO</li>
					<li><div className="navigation_grupo" />GRUPO</li>
					<li><div className="navigation_grupo" />GRUPO</li>
					<li><div className="navigation_grupo" />GRUPO</li>
					<li className="verMais"> <a href='#'>Ver Mais...</a></li>
				</ul>


				<ul>
					<li className="navigation_statico">Explorar</li>
					<li><div className="navigation_paginas" />Paginas</li>
					<li><div className="navigation_grupos" />Grupos</li>
					<li><div className="navigation_eventos" />Eventos</li>
					<li><div className="navigation_campanha" />Campanha de arr</li>
					<li><div className="navigation_lembrancas" />Lembrancas</li>
					<li className="verMais"><a href='#'>Ver Mais...</a></li>
				</ul>
			</ul>


		</div>
	)
}

