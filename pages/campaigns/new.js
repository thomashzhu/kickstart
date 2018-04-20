import React, { Component } from 'react';
import {
  Button,
  Form,
  Input,
} from 'semantic-ui-react';

import Layout from '../../components/Layout';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
  };

  render = () => (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form>
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

        <Button primary>Create!</Button>
      </Form>
    </Layout>
  );
}

export default CampaignNew;
