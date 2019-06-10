// src/js/components/App.jsx
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Logger from '../utils/logger';
import Spinner from 'react-bootstrap/Spinner';
import { initWeb3 } from '../actions/web3';
import { getContractAbi } from '../actions/contracts';
import { getAccounts } from '../actions/accounts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import DeployFactoryContractContainer from './DeployFactoryContractContainer';
import DeployTspContractContainer from './DeployTspContractContainer';
import TspContractListContainer from './TspContractListContainer';
import SetReward from './SetReward';
import Contribute from './Contribute';

const mapDispatchToProps = dispatch => {
  return {
    initWeb3: () => dispatch(initWeb3()),
    getContractAbi: contractType => dispatch(getContractAbi(contractType)),
    getAccounts: () => dispatch(getAccounts())
  };
};

const mapStateToProps = state => {
  return {
    factoryId: state.contracts.factoryContract
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
              <li><Link to="/deploy/tsp">Deploy tsp</Link></li>
              <li><Link to="/contribute/:contractId">Contribute</Link></li>
              <li><Link to="/contracts/view/all">Contract List</Link></li>
            </ul>
          </nav>
          {/* eslint-disable-next-line no-undef */}
          <p>{`Running application in ${JSON.stringify(process.env.REACT_APP_LOCAL_BLOCKCHAIN)}`}</p>
          <Switch>
            <Route exact path="/" render={() => <Home/>}/>
            <Route exact path="/deploy/factory" render={() => <DeployFactoryContractContainer/>}/>
            <Route exact path="/deploy/tsp" render={
              (props) => <DeployTspContractContainer history={props.history}/>}/>
            <Route exact path="/contracts/view/all" render={props => 
              <TspContractListContainer {...props} factroyId={this.props.factoryId} />}
            />
            <Route exact path="/contracts/:contractId/reward" render={
              (props) => <SetReward match={props.match} history={props.history} location={props.location} />}/>
            <Route exact path="/contracts/contribute/:contractId" render = {
              (props) => <Contribute match={props.match} />
            }/>
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
  getContractAbi: PropTypes.func,
  getAccounts: PropTypes.func,
  factoryId: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(App);