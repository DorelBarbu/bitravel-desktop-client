import React from 'react';
import { connect } from 'react-redux';
import { getDeployedTspContracts } from '../actions/contracts';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import TspContractList from './TspContractList';

const mapDispatchToProps = dispatch => ({
  getDeployedTspContracts: () => dispatch(getDeployedTspContracts())
});

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  loadingAccounts: state.accounts.loadingAccounts,
  contracts: state.contracts.deployedTspContracts,
  loadingDeployedTspContracts: state.contracts.loadingDeployedTspContracts,
  loadingDeployedTspContractsError: state.contracts.loadingDeployedTspContractsError,
  factoryId: state.contracts.factoryContract
});

class TspContractListContainer extends React.Component {
  componentDidMount() {
    if(this.props.factoryId) {
      this.props.getDeployedTspContracts();
    }
  }
  render() {
    if(this.props.loadingDeployedTspContracts === false) {
      return (
        <div>
          <h2>Contract List</h2>
          <TspContractList contracts={this.props.contracts} />
        </div>
      );
    } else {
      return (
        <div>
          <Spinner animation="border"/>
        </div>
      );
    }
  }
}

TspContractListContainer.propTypes = {
  accounts: PropTypes.array,
  loadingAccounts: PropTypes.bool,
  accountsError: PropTypes.bool,
  contracts: PropTypes.array,
  loadingDeployedTspContracts: PropTypes.bool,
  loadingDeployedTspContractsError: PropTypes.object,
  getDeployedTspContracts: PropTypes.func,
  factoryId: PropTypes.string
};

export default connect(mapStateToProps,mapDispatchToProps)(TspContractListContainer);