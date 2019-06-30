import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import Logger from '../utils/logger';

class DeployTspContractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      gas: 1000000,
      size: this.props.problemSize
    };
  }

  handleSelectAccount(event) {
    this.setState({
      ...this.state,
      account: event.target.value
    });
  }

  async deployContract() {
    console.log('about to deploy', this.state);
    try {
      const account = this.state.account ? this.state.account : this.props.accounts[0];
      await this.props.deployTsp({
        account,
        gas: this.state.gas,
        mongodbAddress: this.props.match.params.tripId,
        size: this.state.size
      });
      this.props.history.replace(`/contracts/${this.props.contract.address}/reward?account=${account}`);
    } catch(error) {
      Logger.err('Error deploying tsp contract');
    }
  }

  render() {
    return(
      <Card>
        <Card.Title>
          Deploy tsp contract
        </Card.Title>
        <Card.Body>
          {`Problems size: ${this.state.size}`}
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
              <Form.Group>
                <Form.Label>Gas amount</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter a gas value"
                  onChange = {e => this.setState({...this.state, gas: e.target.value})}
                  value={this.state.gas}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Button onClick={()=>this.deployContract()}>Deploy contract</Button>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

DeployTspContractForm.propTypes = {
  contract: PropTypes.object,
  loadingTspContract: PropTypes.bool,
  accounts: PropTypes.array,
  deployTsp: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  problemSize: PropTypes.number
};

export default DeployTspContractForm;