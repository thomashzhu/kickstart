import React, { Component } from 'react';
import {
  Button,
  Form,
  Input,
  Message,
} from 'semantic-ui-react';

class ContributeForm extends Component {
  state = {
    errorMessage: '',
  };

  render = () => (
    <Form>
      <Form.Field>
        <label htmlFor="amount_to_contribute">
          Amount to Contribute
          <Input
            id="amount_to_contribute"
            label="ether"
            labelPosition="right"
          />
        </label>
      </Form.Field>

      <Message
        content={this.state.errorMessage}
        error
        header="Oops!"
      />

      <Button primary>
        Contribute!
      </Button>
    </Form>
  );
}

export default ContributeForm;
