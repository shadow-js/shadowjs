import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'btn-group'
   */
  ShadowPrefix: PropTypes.string,

 
  size: PropTypes.string,

  
  vertical: PropTypes.bool,


  toggle: PropTypes.bool,

  
  role: PropTypes.string,

  as: PropTypes.elementType,
};

const defaultProps = {
  vertical: false,
  toggle: false,
  role: 'group',
};

const ButtonGroup = React.forwardRef((props, ref) => {
  const {
    ShadowPrefix,
    size,
    toggle,
    vertical,
    className,
    
    as: Component = 'div',
    ...rest
  } = props;

  const prefix = useShadowPrefix(ShadowPrefix, 'shadow-btn-group');
  let baseClass = prefix;

  if (vertical) baseClass = `${prefix}-vertical`;

  return (
    <Component
      {...rest}
      ref={ref}
      className={classNames(
        className,
        baseClass,
        size && `${prefix}-${size}`,
        toggle && `${prefix}-toggle`,
      )}
    />
  );
});

ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
