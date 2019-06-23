import classNames from 'classnames';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';
import FormContext from './FormContext';

const propTypes = {
  /**
   * @default 'form-check-input'
   */
  bsPrefix: PropTypes.string,

  /** The HTML for attribute for associating the label with an input */
  htmlFor: PropTypes.string,
};

const defaultProps = {
  type: 'checkbox',
};

const FormCheckLabel = React.forwardRef(
  ({ bsPrefix, className, htmlFor, ...props }, ref) => {
    bsPrefix = useShadowPrefix(bsPrefix, 'shadow-form-check-label');

    const { controlId, custom } = useContext(FormContext);

    return (
      <label 
        {...props}
        ref={ref}
        htmlFor={htmlFor || controlId}
        className={classNames(
          className,
          !custom && bsPrefix,
          custom && 'custom-control-label',
        )}
      />
    );
  },
);

FormCheckLabel.displayName = 'FormCheckLabel';
FormCheckLabel.propTypes = propTypes;
FormCheckLabel.defaultProps = defaultProps;

export default FormCheckLabel;
