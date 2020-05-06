import React, { useEffect } from "react";
import './App.css';
import Routes from './componentes/routes/routes'
import Context from './componentes/globalContext'
import { observer } from "mobx-react"
import { observable, autorun } from 'mobx'
import { Server } from 'socket.io'




export default function App() {
	return (

		<Routes />

	);
}
