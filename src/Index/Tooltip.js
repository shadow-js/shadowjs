import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { createShadowComponent } from './ThemeProvider';

const propTypes = {

  ShadowPrefix: PropTypes.string,


  id: isRequiredForA11y(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),

  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),

  /**
   * An Overlay injected set of props for positioning the tooltip arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   *
   * @type {{ ref: ReactRef, style: Object }}
   */
  arrowProps: PropTypes.shape({
    ref: PropTypes.any,
    style: PropTypes.object,
  }),

  /** @private */
  innerRef: PropTypes.any,

  /** @private */
  scheduleUpdate: PropTypes.func,

  /** @private */
  outOfBoundaries: PropTypes.any,
};

const defaultProps = {
  placement: 'right',
};

function Tooltip({
  ShadowPrefix,
  innerRef,
  placement,
  className,
  style,
  children,
  arrowProps,
  scheduleUpdate: _,
  outOfBoundaries: _1,
  ...props
}) {
  return (
    <div
      ref={innerRef}
      style={style}
      role="tooltip"
      x-placement={placement}
      className={classNames(className, ShadowPrefix, `shadow-tooltip-${placement}`)}
      {...props}
    >
      <div className="arrow" {...arrowProps} />
      <div className={`${ShadowPrefix}-inner`}>{children}</div>
    </div>
  );
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default createShadowComponent(Tooltip, 'tooltip');
