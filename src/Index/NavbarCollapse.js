import React from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import { useShadowPrefix } from './ThemeProvider';
import NavbarContext from './NavbarContext';

const propTypes = {
  /** @default 'navbar-collapse' */
  ShadowPrefix: PropTypes.string,
};

const NavbarCollapse = React.forwardRef(
  ({ children, ShadowPrefix, ...props }, ref) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'shadow-navbar-collapse');
    return (
      <NavbarContext.Consumer>
        {context => (
          <Collapse in={!!(context && context.expanded)} {...props}>
            <div ref={ref} className={ShadowPrefix}>
              {children}
            </div>
          </Collapse>
        )}
      </NavbarContext.Consumer>
    );
  },
);

NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;
