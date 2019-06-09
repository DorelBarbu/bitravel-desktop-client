import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { setReward } from '../controllers/contracts';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ErrorToast from './ErrorToast';
// import Logger from '../utils/logger';

class SetReward extends React.Component {
  constructor(props) {
    super(props);
    this.address = props.match.params.contractId;
    this.state = {
      reward: 0,
      isLoading: false,
      isError: null
    };
    this.onCloseToast = this.onCloseToast.bind(this);
  }

  async handlePressSetReward() {
    const { account } = queryString.parse(this.props.location.search);
    const contract = this.props.match.params.contractId;
    const { reward } = this.state;
    this.setState({
      ...this.state,
      isLoading: true,
      isError: false,
      showToast: false
    });
    try {
      await setReward(account, contract, reward);
      this.setState({
        ...this.state,
        isError: false
      });
    } catch(err) {
      this.setState({
        ...this.state,
        isError: true,
      });
    }
    this.setState({
      ...this.state,
      isLoading: false,
      showToast: true
    });
  }

  onCloseToast() {
    this.setState({
      ...this.state,
      showToast: false
    });
  }

  render() {
    const { isLoading, isError, showToast } = this.state;
    return (
      <Card>
        <h2>Set reward component for {this.address}</h2>
        {showToast === true && isLoading === false && isError === false 
          && <ErrorToast onClose={this.onCloseToast} show={showToast} message='Successfully set reward  ' />}
        {showToast === true && isLoading === false && isError === true 
          && <ErrorToast onClose={this.onCloseToast} show={showToast} message='Error setting reward' />}
        <Form>
          <Form.Row>
            <Form.Group>
              <Form.Label>Reward</Form.Label>
              <Form.Control type="number" placeholder="Set reward" value={this.state.reward}
                onChange={e => this.setState({...this.state, reward: e.target.value})}/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button variant="primary" onClick={() => this.handlePressSetReward()}>Set reward</Button>
          </Form.Row>
        </Form>
      </Card>
    );
  }
}

SetReward.propTypes = {
  account: PropTypes.string,
  match: PropTypes.object,
  location: PropTypes.object
};

export default SetReward;