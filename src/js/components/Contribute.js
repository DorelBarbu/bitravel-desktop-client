import React from 'react';
import PropTypes from 'prop-types';
import{ connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { contribute, getGraphToContribute, increment, getTspInstance } from '../controllers/contracts';
import { perm } from '../utils/perm';
import Graph from '../utils/tsp-graph/graph';
import { DESTINATIONS } from '../constants/app-constants';
import '../../css/general.css';
import ContractStats from './ContractStats';
import Logger from '../utils/logger';

const mapStateToProps = state => ({
  accounts: state.accounts.accounts
});

class Contribute extends React.Component {
  constructor(props) {
    super(props);
    this.contractId = props.match.params.contractId;
    this.state = {
      account: props.accounts[0],
      graph: {},
      graphIndex: [],
      loading: false,
      contributingIndex: null,
      done: false,
      solution: null,
      mimimumCost: 0
    };
  }

  handleSelectAccount(event) {
    this.setState({
      ...this.state,
      account: event.target.value
    });
  }

  async componentDidMount() {
    const graphStructure = await getGraphToContribute(this.state.account, this.contractId);
    const graph = new Graph();
    const graphIndex = [];
    graph.createFromGraph(graphStructure);
    for(let i = 0; i < DESTINATIONS.length; i++) {
      if(graph.edges[i]) {
        graphIndex.push(i);
      }
    }
    const tsp = (await getTspInstance(this.contractId)).contract;
    this.setState({
      ...this.state,
      graph,
      graphIndex,
      account: this.props.accounts[0],
      done: tsp.done,
      solution: tsp.solution,
      solutionCost: tsp.minimumCost
    });

  }

  translatePermutation(perm) {
    return perm.map(elem => this.state.graphIndex[elem - 1]);
  }

  getPermCost(index) {
    const newPerm = this.translatePermutation(perm(this.state.graph.size, index, this.state.graphIndex));
    return this.state.graph.calculateCost(newPerm);
  }

  async contribute() {
    try {
      const isContributing = true;
      this.setState({
        ...this.state,
        loading: true
      });
      while(isContributing === true) {
        const tsp = (await getTspInstance(this.contractId)).contract;
        const currentIndex = tsp.index - 1;
        this.setState({
          ...this.state,
          contributingIndex: tsp.index
        });
        const done = (await increment(this.state.account, this.contractId)).data.done;
        if(done === false) {
          await contribute(this.contractId, this.state.account, this.getPermCost(currentIndex), currentIndex + 1);
        } else {
          break;
        }
      }
      this.setState({
        ...this.state,
        loading: false
      });
    } catch(error) {
      Logger.err('Error contributing to contract');
    }
  }

  render() {
    if(this.state.done === false) {
      return (
        <div>
          {`Contract terminated ${this.state.done}`}
          {`Solution is ${this.state.solution}`}
          <div className='center-container'>
            <Form>
              <Form.Row>
                <Form.Group>
                  <Form.Label>Select Account</Form.Label>
                  <Form.Control placeholder="Select an account" type="text" as="select" required value={this.state.account} onChange={e => this.handleSelectAccount(e)}>
                    {this.props.accounts.map(account => <option key={account}>{account}</option>)}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row className="center-container">
                <Button onClick={() => this.contribute()}>Contribute</Button>
              </Form.Row>
            </Form>
          </div>
          {this.state.loading === true && (
            <div className='center-container'>
              <Spinner animation="border"/>
              {`Contributing to index ${this.state.contributingIndex}`}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <ContractStats 
          solution={this.translatePermutation(perm(this.state.graph.size, this.state.solution, this.state.graphIndex))}
          graph={this.state.graph}
          cost={this.getPermCost(this.state.solution)}
        />
      );
    }
  }
}

Contribute.propTypes = {
  match: PropTypes.object,
  accounts: PropTypes.array
};

export default connect(mapStateToProps,null)(Contribute);