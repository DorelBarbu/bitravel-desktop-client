// src/js/components/App.jsx
import React from 'react';
import Button from '@material-ui/core/Button';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import Products from './Products';

class App extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-light">
                    <ul className="nav navbar-nav">
                        <li><Link to="/" component={Home}>Home</Link></li>
                        <li><Link to="/category" component={Home}>Category</Link></li>
                        <li><Link to="/products" component={Home}>Products</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/category" component={Category}/>
                    <Route path="/products" component={Products}/>
                </Switch>
            </div>
        );
    }
}
export default App;