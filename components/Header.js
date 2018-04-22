import React from 'react';
import { Menu } from 'semantic-ui-react';

import { Link } from '../routes';

export default () => (
  /* eslint-disable jsx-a11y/anchor-is-valid  */
  <Menu style={{ marginTop: 10 }}>
    <Link
      href="/"
      route="/"
    >
      <a className="item">CrowdCoin</a>
    </Link>

    <Menu.Menu position="right">
      <Link
        href="/"
        route="/"
      >
        <a className="item">Campaigns</a>
      </Link>

      <Link
        href="/campaigns/new"
        route="/campaigns/new"
      >
        <a className="item">+</a>
      </Link>
    </Menu.Menu>
  </Menu>
  /* eslint-enable jsx-a11y/anchor-is-valid  */
);
