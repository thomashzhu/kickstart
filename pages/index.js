import React, { Component } from 'react';
import {
  Button,
  Card,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import factory from '../ethereum/build/factory';
import Layout from '../components/Layout';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  static propTypes = {
    campaigns: PropTypes.arrayOf(PropTypes.shape({}.isRequired)),
  };

  static defaultProps = {
    campaigns: [],
  }

  renderCampaigns = () => {
    const items = this.props.campaigns.map(address => ({
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  render() {
    return (
      <Layout>
        <div>
          {/* TODO: Temporary workaround only */}
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />

          <h3>Open Campaigns</h3>
          {this.renderCampaigns()}

          <Button
            content="Create Campaign"
            icon="add"
            primary
          />
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
