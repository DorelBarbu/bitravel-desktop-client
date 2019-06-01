import Web3 from 'web3';
import Logger from './logger';
const web3 = new Web3(window.web3.currentProvider);
Logger.msg(web3);
export default web3;