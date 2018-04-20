import Web3 from 'web3';

const {
  infura: { rinkeby },
} = require('../private/ethereum');

const web3 = (() => {
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask is running.
    return new Web3(window.web3.currentProvider);
  }

  // We are on the server *OR* the user is not running metamask.
  const provider = new Web3.providers.HttpProvider(rinkeby);
  return new Web3(provider);
})();

export default web3;
