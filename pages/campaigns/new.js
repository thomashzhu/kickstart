import React, { Component } from 'react';
import {
  Button,
  Form,
  Input,
  Message,
} from 'semantic-ui-react';

import { Router } from '../../routes';
import Layout from '../../components/Layout';
import factory from '../../ethereum/contracts/instances/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
  state = {
    errorMessage: '',
    loading: false,
    minimumContribution: '',
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const { minimumContribution } = this.state;

    this.setState({
      errorMessage: '',
      loading: true,
    });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution)
        .send({
          from: accounts[0],
        });

      Router.pushRoute('/');
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render = () => (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form
        error={!!this.state.errorMessage}
        onSubmit={this.onSubmit}
      >
        <Form.Field>
          <label htmlFor="minimumContribution">
            Minimum Contribution
            <Input
              id="minimumContribution"
              label="wei"
              labelPosition="right"
              onChange={event => this.setState({
                minimumContribution: event.target.value,
              })}
              value={this.state.minimumContribution}
            />
          </label>
        </Form.Field>

        <Message
          content={this.state.errorMessage}
          error
          header="Oops!"
        />

        <Button
          loading={this.state.loading}
          primary
        >
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

export default CampaignNew;
