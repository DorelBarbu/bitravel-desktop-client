import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { DESTINATIONS } from '../constants/app-constants';

class TravelPlanFormRow extends React.Component {
  constructor(props) {
    super(props);
    console.log('Props from row');
    console.log(this.props.value);
    this.state = {...this.props.value};
  }

  handleSelectArrival(event) {
    this.setState({
      ...this.state,
      destination: event.target.value
    });
  }

  handleSelectDeparture(event) {
    this.setState({
      ...this.state,
      source: event.target.value
    });
  }

  handleSelectArrivalDate(event) {
    this.setState({
      ...this.state,
      date_to: event.target.value
    });
  }

  handleSelectDepartureDate(event) {
    console.log(`change date to ${event.target.value}`);
    this.setState({
      ...this.state,
      date_from: event.target.value
    });
  }

  render() {
    return(
      <Form.Row>
        <Form.Group>
          <Form.Label>source</Form.Label>
          <Form.Control placeholder="Select a destination" type="text" as="select" required value={this.state.source} onChange={e => this.handleSelectDeparture(e)}>
            {DESTINATIONS.map(destination => <option key={destination}>{destination}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>destination</Form.Label>
          <Form.Control placeholder="Select a destination" type="text" as="select" required value={this.state.destination} onChange={e => this.handleSelectArrival(e)}>
            {DESTINATIONS.map(destination => <option key={destination}>{destination}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>source date</Form.Label>
          <Form.Control placeholder="Select a destination" type="date" required value={this.state.date_from} onChange={e => this.handleSelectDepartureDate(e)}>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>destination date</Form.Label>
          <Form.Control placeholder="Select a destination" type="date" required value={this.state.date_to} onChange={e => this.handleSelectArrivalDate(e)}>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    );
  }
}

TravelPlanFormRow.propTypes = {
  destination: PropTypes.string,
  source: PropTypes.string,
  value: PropTypes.object
};

export default TravelPlanFormRow;