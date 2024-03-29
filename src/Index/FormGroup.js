import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import FormContext from './FormContext';
import { useShadowPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'form-group'
   */
  ShadowPrefix: PropTypes.string,

  as: PropTypes.elementType,

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: PropTypes.string,

  /**
   * The FormGroup `ref` will be forwarded to the underlying element.
   * Unless the FormGroup is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,
};

const FormGroup = React.forwardRef(
  (
    {
      ShadowPrefix,
      className,
      children,
      controlId,
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'sahdow-form-group');
    const context = useMemo(() => ({ controlId }), [controlId]);

    return (
      <FormContext.Provider value={context}>
        <Component
          {...props}
          ref={ref}
          className={classNames(className, ShadowPrefix)}
        >
          {children}
        </Component>
      </FormContext.Provider>
    );
  },
);

FormGroup.displayName = 'FormGroup';
FormGroup.propTypes = propTypes;

export default FormGroup;
