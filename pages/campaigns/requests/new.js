import React, { Component } from 'react';
import {
  Button,
  Form,
  Input,
  Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Campaign from '../../../ethereum/contracts/instances/campaign';
import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';
import {
  Link,
  Router,
} from '../../../routes';

class RequestNew extends Component {
  static async getInitialProps(props) {
    const { query: { address } } = props;
    return { address };
  }

  static propTypes = {
    address: PropTypes.string.isRequired,
  };

  state = {
    description: '',
    errorMessage: '',
    loading: false,
    recipient: '',
    value: '',
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      errorMessage: '',
      loading: true,
    });

    const { address } = this.props;
    const { description, recipient, value } = this.state;

    try {
      const campaign = await Campaign(address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(value, 'ether'),
          recipient,
        ).send({
          from: accounts[0],
        });
        
      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const {
      description, errorMessage, loading, recipient, value,
    } = this.state;
    const { address } = this.props;

    return (
      <Layout>
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <Link route={`/campaigns/${address}/requests`}>
          <a href={`/campaigns/${address}/requests`}>Back</a>
        </Link>
        {/* eslint-enable jsx-a11y/anchor-is-valid */}

        <h3>Create a Request</h3>

        <Form
          error={!!errorMessage}
          onSubmit={this.onSubmit}
        >
          <Form.Field>
            <label htmlFor="description">
              Description

              <Input
                id="description"
                onChange={event => this.setState({ description: event.target.value })}
                value={description}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="value">
              Values in Ether

              <Input
                id="value"
                label="ether"
                labelPosition="right"
                onChange={event => this.setState({ value: event.target.value })}
                value={value}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="recipient">
              Recipient

              <Input
                id="recipient"
                onChange={event => this.setState({ recipient: event.target.value })}
                value={recipient}
              />
            </label>
          </Form.Field>

          <Message
            content={errorMessage}
            error
            header="Oops!"
          />

          <Button
            loading={loading}
            primary
          >
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
