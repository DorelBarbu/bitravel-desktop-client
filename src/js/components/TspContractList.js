import React from 'react';
import PropTypes from 'prop-types';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
class TspContractList extends React.Component {
  render() {
    const cards = this.props.contracts.map(contract => <Card key={contract.contractAddress}>
      <Card.Title>{contract.contractAddress}</Card.Title>
    </Card>);
    return (
      <div>
        <h2>There will lie the contract list</h2>
        <CardColumns>
          {cards}
        </CardColumns>
      </div>
    );
  }
}

TspContractList.propTypes = {
  contracts: PropTypes.array
};

export default TspContractList;