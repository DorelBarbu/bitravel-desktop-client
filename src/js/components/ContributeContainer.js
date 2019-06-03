import React from 'react';
import { connect } from 'react-redux';
import { getAccounts } from '../actions/accounts';
import { deployFactory } from '../actions/contracts';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

const mapDispatchToProps = dispatch => ({
  getAccounts: () => dispatch(getAccounts()),
  deployFactory: (account, gas) => dispatch(deployFactory(account, gas))
});

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  loadingAccounts: state.accounts.loadingAccounts,
  loadingDeployedContract: state.contracts.loadingDeployedContract,
  deployedContract: state.contracts.deployedContract
});

class ContributeContainer extends React.Component {
  componentDidMount() {
    this.props.getAccounts();
  }
  render() {
    if(this.props.loadingDeployedContract === false) {
      return (
        <h2>Contribute to contract</h2>
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

ContributeContainer.propTypes = {
  getAccounts: PropTypes.func,
  accounts: PropTypes.array,
  loadingAccounts: PropTypes.bool,
  accountsError: PropTypes.bool,
  deployFactory: PropTypes.func,
  loadingFactoryContract: PropTypes.bool,
  loadingDeployedContract: PropTypes.bool,
  deployedContract: PropTypes.object
};

export default connect(mapStateToProps,mapDispatchToProps)(ContributeContainer);