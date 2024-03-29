import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import Anchor from './Anchor';
import AbstractNavItem from './AbstractNavItem';
import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'nav-link'
   */
  ShadowPrefix: PropTypes.string,

  /**
   * The active state of the NavItem item.
   */
  active: PropTypes.bool,

  /**
   * The disabled state of the NavItem item.
   */
  disabled: PropTypes.bool,

  /**
   * The ARIA role for the `NavLink`, In the context of a 'tablist' parent Nav,
   * the role defaults to 'tab'
   * */
  role: PropTypes.string,

  /** The HTML href attribute for the `NavLink` */
  href: PropTypes.string,

  /** A callback fired when the `NavLink` is selected.
   *
   * ```js
   * function (eventKey: any, event: SyntheticEvent) {}
   * ```
   */
  onSelect: PropTypes.func,

  /**
   * Uniquely idenifies the `NavItem` amoungst its siblings,
   * used to determine and control the active state ofthe parent `Nav`
   */
  eventKey: PropTypes.any,

  /** @default 'a' */
  as: PropTypes.elementType,

  /** @private */
  innerRef: PropTypes.any,
};

const defaultProps = {
  disabled: false,
  as: Anchor,
};

const NavLink = React.forwardRef(
  (
    { ShadowPrefix, disabled, className, href, eventKey, onSelect, as, ...props },
    ref,
  ) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'shadow-nav-link');
    return (
      <AbstractNavItem
        {...props}
        href={href}
        ref={ref}
        eventKey={eventKey}
        as={as}
        disabled={disabled}
        onSelect={onSelect}
        className={classNames(className, ShadowPrefix, disabled && 'disabled')}
      />
    );
  },
);

NavLink.displayName = 'NavLink';
NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
