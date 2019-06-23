import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useShadowPrefix } from './ThemeProvider';
import FormContext from './FormContext';
import Feedback from './Feedback';
import FormCheckInput from './FormCheckInput';
import FormCheckLabel from './FormCheckLabel';

const propTypes = {
  /**
   * @default 'form-check'
   */
  ShadowPrefix: PropTypes.string,

  /**
   * The FormCheck `ref` will be forwarded to the underlying input element,
   * which means it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /** A HTML id attribute, necessary for proper form accessibility. */
  id: PropTypes.string,

  children: PropTypes.node,

  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  label: PropTypes.node,

  custom: PropTypes.bool,

  type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,

  /** Manually style the input as valid */
  isValid: PropTypes.bool.isRequired,

  /** Manually style the input as invalid */
  isInvalid: PropTypes.bool.isRequired,

  /** A message to display when the input is in a validation state */
  feedback: PropTypes.node,
};

const defaultProps = {
  type: 'checkbox',
  inline: false,
  disabled: false,
  isValid: false,
  isInvalid: false,
  title: '',
};

const FormCheck = React.forwardRef(
  (
    {
      id,
      ShadowPrefix,
      inline,
      disabled,
      isValid,
      isInvalid,
      feedback,
      className,
      style,
      title,
      type,
      label,
      children,
      custom,
      ...props
    },
    ref,
  ) => {
    ShadowPrefix = useShadowPrefix(ShadowPrefix, 'form-check');

    const { controlId } = useContext(FormContext);
    const innerFormContext = useMemo(
      () => ({
        controlId: id || controlId,
        custom,
      }),
      [controlId, custom, id],
    );

    const hasLabel = label != null && label !== false && !children;

    const input = (
      <FormCheckInput
        {...props}
        type={type}
        ref={ref}
        isValid={isValid}
        isInvalid={isInvalid}
        isStatic={!hasLabel}
        disabled={disabled}
      />
    );

    return (
      <FormContext.Provider value={innerFormContext}>
        <div
          style={style}
          className={classNames(
            className,
            !custom && ShadowPrefix,
            custom && `shadow-custom-control custom-${type}`,
            inline && `${custom ? 'shadow-custom-control' : ShadowPrefix}-inline`,
          )}
        >
          {children || (
            <React.Fragment>
              {input}
              {hasLabel && (
                <FormCheckLabel title={title}>{label}</FormCheckLabel>
              )}
              {(isValid || isInvalid) && (
                <Feedback type={isValid ? 'valid' : 'invalid'}>
                  {feedback}
                </Feedback>
              )}
            </React.Fragment>
          )}
        </div>
      </FormContext.Provider>
    );
  },
);

FormCheck.displayName = 'FormCheck';
FormCheck.propTypes = propTypes;
FormCheck.defaultProps = defaultProps;

FormCheck.Input = FormCheckInput;
FormCheck.Label = FormCheckLabel;

export default FormCheck;
