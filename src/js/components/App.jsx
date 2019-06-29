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
import TravelPlanForm from './TravelPlanForm';
import GraphList from './GraphList';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import icon from '../../images/bitravel-icon.png';
import logo from '../../images/bitravel-logo.png';
import '../../css/general.css';

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
          <div className='center-container margin-small'>
            <img src={logo} style={{height: 150}}></img>
          </div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              <img src={icon} style={{width: 50}}></img>
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">Home</Link>
              {/* <Link className="nav-link" to="/deploy/factory">Deploy factory</Link> */}
              {/* <Link className="nav-link" to="/deploy/tsp">Deploy tsp</Link> */}
              <Link className="nav-link" to="/contribute/:contractId">Contribute</Link>
              <Link className="nav-link" to="/contracts/view/all">Contract List</Link>
              <Link className="nav-link" to="/travel/planning">Travel planning</Link>
              <Link className="nav-link" to="/travel/view">Existing travel plans</Link>
            </Nav>
          </Navbar>
          {/* eslint-disable-next-line no-undef */}
          <p>{`Running application in ${JSON.stringify(process.env.REACT_APP_LOCAL_BLOCKCHAIN)}`}</p>
          <Switch>
            <Route exact path="/" render={() => <Home/>}/>
            <Route exact path="/deploy/factory" render={() => <DeployFactoryContractContainer/>}/>
            <Route exact path="/deploy/tsp/:tripId" render={
              (props) => <DeployTspContractContainer match={props.match} history={props.history}/>}/>
            <Route exact path="/contracts/view/all" render={props => 
              <TspContractListContainer {...props} factroyId={this.props.factoryId} />}
            />
            <Route exact path="/contracts/:contractId/reward" render= {
              (props) => <SetReward match={props.match} history={props.history} location={props.location} />}/>
            <Route exact path="/contracts/contribute/:contractId" render = {
              (props) => <Contribute match={props.match} />
            }/>
            <Route exact path="/travel/planning" render = { () => <TravelPlanForm /> }></Route>
            <Route exact path="/travel/view"  render = { props => <GraphList history={props.history} /> }></Route>
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