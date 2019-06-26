import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';


class DeployFactoryContractForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: props.accounts[0],
      gas: 1000000
    };
  }

  handleOnChangeAmount(event) {
    this.setState({
      ...this.state,
      gas: event.target.value
    });
  }

  handleSelectAccount(event) {
    this.setState({
      ...this.state,
      account: event.target.value
    });
  }

  render() {
    if(this.props.loadingFactoryContract === false) {

      return(
        <Card>
          <Card.Title>Deploy a factory contract</Card.Title>
          <Card.Body>
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
                    onChange = {e => this.handleOnChangeAmount(e)}
                    value={this.state.gas}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Button onClick={()=>{
                  this.props.deployFactory(this.state.account ? this.state.account : this.props.accounts[0], this.state.gas);
                }}>Submit form</Button>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      );
    } else {
      return(
        <Card>
          <Spinner animation="border"/>
        </Card>
      );
    }
  }
}

DeployFactoryContractForm.propTypes = {
  accounts: PropTypes.array,
  deployFactory: PropTypes.func,
  loadingFactoryContract: PropTypes.bool
};

export default DeployFactoryContractForm;