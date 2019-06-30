import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../../css/general.css';

class GraphListItem extends React.Component {
  generateTableBody() {
    console.log(this.props.data);
    const graph = this.props.data;
    // console.log(graph);
    const rows = [];
    let keyIndex = 0;
    for(let i in graph.edges) {
      const edge = graph.edges[i];
      for(let j in edge) {
        rows.push(<tr key={`${graph._id}${keyIndex}`}>
          <td>{edge[j].data.cityFrom}</td>
          <td>{edge[j].data.cityTo}</td>
          <td>{moment.unix(edge[j].data.dTime).format('YYYY-MM-DD - HH:MM')}</td>
          <td>{moment.unix(edge[j].data.aTime).format('YYYY-MM-DD - HH:MM')}</td>
        </tr>);
        keyIndex++;
      }
    }
    return rows;
  }

  render() {

    return (
      <div>
        <h4>{`Trip #${this.props.index + 1}`}</h4>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Departure Date</th>
              <th>Arival Date</th>
            </tr>
          </thead>
          <tbody>
            {this.generateTableBody()}
          </tbody>
        </Table>
        <div className="center-container">
          <Button onClick={() => {
            this.props.history.push(`/deploy/tsp/${this.props.data._id}`, {
              problemSize: this.props.data.size
            });
          }}>
            Deploy a contract
          </Button>
        </div>
      </div>
    );
  }
}

GraphListItem.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  history: PropTypes.object
};

export default GraphListItem;