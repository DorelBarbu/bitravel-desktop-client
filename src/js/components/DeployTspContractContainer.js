import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeployTspContractForm from './DeployTspContractForm';
import { deployTsp } from '../actions/contracts';

const mapStateToProps = state => ({
  contracts: state.contracts.tspContracts,
  loadingTspContract: state.contracts.loadingTspContract,
  accounts: state.accounts.accounts
});

const mapDispatchToProps = dispatch => ({
  deployTsp: (contractData) => dispatch(deployTsp(contractData))
});

class DeployTspContractContainer extends React.Component {
  render() {
    return (
      // <h2>Deploy tsp contract form</h2>
      <DeployTspContractForm accounts={this.props.accounts} deployTsp={this.props.deployTsp} />
    );
  }
}

DeployTspContractContainer.propTypes = {
  contracts: PropTypes.array,
  loadingTspContract: PropTypes.bool,
  accounts: PropTypes.array,
  deployTsp: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DeployTspContractContainer);