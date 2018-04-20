import React from 'react';
import { Container } from 'semantic-ui-react';

import PropTypes from 'prop-types';

import Header from './Header';

const Layout = props => (
  <Container>
    <Header />

    {props.children}
  </Container>
);

Layout.propTypes = {
  children: PropTypes.shape({}),
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
