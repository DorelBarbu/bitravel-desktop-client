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
      <DeployTspContractForm 
        accounts={this.props.accounts} 
        deployTsp={this.props.deployTsp}
        history={this.props.history} 
        match={this.props.match}
        contract={this.props.contracts.length > 0 ? this.props.contracts[this.props.contracts.length-1] : null }
        problemSize =  {this.props.history.location.state.problemSize}
      />
    );
  }
}

DeployTspContractContainer.propTypes = {
  contracts: PropTypes.array,
  loadingTspContract: PropTypes.bool,
  accounts: PropTypes.array,
  deployTsp: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  problemSize: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(DeployTspContractContainer);