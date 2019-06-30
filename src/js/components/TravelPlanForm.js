import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import TravelPlanFormRow from './TravelPlanFormRow';
import { DESTINATIONS } from '../constants/app-constants';
import moment from 'moment';
import { confirmTrip } from '../api/kiwi/kiwi';
import { insertGraph } from '../api/bitravel-main/graph';
import Graph from '../utils/tsp-graph/graph';
import PropTypes from 'prop-types';
import _ from 'lodash';

const defaultFlight = {
  source: DESTINATIONS[0],
  date_from: moment(new Date()).format('YYYY-MM-DD'),
  date_to: moment(new Date()).add(1,'month').format('YYYY-MM-DD')
};

class TravelPlanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [defaultFlight],
      loading: false
    };
  }

  addFlight() {
    const lastFlight = this.state.flights[this.state.flights.length - 1];
    this.setState({
      ...this.state,
      flights: [...this.state.flights, {
        source: DESTINATIONS[0],
        date_to: moment(new Date()).add(1,'month').format('YYYY-MM-DD'),  
        date_from: moment(new Date()).format('YYYY-MM-DD')
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
    this.setState({
      ...this.state,
      loading: true
    });
    const source = this.state.flights[0].source;
    const citiesToVisit = _.uniq(this.state.flights.map(flight => flight.source));
    let trip = [];
    for(let i = 0; i < citiesToVisit.length; i++) {
      for(let j = 0; j < citiesToVisit.length; j++) {
        if(i != j) {
          trip.push({
            destination: citiesToVisit[i],
            source: citiesToVisit[j],
            date_to: moment(new Date()).add(1,'month').format('DD/MM/YYYY'),  
            date_from: moment(new Date()).format('DD/MM/YYYY'),
          });
        }
      }
    }

    try {
      const flights = (await confirmTrip(trip)).flights;
      const graph = new Graph(flights, source);
      await insertGraph(graph);
      this.props.history.push('/travel/view');
    } catch(error) {
      console.log(error);
    }

    this.setState({
      ...this.state,
      loading: false
    });
  }

  render() {
    if(this.state.loading === false) {

      return(
        <Container>
          <Form>
            {this.state.flights.map((flight, index) => 
              <TravelPlanFormRow 
                key={`${flight.source}/${index}`} 
                value={flight}
                updateValue={newValue => {
                  const flights = this.state.flights;
                  flights[index] = newValue;
                  this.setState({
                    ...this.state,
                    flights
                  });
                }}
              />)}
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
    } else {
      return (
        <div>
          <Spinner animation="border"/>
        </div>
      );
    }
  }
}

TravelPlanForm.propTypes = {
  history: PropTypes.object
};

export default TravelPlanForm;