import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { setReward } from '../controllers/contracts';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Logger from '../utils/logger';

class SetReward extends React.Component {
  constructor(props) {
    super(props);
    this.address = props.match.params.contractId;
    this.state = {
      reward: 0
    };
  }

  async handlePressSetReward() {
    const { account } = queryString.parse(this.props.location.search);
    const contract = this.props.match.params.contractId;
    const { reward } = this.state;
    const response = await setReward(account, contract, reward);
    console.log(response);
  }

  render() {
    return (
      <Card>
        <h2>Set reward component for {this.address}</h2>
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