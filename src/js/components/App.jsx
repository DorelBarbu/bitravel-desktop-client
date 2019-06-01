// src/js/components/App.jsx
import React from 'react';
// import Button from '@material-ui/core/Button';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
// import MnemonicForm from './MnemonicForm';
import Logger from '../utils/logger';
import Spinner from 'react-bootstrap/Spinner';
import { initWeb3 } from '../actions/web3';
import { getContractAbi } from '../actions/contracts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import DeployFactoryContractContainer from './DeployFactoryContractContainer';

const mapDispatchToProps = dispatch => {
    return {
        initWeb3: () => dispatch(initWeb3()),
        getContractAbi: contractType => dispatch(getContractAbi(contractType))
    };
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }
    componentDidMount() {
        Logger.success('Application loaded');
        this.setState({
            ...this.state,
            isLoading: false
        });
        this.props.initWeb3();
        this.props.getContractAbi('tsp');
        this.props.getContractAbi('factory');
    }
    render() {
        if(this.state.isLoading === false) {
            return (
                <div>
                    <nav className="navbar navbar-light">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/deploy/factory">Deploy factory</Link></li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path="/" render={() => <Home/>}/>
                        <Route path="/deploy/factory" render={() => <DeployFactoryContractContainer/>}/>
                    </Switch>
                </div>
            );
        }
        return (
            <div>
                <h2>Application is loading...</h2>
                <Spinner animation="border" />
            </div>
        );
    }
}

App.propTypes = {
    initWeb3: PropTypes.func,
    getContractAbi: PropTypes.func
};

export default connect(null, mapDispatchToProps)(App);