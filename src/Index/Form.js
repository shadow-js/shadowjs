import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import createWithShadowPrefix from './utils/createWithShadowPrefix';
import { useShadowPrefix } from './ThemeProvider';
import FormGroup from './FormGroup';
import FormControl from './FormControl';
import FormCheck from './FormCheck';
import FormLabel from './FormLabel';
import FormText from './FormText';

const propTypes = {
  /**
   * @default {'form'}
   */
  ShadowPrefix: PropTypes.string,

  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * Display the series of labels, form controls,
   * and buttons on a single horizontal row
   */
  inline: PropTypes.bool,

  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: PropTypes.bool,
  as: PropTypes.elementType,
};

const defaultProps = {
  inline: false,
};

const Form = React.forwardRef(
  (
    {
      ShadowPrefix,
      inline,
      className,
      validated,
      as: Component = 'form',
      ...props
    },
    ref,
  ) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'shadow-form');
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          className,
          validated && 'was-validated',
          inline && `${ShadowPrefix}-inline`,
        )}
      />
    );
  },
);

Form.displayName = 'Form';
Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Row = createWithShadowPrefix('form-row');
Form.Group = FormGroup;
Form.Control = FormControl;
Form.Check = FormCheck;
Form.Label = FormLabel;
Form.Text = FormText;

export default Form;
