import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import './global.css';
import Header from './components/Header';


class App extends Component {
    render(){
        return(
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;