import React from 'react';
import PropTypes from 'prop-types';
import { getAllTrips } from '../api/bitravel-main/graph';
import Spinner from 'react-bootstrap/Spinner';
import Logger from '../utils/logger';
import GraphListItem from './GraphListItem';

class GraphList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      trips: []
    };
  }

  componentDidMount() {
    getAllTrips().then((response) => {
      this.setState({
        ...this.state,
        trips: response.data
      });
    }).catch(error => {
      Logger.err('Error retrieving trips', error);
    }).finally(() => {
      this.setState({
        ...this.state,
        loading: false
      });
    });
  }

  render() {
    if(this.state.loading === false) {
      return (
        <div>
          {this.state.trips.map((trip,index) => <GraphListItem 
            index={index} 
            history={this.props.history}
            data={trip} 
            key={JSON.stringify(trip)} />)}
        </div>
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

GraphList.propTypes = {
  loading: PropTypes.bool,
  history: PropTypes.object
};

export default GraphList;