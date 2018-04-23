import React, { Component } from 'react';
import {
  Card,
  Grid,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/contracts/instances/campaign';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {
  static propTypes = {
    minimumContribution: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
    requestCount: PropTypes.string.isRequired,
    approverCount: PropTypes.string.isRequired,
    manager: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  };

  static async getInitialProps(props) {
    const { query: { address } } = props;
    const campaign = await Campaign(address);

    const {
      0: minimumContribution,
      1: balance,
      2: requestCount,
      3: approverCount,
      4: manager,
    } = await campaign.methods.getSummary().call();

    return {
      minimumContribution,
      balance,
      requestCount,
      approverCount,
      manager,
      address,
    };
  }

  renderCards = () => {
    const {
      minimumContribution, balance, requestCount, approverCount, manager
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can create requests to withdraw money',
        style: {
          overflowWrap: 'break-word',
        },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to become an approver',
      },
      {
        header: requestCount,
        meta: 'Number of Requests',
        description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
      },
      {
        header: approverCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have already donated to this campaign',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much money this campaign has left to spend.',
      },
    ];

    return <Card.Group items={items} />;
  };

  render = () => (
    <Layout>
      <h3>Campaign Show</h3>
      
      <Grid>
        <Grid.Column width={10}>
          {this.renderCards()}
        </Grid.Column>

        <Grid.Column width={6}>
          <ContributeForm address={this.props.address} />
        </Grid.Column>
      </Grid>
    </Layout>
  );
}

export default CampaignShow;
