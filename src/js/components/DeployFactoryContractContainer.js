import React from 'react';
import { connect } from 'react-redux';
import { getAccounts } from '../actions/accounts';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import DeployFactoryContractForm from './DeployFactoryContractForm';

const mapDispatchToProps = dispatch => ({
    getAccounts: () => dispatch(getAccounts())
});

const mapStateToProps = state => ({
    accounts: state.accounts.accounts,
    loadingAccounts: state.accounts.loadingAccounts
});

class DeployFactoryContractContainer extends React.Component {
    componentDidMount() {
        this.props.getAccounts();
    }
    render() {
        if(this.props.loadingAccounts === false) {
            return (
                <DeployFactoryContractForm accounts={this.props.accounts}/>
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

DeployFactoryContractContainer.propTypes = {
    getAccounts: PropTypes.func,
    accounts: PropTypes.array,
    loadingAccounts: PropTypes.bool,
    accountsError: PropTypes.bool
};

export default connect(mapStateToProps,mapDispatchToProps)(DeployFactoryContractContainer);