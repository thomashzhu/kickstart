import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import Header from './Header';

const Layout = props => (
  <Container>
    <Head>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
      />
    </Head>

    <Header />
    {props.children}
  </Container>
);

Layout.propTypes = {
  children: PropTypes.PropTypes.shape({}),
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
