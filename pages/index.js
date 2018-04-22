import React, { Component } from 'react';
import {
  Button,
  Card,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import factory from '../ethereum/contracts/instances/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  static propTypes = {
    campaigns: PropTypes.arrayOf(PropTypes.string.isRequired),
  };

  static defaultProps = {
    campaigns: [],
  }

  renderCampaigns = () => {
    const items = this.props.campaigns.map(address => ({
      header: address,
      description: (
        /* eslint-disable jsx-a11y/anchor-is-valid */
        <Link route={`/campaigns/${address}`}>
          <a href={`/campaigns/${address}`}>View Campaign</a>
        </Link>
        /* eslint-enable jsx-a11y/anchor-is-valid */
      ),
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  render() {
    return (
      <Layout>
        <div>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />

          <h3>Open Campaigns</h3>

          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <Link route="/campaigns/new">
            <a href="/campaigns/new">
              <Button
                content="Create Campaign"
                floated="right"
                icon="add"
                primary
              />
            </a>
          </Link>
          {/* eslint-enable jsx-a11y/anchor-is-valid */}

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
