import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class DeployFactoryContractForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: props.accounts[0],
            gas: 0
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
        return(
            <Form>
                <Form.Row>
                    <Form.Group>
                        <Form.Label>Select Account</Form.Label>
                        <Form.Control as="select" required value={this.state.account} onChange={e => this.handleOnChangeAmount(e)}>
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
                            defaultValue="0"
                            onChange = {e => this.handleOnChangeAmount(e)}
                            value={this.state.gas}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Button>Submit form</Button>
                </Form.Row>
            </Form>
        );
    }
}

DeployFactoryContractForm.propTypes = {
    accounts: PropTypes.array
};

export default DeployFactoryContractForm;