import web3 from '../../web3';

const {
  interface: abi,
} = require('../../build/Campaign.json');

export default address => (
  new web3.eth.Contract(
    JSON.parse(abi),
    address,
  )
);
