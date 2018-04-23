import React, { Component } from 'react';
import {
  Button,
  Form,
  Input,
  Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Router } from '../routes';

import Campaign from '../ethereum/contracts/instances/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
  };

  state = {
    errorMessage: '',
    loading: false,
    value: '',
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      errorMessage: '',
      loading: true,
    });
    
    try {
      const campaign = await Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether'),
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({
      loading: false,
      value: '',
    });
  }

  render = () => {
    const { errorMessage, loading, value } = this.state;

    return (
      <Form
        error={!!errorMessage}
        onSubmit={this.onSubmit}
      >
        <Form.Field>
          <label htmlFor="amount_to_contribute">
            Amount to Contribute
            <Input
              id="amount_to_contribute"
              label="ether"
              labelPosition="right"
              onChange={event => this.setState({ value: event.target.value })}
              value={value}
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
          Contribute!
        </Button>
      </Form>
    );
  };
}

export default ContributeForm;
