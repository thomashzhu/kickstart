import React, { Component } from 'react';
import factory from '../ethereum/build/factory';

class CampaignIndex extends Component {
  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    console.log(campaigns);
  }

  render = () => (
    <div>
      Campaigns Index!
    </div>
  );
}

export default CampaignIndex;
