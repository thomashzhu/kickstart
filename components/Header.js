import React from 'react';
import { Menu } from 'semantic-ui-react';

import { Link } from '../routes';

export default () => (
  /* eslint-disable jsx-a11y/anchor-is-valid */
  <Menu style={{ marginTop: 10 }}>
    <Link route="/">
      <a
        className="item"
        href="/"
      >
        CrowdCoin
      </a>
    </Link>

    <Menu.Menu position="right">
      <Link route="/">
        <a
          className="item"
          href="/"
        >
          Campaigns
        </a>
      </Link>

      <Link route="/campaigns/new">
        <a
          className="item"
          href="/campaigns/new"
        >
          +
        </a>
      </Link>
    </Menu.Menu>
  </Menu>
  /* eslint-enable jsx-a11y/anchor-is-valid */
);
