import React, { Component } from 'react';
import {
  Button,
  Table,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Campaign from '../ethereum/contracts/instances/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RequestRow extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    approverCount: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    request: PropTypes.shape().isRequired,
  };

  onApprove = async (event) => {
    event.preventDefault();

    const { address, id } = this.props;

    const campaign = await Campaign(address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });

    Router.replaceRoute(`/campaigns/${address}/requests`);
  };

  onFinalize = async (event) => {
    event.preventDefault();

    const { address, id } = this.props;

    const campaign = await Campaign(address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });

    Router.replaceRoute(`/campaigns/${address}/requests`);
  };

  render() {
    const {
      approverCount, id, request,
    } = this.props;
    
    const readyToFinalize =
      !request.complete && (request.approvalCount > approverCount / 2);

    const { Row, Cell } = Table;
    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{approverCount}</Cell>
        <Cell>
          {!request.complete &&
            <Button
              basic
              color="green"
              onClick={this.onApprove}
            >
              Approve
            </Button>
          }
        </Cell>
        <Cell>
          {readyToFinalize &&
            <Button
              basic
              color="teal"
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          }
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
