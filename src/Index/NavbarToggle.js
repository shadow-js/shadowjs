import classNames from 'classnames';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useEventCallback from '@restart/hooks/useEventCallback';

import { useShadowPrefix } from './ThemeProvider';
import NavbarContext from './NavbarContext';

const propTypes = {
  /** @default 'navbar-toggler' */
  ShadowPrefix: PropTypes.string,

  /** An accessible ARIA label for the toggler button. */
  label: PropTypes.string,

  /** @private */
  onClick: PropTypes.func,

  /**
   * The toggle content. When empty, the default toggle will be rendered.
   */
  children: PropTypes.node,

  as: PropTypes.elementType,
};

const defaultProps = {
  label: 'Toggle navigation',
};

const NavbarToggle = React.forwardRef(
  (
    {
      ShadowPrefix,
      className,
      children,
      label,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'button',
      onClick,
      ...props
    },
    ref,
  ) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'navbar-toggler');

    const { onToggle, expanded } = useContext(NavbarContext) || {};

    const handleClick = useEventCallback(e => {
      if (onClick) onClick(e);
      if (onToggle) onToggle();
    });

    if (Component === 'button') {
      props.type = 'button';
    }

    return (
      <Component
        {...props}
        ref={ref}
        onClick={handleClick}
        aria-label={label}
        className={classNames(className, ShadowPrefix, !!expanded && 'collapsed')}
      >
        {children || <span className={`${ShadowPrefix}-icon`} />}
      </Component>
    );
  },
);

NavbarToggle.displayName = 'NavbarToggle';
NavbarToggle.propTypes = propTypes;
NavbarToggle.defaultProps = defaultProps;

export default NavbarToggle;
