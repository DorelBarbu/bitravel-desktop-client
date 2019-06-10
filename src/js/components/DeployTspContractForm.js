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
      mongoAddress: '',
      size: 0
    };
  }

  handleSelectAccount(event) {
    this.setState({
      ...this.state,
      account: event.target.value
    });
  }

  async deployContract() {
    try {
      const account = this.state.account ? this.state.account : this.props.accounts[0];
      await this.props.deployTsp({
        account,
        gas: this.state.gas,
        mongodbAddress: this.state.mongoAddress,
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
          {this.props.contract ? this.props.contract.address : 'No Contract deployed yet'}
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
              <Form.Group>
                <Form.Label>Mongo address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter a mongo db id"
                  onChange = {e => this.setState({...this.state, mongoAddress: e.target.value})}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <Form.Label>Problem size</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter problem size"
                  onChange = {e => this.setState({...this.state, size: e.target.value})}
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
  history: PropTypes.object
};

export default DeployTspContractForm;