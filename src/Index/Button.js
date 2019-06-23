import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';
import Anchor from './Anchor';

const propTypes = {
  
  ShadowPrefix: PropTypes.string,

  /**
   * One or more button variant combinations
   *
   * buttons may be one of a variety of visual variants such as:
   *
   * `'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'link'`
   *
   * as well as "outline" versions (prefixed by 'outline-*')
   *
   * `'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'outline-light'`
   */
  variant: PropTypes.string,


  size: PropTypes.string,

  
  block: PropTypes.bool,

  active: PropTypes.bool,

  disabled: PropTypes.bool,

  
  href: PropTypes.string,

  type: PropTypes.oneOf(['button', 'reset', 'submit', null]),

  as: PropTypes.elementType,
};

const defaultProps = {
  variant: 'primary',
  active: false,
  disabled: false,
  type: 'button',
};

const Button = React.forwardRef(
  (
    { ShadowPrefix, variant, size, active, className, block, type, as, ...props },
    ref,
  ) => {
    const prefix = useShadowPrefix(ShadowPrefix, 'shadow-btn');

    const classes = classNames(
      className,
      prefix,
      active && 'active',
      `${prefix}-${variant}`,
      block && `${prefix}-block`,
      size && `${prefix}-${size}`,
    );

    if (props.href) {
      return (
        <Anchor
          {...props}
          as={as}
          innerRef={ref}
          className={classNames(classes, props.disabled && 'disabled')}
        />
      );
    }

    const Component = as || 'button';
    if (ref) props.ref = ref;

    return <Component {...props} type={type} className={classes} />;
  },
);

Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
