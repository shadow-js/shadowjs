import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import Anchor from './Anchor';
import SelectableContext, { makeEventKey } from './SelectableContext';
import { useShadowPrefix } from './ThemeProvider';
import NavContext from './NavContext';

const propTypes = {
  /** @default 'dropdown' */
  ShadowPrefix: PropTypes.string,

  active: PropTypes.bool,

  disabled: PropTypes.bool,

  
  eventKey: PropTypes.any,

  href: PropTypes.string,

  onClick: PropTypes.func,

 
  onSelect: PropTypes.func,

  as: PropTypes.elementType,
};

const defaultProps = {
  as: Anchor,
  disabled: false,
};

const DropdownItem = React.forwardRef(
  (
    {
      ShadowPrefix,
      className,
      children,
      eventKey,
      disabled,
      href,
      onClick,
      onSelect,
      active: propActive,
      as: Component,
      ...props
    },
    ref,
  ) => {
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-dropdown-item');
    const onSelectCtx = useContext(SelectableContext);
    const navContext = useContext(NavContext);

    const { activeKey } = navContext || {};
    const key = makeEventKey(eventKey, href);

    const active =
      propActive == null && key != null
        ? makeEventKey(activeKey) === key
        : propActive;

    const handleClick = useEventCallback(event => {
   
      if (disabled) return;
      if (onClick) onClick(event);
      if (onSelectCtx) onSelectCtx(key, event);
      if (onSelect) onSelect(key, event);
    });

    return (
      <Component
        {...props}
        ref={ref}
        href={href}
        disabled={disabled}
        className={classNames(
          className,
          prefix,
          active && 'active',
          disabled && 'disabled',
        )}
        onClick={handleClick}
      >
        {children}
      </Component>
    );
  },
);

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;
