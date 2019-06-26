import React from 'react';
import PropTypes from 'prop-types';
import{ connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { contribute } from '../controllers/contracts';

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

class Contribute extends React.Component {
  constructor(props) {
    super(props);
    this.contractId = props.match.params.contractId;
    this.state = {
      account: this.props.accounts[0]
    };
  }

  handleSelectAccount(event) {
    this.setState({
      ...this.state,
      account: event.target.value
    });
  }

  contribute() {
    setInterval(() => {
      const response = contribute(this.state.account, this.contractId);
      response.then(console.log).catch(console.error);
    }, 1000);
  }

  render() {
    return (
      <div>
        <h2>Contribute to contract</h2>
        <Form>
          <Form.Row>
            <Form.Group>
              <Form.Label>Select Account</Form.Label>
              <Form.Control placeholder="Select an account" type="text" as="select" required value={this.state.account} onChange={e => this.handleSelectAccount(e)}>
                {this.props.accounts.map(account => <option key={account}>{account}</option>)}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button onClick={() => this.contribute()}>Contribute</Button>
          </Form.Row>
        </Form>
        <h4>{this.contractId}</h4>
      </div>
    );
  }
}

Contribute.propTypes = {
  match: PropTypes.object,
  accounts: PropTypes.array
};

export default connect(mapStateToProps,null)(Contribute);