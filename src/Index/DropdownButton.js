import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';

const propTypes = {

  id: PropTypes.any,

 
  href: PropTypes.string,

  onClick: PropTypes.func,

  
  title: PropTypes.node.isRequired,

  disabled: PropTypes.bool,

  
  menuRole: PropTypes.string,

 
  rootCloseEvent: PropTypes.string,

  
  ShadowPrefix: PropTypes.string,

  variant: PropTypes.string,
 
  size: PropTypes.string,
};


const DropdownButton = React.forwardRef(
  (
    {
      title,
      children,
      ShadowPrefix,
      rootCloseEvent,
      variant,
      size,
      menuRole,
      disabled,
      href,
      id,
      ...props
    },
    ref,
  ) => (
    <Dropdown ref={ref} {...props}>
      <Dropdown.Toggle
        id={id}
        href={href}
        size={size}
        variant={variant}
        disabled={disabled}
        childShadowPrefix={ShadowPrefix}
      >
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu role={menuRole} rootCloseEvent={rootCloseEvent}>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  ),
);

DropdownButton.displayName = 'DropdownButton';
DropdownButton.propTypes = propTypes;

export default DropdownButton;
