import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { DESTINATIONS } from '../constants/app-constants';

class TravelPlanFormRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  updateValue(property, value) {
    const currentValue = this.state.value;
    currentValue[property] = value;
    this.setState({
      ...this.state,
      value: currentValue
    });
  }

  render() {
    return(
      <Form.Row>
        <Form.Group>
          <Form.Label>source</Form.Label>
          <Form.Control placeholder="Select a destination" type="text" as="select" required
            value={this.state.value.source} 
            onChange={e => this.updateValue('source', e.target.value)}>
            {DESTINATIONS.map(destination => <option key={destination}>{destination}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>source date</Form.Label>
          <Form.Control placeholder="Select a destination" type="date" required 
            value={this.state.value.date_from}
            onChange={e => this.updateValue('date_from', e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>destination date</Form.Label>
          <Form.Control placeholder="Select a destination" type="date" required 
            value={this.state.value.date_to}
            onChange={e => this.updateValue('date_to', e.target.value)}>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    );
  }
}

TravelPlanFormRow.propTypes = {
  value: PropTypes.object,
  updateValue: PropTypes.func
};

export default TravelPlanFormRow;