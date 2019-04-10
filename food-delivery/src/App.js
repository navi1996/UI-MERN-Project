import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './component/navbar';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './component/home';
import Login from './component/logIn';


class App extends Component {

    render() {
        return (
            <NavBar/>
        )
    }
}

export default App;

{/* <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/signUp" component={Login}></Route>
                <Route exact path="/logIn" component={Login}></Route>
                </Switch>
            </div>
            </BrowserRouter> */}
