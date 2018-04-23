import React, { Component } from 'react';
import {
  Button,
  Form,
  Input,
  Message,
} from 'semantic-ui-react';

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

  state = {
    description: '',
    recipient: '',
    value: '',
  };


  render() {
    const { description, recipient, value } = this.state;

    return (
      <Layout>
        <Form>
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

          <Button primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  };
}

export default RequestNew;
