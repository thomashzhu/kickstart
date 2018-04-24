import React, { Component } from 'react';
import {
  Button,
  Table,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/contracts/instances/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    approverCount: PropTypes.string.isRequired,
    requests: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };
  
  static async getInitialProps(props) {
    const { query: { address } } = props;

    const campaign = await new Campaign(address);
    const approverCount = await campaign.methods.approverCount().call();
    const requestCount = await campaign.methods.getRequestsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount, 10))
        .fill()
        .map((element, index) => (
          campaign.methods.requests(index).call()
        )),
    );

    return {
      address,
      approverCount,
      requests,
      requestCount,
    };
  }

  renderRows = () => {
    const { address, approverCount, requests } = this.props;
    
    return requests.map((request, index) => (
      <RequestRow
        address={address}
        approverCount={approverCount}
        id={index}
        key={request.description}
        request={request}
      />
    ));
  };

  render() {
    const { address, requestCount } = this.props;
    const {
      Header, Row, HeaderCell, Body,
    } = Table;

    return (
      <Layout>
        <h3>Requests</h3>

        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <Link route={`/campaigns/${address}/requests/new`}>
          <a href={`/campaigns/${address}/requests/new`}>
            <Button
              floated="right"
              primary
              style={{ marginBottom: 10 }}
            >
              Add Request
            </Button>
          </a>
        </Link>
        {/* eslint-enable jsx-a11y/anchor-is-valid */}

        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approval</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>

          <Body>
            {this.renderRows()}
          </Body>
        </Table>

        <div>
          Found {requestCount} requests.
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;
