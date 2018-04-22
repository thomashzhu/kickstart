import web3 from '../../web3';

const {
  interface: abi,
} = require('../../build/CampaignFactory.json');
const {
  deployment: { factoryAddress },
} = require('../../../private/ethereum');

const instance = new web3.eth.Contract(
  JSON.parse(abi),
  factoryAddress,
);

export default instance;
