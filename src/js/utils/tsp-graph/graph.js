/* eslint-disable no-plusplus */
import { DESTINATIONS } from '../../constants/app-constants';
import Node from './node';
import _ from 'lodash';

class Graph {
  constructor(trips = [], source) {
    this.edges = [];
    this.cityToIndex = DESTINATIONS.reduce((cityToIndex, city, index) => {
      cityToIndex[city] = index;
      return cityToIndex;
    }, {});

    const cities = [];
    trips.forEach(trip => {
      this.addEdge(trip);
      cities.push(trip.cityTo);
      cities.push(trip.cityFrom);
    });
    this.size = (_.uniq(cities)).length;
    this.source = this.cityToIndex[source];
  }

  createFromGraph(graph) {
    this.edges = graph.edges;
    this.cityToIndex = graph.cityToIndex;
    this.size = graph.size;
    this.source = graph.source;
  }

  addEdge(trip) {
    const startIndex = this.cityToIndex[trip.cityFrom];
    if(!this.edges[startIndex]) {
      this.edges[startIndex] = {};
    }
    this.edges[startIndex][this.cityToIndex[trip.cityTo]] = new Node(this.cityToIndex[trip.cityTo], trip, trip.price);
  }

  calculateCost(path) {
    return path.reduce((totalCost, currentIndex, index) => {
      if(index + 1 < path.length) {
        totalCost += this.edges[currentIndex][path[index+1]].cost;
      }
      return totalCost;
    }, 0);
  }


}

export default Graph;
