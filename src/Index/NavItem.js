import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'nav-item'
   */
  ShadowPrefix: PropTypes.string,

  /** The ARIA role of the component */
  role: PropTypes.string,

  as: PropTypes.elementType,
};

const NavItem = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({ ShadowPrefix, className, children, as: Component = 'div', ...props }, ref) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'shadow-nav-item');

    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, ShadowPrefix)}
      >
        {children}
      </Component>
    );
  },
);

NavItem.displayName = 'NavItem';
NavItem.propTypes = propTypes;

export default NavItem;
