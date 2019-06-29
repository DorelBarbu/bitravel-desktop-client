import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import TravelPlanFormRow from './TravelPlanFormRow';
import { DESTINATIONS } from '../constants/app-constants';
import moment from 'moment';
import { confirmTrip } from '../api/kiwi/kiwi';
import { insertGraph } from '../api/bitravel-main/graph';
import Graph from '../utils/tsp-graph/graph';

const defaultFlight = {
  source: DESTINATIONS[0],
  destination: DESTINATIONS[1],
  date_from: moment(new Date()).format('YYYY-MM-DD'),
  date_to: moment(new Date()).add(1,'days').format('YYYY-MM-DD')
};

const mockTrip = [
  {
    'countryFrom': {
      'code': 'CZ',
      'name': 'Czechia'
    },
    'countryTo': {
      'code': 'RO',
      'name': 'Romania'
    },
    'price': 135,
    'dTime': 1561887000,
    'aTime': 1561897200,
    'flyFrom': 'PRG',
    'flyTo': 'OTP',
    'cityFrom': 'Prague',
    'cityTo': 'Bucharest',
    'distance': 1082.82,
    'aTimeUTC': 1561886400,
    'dTimeUTC': 1561879800
  },
  {
    'countryFrom': {
      'code': 'RO',
      'name': 'Romania'
    },
    'countryTo': {
      'code': 'CZ',
      'name': 'Czechia'
    },
    'price': 94,
    'dTime': 1561994400,
    'aTime': 1561997700,
    'flyFrom': 'OTP',
    'flyTo': 'PRG',
    'cityFrom': 'Bucharest',
    'cityTo': 'Prague',
    'distance': 1082.82,
    'aTimeUTC': 1561990500,
    'dTimeUTC': 1561983600
  },
  {
    'countryFrom': {
      'code': 'CZ',
      'name': 'Czechia'
    },
    'countryTo': {
      'code': 'IT',
      'name': 'Italy'
    },
    'price': 69,
    'dTime': 1562137500,
    'aTime': 1562142900,
    'flyFrom': 'PRG',
    'flyTo': 'MXP',
    'cityFrom': 'Prague',
    'cityTo': 'Milan',
    'distance': 646.67,
    'aTimeUTC': 1562135700,
    'dTimeUTC': 1562130300
  }
];
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
    //const graph = new Graph(mockTrip);
    //console.log(graph);
    try {
      const trip = (await confirmTrip(this.state.flights.map(flight => {
        return {
          ...flight,
          date_from: moment(flight.date_from, 'YYYY-MM-DD').format('DD/MM/YYYY'),
          date_to: moment(flight.date_to, 'YYYY-MM-DD').format('DD/MM/YYYY')
        };
      }))).flights;
      console.log(trip);
      const graph = new Graph(trip);
      const databaseInsertResult = await insertGraph(graph);
      console.log(databaseInsertResult);
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return(
      <Container>
        <Form>
          {this.state.flights.map((flight, index) => 
            <TravelPlanFormRow 
              key={JSON.stringify(flight)} 
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
  }
}

export default TravelPlanForm;