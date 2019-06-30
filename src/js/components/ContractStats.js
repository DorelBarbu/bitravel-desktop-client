import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import { DESTINATIONS } from '../constants/app-constants';
import '../../css/general.css';

const genearteSolutionBadge = (solution) => {
  return solution.map(index => 
    <h2 key={DESTINATIONS[index]} className='city-badge'>
      <Badge variant='info'>
        {DESTINATIONS[index]}
      </Badge>
    </h2>); 
};

class ContractStats extends React.Component {
  render() {
    const { solution } = this.props;
    return (
      <div>
        <div>
          {genearteSolutionBadge(solution)}
          <h2 className='city-badge'>
            <Badge variant='success'>
              {`${this.props.cost} euros`}
            </Badge> 
          </h2>
        </div>
      </div>
    );
  }
}

ContractStats.propTypes = {
  solution: PropTypes.array,
  graph: PropTypes.object,
  cost: PropTypes.number
};

export default ContractStats;