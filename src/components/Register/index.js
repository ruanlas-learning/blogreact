import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import firebase from '../../firebase';
import './register.css';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            nome: '',
            email: '',
            password: ''
        };
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    register(event){
        event.preventDefault()

        this.onRegister();
    }

    onRegister = async () => {
        try {
            const {nome, email, password} = this.state;

            await firebase.register(nome, email, password);
            this.props.history.replace('/dashboard');

        } catch (error) {
            alert(error.message);
        }
    }

    render(){
        return(
            <div>
                <h1 className="register-h1">Novo usuario</h1>
                <form onSubmit={this.register} id="register">
                    <label>Nome:</label><br/>
                    <input type="text" autoComplete="off" autoFocus value={this.state.nome}
                        onChange={ (e) => this.setState({ nome: e.target.value }) } placeholder="Seu nome" /><br/>
                    <label>Email:</label><br/>
                    <input type="email" autoComplete="off" value={this.state.email}
                        onChange={ (e) => this.setState({ email: e.target.value }) } placeholder="teste@teste.com" /><br/>
                    <label>Senha:</label><br/>
                    <input type="password" autoComplete="off" value={this.state.password}
                        onChange={ (e) => this.setState({ password: e.target.value }) } placeholder="Sua senha" /><br/>
                    <button type="submit">Cadastrar</button><br/>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);