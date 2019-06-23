import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'form-text' */
  ShadowPrefix: PropTypes.string,

  /**
   * The FormText `ref` will be forwarded to the underlying element.
   * Unless the FormText is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * A convenience prop for add the `text-muted` class,
   * since it's so commonly used here.
   */
  muted: PropTypes.bool,
  as: PropTypes.elementType,
};

const FormText = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({ ShadowPrefix, className, as: Component = 'small', muted, ...props }, ref) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'shadow-form-text');

    const classes = classNames(className, ShadowPrefix, muted && 'text-muted');

    return <Component {...props} ref={ref} className={classes} />;
  },
);

FormText.displayName = 'FormText';
FormText.propTypes = propTypes;

export default FormText;
