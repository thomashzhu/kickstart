import React, { Component } from 'react';
import PropTypes from 'prop-types';

import factory from '../ethereum/build/factory';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  static propTypes = {
    campaigns: PropTypes.shape({}).isRequired,
  };

  render() {
    const { campaigns } = this.props;

    return (
      <div>{campaigns[0]}</div>
    );
  }
}

export default CampaignIndex;
