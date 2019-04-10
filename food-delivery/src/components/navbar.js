import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';

class NavBar extends React.Component {


    render() {
        return (
            <BrowserRouter>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark" style={{height:"50%"}}>
                    <Link ><img src="ziggyeats.png" className="navbar-brand"/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link">Gallery</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    

                </nav>
            </BrowserRouter>
        )
    }
}

export default NavBar;
