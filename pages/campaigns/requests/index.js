import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Link } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestIndex extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
  };
  
  static async getInitialProps(props) {
    const { query: { address } } = props;
    return { address };
  }

  render() {
    const { address } = this.props;
    return (
      <Layout>
        <h3>Requests</h3>

        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <Link route={`/campaigns/${address}/requests/new`}>
          <a href={`/campaigns/${address}/requests/new`}>
            <Button primary>Add Request</Button>
          </a>
        </Link>
        {/* eslint-enable jsx-a11y/anchor-is-valid */}
      </Layout>
    )
  };
}

export default RequestIndex;
