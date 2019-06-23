import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'navbar' */
  ShadowPrefix: PropTypes.string,

  /**
   * An href, when provided the Brand will render as an `<a>` element (unless `as` is provided).
   */
  href: PropTypes.string,

  /**
   * Set a custom element for this component.
   */
  as: PropTypes.elementType,
};

const NavbarBrand = React.forwardRef(
  ({ ShadowPrefix, className, as, ...props }, ref) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'shadow-navbar-brand');

    const Component = as || (props.href ? 'a' : 'span');

    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, ShadowPrefix)}
      />
    );
  },
);

NavbarBrand.displayName = 'NavbarBrand';
NavbarBrand.propTypes = propTypes;

export default NavbarBrand;
