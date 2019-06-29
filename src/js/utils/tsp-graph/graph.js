/* eslint-disable no-plusplus */
import { DESTINATIONS } from '../../constants/app-constants';
import Node from './node';

class Graph {
  constructor(trips = []) {
    this.edges = [];
    this.cityToIndex = DESTINATIONS.reduce((cityToIndex, city, index) => {
      cityToIndex[city] = index;
      return cityToIndex;
    }, {});
    trips.forEach(trip => this.addEdge(trip));
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
