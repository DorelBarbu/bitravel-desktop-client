import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import TravelPlanFormRow from './TravelPlanFormRow';
import { DESTINATIONS } from '../constants/app-constants';
import moment from 'moment';
import { confirmTrip } from '../api/kiwi/kiwi';

const defaultFlight = {
  source: DESTINATIONS[0],
  destination: DESTINATIONS[1],
  date_from: moment(new Date()).format('YYYY-MM-DD'),
  date_to: moment(new Date()).add(1,'days').format('YYYY-MM-DD')
};

class TravelPlanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [defaultFlight]
    };
  }

  addFlight() {
    const lastFlight = this.state.flights[this.state.flights.length - 1];
    this.setState({
      ...this.state,
      flights: [...this.state.flights, {
        source: lastFlight.destination,
        destination: DESTINATIONS[0],
        date_to: moment(lastFlight.date_to,'YYYY-MM-DD').add(2, 'days').format('YYYY-MM-DD'),  
        date_from: moment(lastFlight.date_to,'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD')
      }]
    });
  }

  removeFlight() {
    if(this.state.flights.length > 1) {
      this.setState({
        ...this.state,
        flight: [...this.state.flights.pop()]
      });
    }
  }

  async confirm() {
    // console.log(this.state.flights);
    try {
      const response = await confirmTrip(this.state.flights.map(flight => {
        return {
          ...flight,
          date_from: moment(flight.date_from, 'YYYY-MM-DD').format('DD/MM/YYYY'),
          date_to: moment(flight.date_to, 'YYYY-MM-DD').format('DD/MM/YYYY')
        };
      }));
      console.log(response);
    } catch(error) {
      console.log(error);
    }
    // console.log(response);
  }

  render() {
    return(
      <Container>
        <Form>
          {this.state.flights.map(flight => <TravelPlanFormRow key={JSON.stringify(flight)} value={flight}/>)}
          <Form.Row>
            <Button onClick={() => this.addFlight()}>
              Add Destination
            </Button>
            <Button onClick={() => this.addFlight()}>
              Remove Destination
            </Button>
            <Button onClick={() => this.confirm()}>
              Confirm
            </Button>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export default TravelPlanForm;